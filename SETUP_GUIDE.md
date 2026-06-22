# CaloryTracker Pro - Complete Setup & Deployment Guide

## 📋 Project Overview

**CaloryTracker Pro** is a professional mobile-first web application for nutritional tracking and fitness monitoring. It features authentication, food logging, exercise tracking, progress monitoring, and data export capabilities.

---

## 🏗️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide React Icons
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel
- **Version Control**: GitHub
- **API Integration**: Food Calorie Database API

---

## 🚀 Quick Start

### 1. **Clone & Setup Repository**

```bash
# Create new GitHub repository
# Clone it locally
git clone https://github.com/yourusername/calorytrakcer-pro.git
cd calorytracker-pro

# Install dependencies
npm install
```

### 2. **Install Required Packages**

```bash
npm install react lucide-react
npm install -D tailwindcss postcss autoprefixer
npm install @supabase/supabase-js
npm install axios dotenv
```

### 3. **Tailwind CSS Configuration**

Create `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        coral: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          400: '#FF8E7E',
          500: '#FF6B6B',
        }
      }
    },
  },
  plugins: [],
}
```

Create `postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🔐 Supabase Setup

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create a new project (choose region closest to you)

### Step 2: Create Database Tables

In Supabase SQL Editor, run:

```sql
-- Users Table
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Daily Tracking Table
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, tracking_date)
);

-- Food Log Table
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

-- Exercise Log Table
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

-- Activity History Table (for progress tracking)
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

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_daily_tracking_user_id ON daily_tracking(user_id);
CREATE INDEX idx_daily_tracking_date ON daily_tracking(tracking_date);
CREATE INDEX idx_food_log_user_id ON food_log(user_id);
CREATE INDEX idx_exercise_log_user_id ON exercise_log(user_id);
CREATE INDEX idx_activity_history_user_id ON activity_history(user_id);
```

### Step 3: Enable Authentication
1. Go to Authentication > Providers
2. Enable Email/Password
3. Enable Google OAuth:
   - Create OAuth credentials in Google Cloud Console
   - Add Redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

### Step 4: Set RLS (Row Level Security) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_history ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Apply similar policies to other tables
CREATE POLICY "Users can view own daily tracking" ON daily_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily tracking" ON daily_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily tracking" ON daily_tracking
  FOR UPDATE USING (auth.uid() = user_id);
```

---

## 📁 Project Structure

```
calorytracker-pro/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── SignupScreen.jsx
│   │   │   └── OTPVerification.jsx
│   │   ├── Sections/
│   │   │   ├── HomeSection.jsx
│   │   │   ├── LogFoodSection.jsx
│   │   │   ├── ProgressSection.jsx
│   │   │   ├── ExerciseSection.jsx
│   │   │   └── ProfileSection.jsx
│   │   └── Navigation/
│   │       └── BottomNavigation.jsx
│   ├── services/
│   │   ├── supabaseClient.js
│   │   ├── authService.js
│   │   ├── foodService.js
│   │   └── trackingService.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useDailyTracking.js
│   ├── utils/
│   │   ├── calculations.js
│   │   └── formatters.js
│   ├── App.jsx
│   └── index.css
├── public/
│   └── index.html
├── .env.local (local development)
├── .env.example
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

## 🔑 Environment Variables

Create `.env.local`:

```env
# Supabase
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Google OAuth (if using)
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

# Food API (e.g., USDA, Nutritionix, etc.)
VITE_FOOD_API_KEY=YOUR_API_KEY
VITE_FOOD_API_BASE_URL=https://api.example.com

# App Config
VITE_APP_NAME=CaloryTracker Pro
VITE_APP_VERSION=1.0.0
```

Create `.env.example` (for repo):

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
VITE_FOOD_API_KEY=YOUR_API_KEY
VITE_FOOD_API_BASE_URL=https://api.example.com
```

---

## 🔌 Supabase Client Setup

Create `src/services/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function for user sessions
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

// Helper for data operations
export const fetchUserData = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUserData = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);
  
  if (error) throw error;
  return data;
};
```

---

## 🍎 Food API Integration

### Recommended APIs:
1. **USDA FoodData Central API** (Free, comprehensive)
   - https://fdc.nal.usda.gov/api-guide.html
   
2. **Nutritionix API** (Free tier available)
   - https://www.nutritionix.com/business/api
   
3. **Edamam API** (Freemium)
   - https://developer.edamam.com/

Create `src/services/foodService.js`:

```javascript
import axios from 'axios';

const FOOD_API_BASE_URL = import.meta.env.VITE_FOOD_API_BASE_URL;
const FOOD_API_KEY = import.meta.env.VITE_FOOD_API_KEY;

export const searchFoodItems = async (query) => {
  try {
    const response = await axios.get(`${FOOD_API_BASE_URL}/search`, {
      params: {
        q: query,
        apiKey: FOOD_API_KEY,
        pageSize: 10
      }
    });
    return response.data.foods || [];
  } catch (error) {
    console.error('Food API Error:', error);
    return [];
  }
};

export const getNutritionInfo = async (foodId) => {
  try {
    const response = await axios.get(`${FOOD_API_BASE_URL}/food/${foodId}`, {
      params: { apiKey: FOOD_API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Nutrition API Error:', error);
    return null;
  }
};
```

---

## 📱 Mobile Optimization

The app is fully responsive. Update `src/index.css`:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

* {
  -webkit-user-select: none;
  user-select: none;
}

input, button, textarea {
  -webkit-user-select: text;
  user-select: text;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@supports (padding: max(0px)) {
  body {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
```

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial CaloryTracker Pro setup"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_FOOD_API_KEY`
   - `VITE_FOOD_API_BASE_URL`
5. Click Deploy

### Step 3: Update Supabase OAuth

In Supabase > Authentication > Redirect URLs, add:
```
https://yourapp.vercel.app/auth/callback
```

### Step 4: Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

## 📦 package.json Example

```json
{
  "name": "calorytracker-pro",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^latest",
    "@supabase/supabase-js": "^latest",
    "axios": "^latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^latest",
    "vite": "^latest",
    "tailwindcss": "^latest",
    "postcss": "^latest",
    "autoprefixer": "^latest"
  }
}
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use Supabase RLS** - All data access controlled
3. **Validate input** - Server-side validation in Supabase
4. **Rate limiting** - Enable in Vercel
5. **HTTPS only** - Automatically on Vercel
6. **Data encryption** - Enable in Supabase
7. **Regular backups** - Enable in Supabase dashboard

---

## 🧪 Testing

### Local Testing

```bash
npm run dev
# Open http://localhost:5173
```

### Test Accounts

Use test mode in Supabase to create test users without email verification.

---

## 📊 Analytics Integration (Optional)

```javascript
// Add to App.jsx
import { analytics } from './services/analytics';

useEffect(() => {
  analytics.pageView('home');
}, [currentTab]);
```

---

## 🆘 Troubleshooting

### Issue: Supabase Connection Failed
**Solution**: Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`

### Issue: Authentication Not Working
**Solution**: 
1. Clear browser cookies
2. Check Supabase provider settings
3. Verify redirect URLs

### Issue: Food API Returns 403
**Solution**: Check API key expiration and usage limits

### Issue: Vercel Deployment Fails
**Solution**: 
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `vercel.json` configuration

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Lucide Icons](https://lucide.dev)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Support

For issues or questions:
1. Check GitHub Issues
2. Contact: support@calorytrakcer-pro.com
3. Documentation: https://docs.calorytrakcer-pro.com

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Maintained By**: CaloryTracker Development Team