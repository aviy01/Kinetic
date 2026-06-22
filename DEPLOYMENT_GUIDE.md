# CaloryTracker Pro - Complete Deployment & Supabase Integration Guide

## 📋 Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Local Development](#local-development)
3. [GitHub Repository](#github-repository)
4. [Vercel Deployment](#vercel-deployment)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## 🗄️ Supabase Setup

### Step 1: Create Supabase Account

1. Visit https://supabase.com
2. Click "Sign Up"
3. Register with GitHub (recommended) or email
4. Verify your email

### Step 2: Create New Project

1. Click "New Project"
2. Choose organization (or create new)
3. Enter project name: `calorytracker-pro`
4. Choose region closest to your location
5. Set strong database password
6. Click "Create new project"
7. Wait for project initialization (2-5 minutes)

### Step 3: Get API Credentials

Once project is created:

1. Go to **Settings > API**
2. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`
3. Keep these safe (needed for environment variables)

### Step 4: Create Database Tables

1. Go to **SQL Editor**
2. Create new query
3. Copy-paste the complete schema below:

```sql
-- ========================================
-- USERS TABLE
-- ========================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(20),
  age INTEGER,
  height DECIMAL(5,2),
  weight DECIMAL(5,2),
  goal VARCHAR(50),
  is_guest BOOLEAN DEFAULT FALSE,
  auth_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- DAILY TRACKING TABLE
-- ========================================
CREATE TABLE daily_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tracking_date DATE DEFAULT CURRENT_DATE,
  target_calories INTEGER DEFAULT 2000,
  consumed_calories DECIMAL(8,2) DEFAULT 0,
  protein DECIMAL(8,2) DEFAULT 0,
  carbs DECIMAL(8,2) DEFAULT 0,
  fat DECIMAL(8,2) DEFAULT 0,
  fiber DECIMAL(8,2) DEFAULT 0,
  water_intake INTEGER DEFAULT 0,
  water_target INTEGER DEFAULT 3000,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, tracking_date)
);

-- ========================================
-- FOOD LOG TABLE
-- ========================================
CREATE TABLE food_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  daily_tracking_id UUID NOT NULL REFERENCES daily_tracking(id) ON DELETE CASCADE,
  food_name VARCHAR(255) NOT NULL,
  quantity DECIMAL(8,2) NOT NULL,
  calories DECIMAL(8,2),
  protein DECIMAL(8,2),
  carbs DECIMAL(8,2),
  fat DECIMAL(8,2),
  fiber DECIMAL(8,2),
  logged_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- EXERCISE LOG TABLE
-- ========================================
CREATE TABLE exercise_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  daily_tracking_id UUID NOT NULL REFERENCES daily_tracking(id) ON DELETE CASCADE,
  exercise_name VARCHAR(255) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  calories_burned DECIMAL(8,2),
  exercise_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- ACTIVITY HISTORY TABLE
-- ========================================
CREATE TABLE activity_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  calories_consumed DECIMAL(8,2) DEFAULT 0,
  calories_burned DECIMAL(8,2) DEFAULT 0,
  water_intake INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

-- ========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_daily_tracking_user_id ON daily_tracking(user_id);
CREATE INDEX idx_daily_tracking_date ON daily_tracking(tracking_date);
CREATE INDEX idx_food_log_user_id ON food_log(user_id);
CREATE INDEX idx_food_log_daily_tracking_id ON food_log(daily_tracking_id);
CREATE INDEX idx_exercise_log_user_id ON exercise_log(user_id);
CREATE INDEX idx_exercise_log_daily_tracking_id ON exercise_log(daily_tracking_id);
CREATE INDEX idx_activity_history_user_id ON activity_history(user_id);
CREATE INDEX idx_activity_history_date ON activity_history(activity_date);

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_history ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS POLICIES FOR USERS TABLE
-- ========================================
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ========================================
-- RLS POLICIES FOR DAILY TRACKING
-- ========================================
CREATE POLICY "Users can view own daily tracking" ON daily_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily tracking" ON daily_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily tracking" ON daily_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily tracking" ON daily_tracking
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- RLS POLICIES FOR FOOD LOG
-- ========================================
CREATE POLICY "Users can view own food log" ON food_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own food log" ON food_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own food log" ON food_log
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own food log" ON food_log
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- RLS POLICIES FOR EXERCISE LOG
-- ========================================
CREATE POLICY "Users can view own exercise log" ON exercise_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise log" ON exercise_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise log" ON exercise_log
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise log" ON exercise_log
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- RLS POLICIES FOR ACTIVITY HISTORY
-- ========================================
CREATE POLICY "Users can view own activity history" ON activity_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity history" ON activity_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity history" ON activity_history
  FOR UPDATE USING (auth.uid() = user_id);
```

4. Run the query
5. Verify all tables are created in **Table Editor**

### Step 5: Enable Authentication Providers

#### Email/Password Authentication
1. Go to **Authentication > Providers**
2. Click **Email**
3. Enable "Email" toggle
4. Enable "Confirm email" (optional for production)
5. Save

#### Google OAuth
1. Go to https://console.cloud.google.com
2. Create new project
3. Go to **OAuth consent screen**
4. Configure consent screen
5. Go to **Credentials**
6. Create OAuth 2.0 Client ID
7. Add authorized redirect URI:
   ```
   https://YOUR-PROJECT.supabase.co/auth/v1/callback
   ```
8. Copy Client ID and Client Secret
9. Go back to Supabase > Authentication > Providers > Google
10. Paste credentials
11. Save

### Step 6: Configure Authentication Settings

1. Go to **Authentication > URL Configuration**
2. Add your Vercel URL when deployed:
   ```
   https://yourdomain.vercel.app
   ```
3. Add localhost for development:
   ```
   http://localhost:5173
   ```

---

## 💻 Local Development

### Step 1: Initialize Project

```bash
# Create project directory
mkdir calorytracker-pro
cd calorytracker-pro

# Initialize Git
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Initialize npm
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install react react-dom lucide-react @supabase/supabase-js axios date-fns
npm install -D @vitejs/plugin-react vite tailwindcss postcss autoprefixer
```

### Step 3: Setup Project Files

Copy all the generated files:
- `CaloryTracker_pro.jsx` → `src/App.jsx`
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `.env.example`
- `.gitignore`
- All configuration files

### Step 4: Configure Environment

```bash
# Create local environment file
cp .env.example .env.local

# Edit .env.local and add:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 5: Create HTML Entry Point

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#14B8A6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>CaloryTracker Pro - Nutrition & Fitness Tracking</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Create `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import CaloryTrackerPro from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CaloryTrackerPro />
  </React.StrictMode>,
)
```

Create `src/index.css`:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body, #root {
  height: 100%;
  width: 100%;
}
```

### Step 6: Test Locally

```bash
npm run dev
# Open http://localhost:5173
```

---

## 🐙 GitHub Repository

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `calorytracker-pro`
3. Description: "Professional Nutrition & Fitness Tracking App"
4. Choose Public (for portfolio) or Private
5. Click "Create repository"

### Step 2: Push Code to GitHub

```bash
git add .
git commit -m "Initial CaloryTracker Pro setup

- React + Vite frontend
- Tailwind CSS styling
- Supabase authentication & database
- Ready for Vercel deployment"

git branch -M main
git remote add origin https://github.com/yourusername/calorytracker-pro.git
git push -u origin main
```

### Step 3: GitHub Settings

1. Go to repository Settings
2. Set default branch to `main`
3. Enable branch protection (optional)
4. Add repository description and topics:
   - `react`
   - `fitness`
   - `nutrition`
   - `web-app`
   - `supabase`
   - `vercel`

---

## 🚀 Vercel Deployment

### Step 1: Connect Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Authorize Vercel"

### Step 2: Deploy Project

1. Click "New Project"
2. Select your `calorytracker-pro` repository
3. Leave build settings as default (Vite auto-detected)
4. Add environment variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id (if using)
VITE_FOOD_API_KEY=your-api-key (if using)
VITE_FOOD_API_BASE_URL=https://api.example.com (if using)
```

5. Click "Deploy"
6. Wait for deployment (2-5 minutes)
7. Your app is live! 🎉

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to project
2. Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed

---

## 🔐 Post-Deployment Configuration

### Update Supabase OAuth URLs

1. Go to Supabase > Authentication > URL Configuration
2. Add your Vercel URL:
   ```
   https://yourdomain.vercel.app
   https://yourdomain.vercel.app/auth/callback
   ```

### Update Google OAuth

1. Go to Google Cloud Console
2. OAuth 2.0 Client ID > Authorized redirect URIs
3. Add:
   ```
   https://yourdomain.vercel.app/auth/callback
   ```

### Enable HTTPS

Vercel automatically provides HTTPS. No additional setup needed.

### Setup CI/CD

Deployments automatically trigger when you push to `main` branch.

---

## 🆘 Troubleshooting

### Issue: "Database connection failed"
**Solution**: 
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Verify Supabase project is running
- Check RLS policies

### Issue: "Authentication not working"
**Solution**:
- Clear browser cookies/cache
- Check authentication provider settings
- Verify redirect URLs in Supabase
- Check Google OAuth credentials

### Issue: "Vercel build fails"
**Solution**:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Run `npm run build` locally to test
- Check for import errors

### Issue: "CORS error when calling API"
**Solution**:
- Use Supabase client library (built-in CORS handling)
- If using external API, configure CORS headers
- Check API key permissions

### Issue: "Files not uploading to Supabase Storage"
**Solution**:
- Check bucket permissions
- Verify RLS policies allow uploads
- Check file size limits (100MB default)

### Issue: "Slow application performance"
**Solution**:
- Enable Supabase query optimization
- Use indexes (already created)
- Implement pagination
- Optimize images
- Enable Vercel caching

---

## 📊 Monitoring

### Supabase Monitoring

1. Go to **Database > Logs** to view query logs
2. Check **Authentication > Logs** for auth issues
3. Monitor **Storage > Usage** for file storage
4. Review **Metrics** for performance

### Vercel Monitoring

1. Go to **Analytics** to view traffic
2. Check **Functions** for serverless function usage
3. Review **Deployments** for deployment history
4. Monitor **Settings > Usage** for bandwidth

---

## 🔒 Security Checklist

- ✅ Environment variables not committed
- ✅ RLS policies enabled
- ✅ HTTPS enabled
- ✅ OAuth credentials secured
- ✅ Database backups enabled
- ✅ Rate limiting configured
- ✅ Input validation implemented
- ✅ CORS configured
- ✅ Sensitive data encrypted
- ✅ Regular security audits

---

## 📚 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Cloud Console](https://console.cloud.google.com)

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] App loads successfully
- [ ] Authentication works (all 4 methods)
- [ ] User can complete onboarding
- [ ] Food logging works
- [ ] Exercise tracking works
- [ ] Progress tracking displays correctly
- [ ] Data exports successfully
- [ ] Profile updates work
- [ ] Mobile responsive on all devices
- [ ] No console errors
- [ ] Google Analytics tracking (if configured)

---

**Deployment Complete!** 🎉

Your CaloryTracker Pro app is now live and ready for users.

For support: support@calorytrakcer-pro.com
