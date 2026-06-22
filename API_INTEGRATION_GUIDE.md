# CaloryTracker Pro - API Integration & Testing Guide

## 📋 Table of Contents
1. [Food Database API Integration](#food-database-api-integration)
2. [Testing Guide](#testing-guide)
3. [Example Implementations](#example-implementations)
4. [API References](#api-references)

---

## 🍎 Food Database API Integration

### Option 1: USDA FoodData Central API (Recommended)

#### Setup

1. Get free API key from: https://fdc.nal.usda.gov/api-guide.html
2. Add to `.env.local`:
```env
VITE_FOOD_API_KEY=YOUR_API_KEY
VITE_FOOD_API_BASE_URL=https://api.nal.usda.gov/fdc/v1
```

#### Implementation

Create `src/services/foodApi.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_FOOD_API_BASE_URL;
const API_KEY = import.meta.env.VITE_FOOD_API_KEY;

const foodApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Search for foods
 */
export const searchFoods = async (query, pageSize = 10) => {
  try {
    const response = await foodApiClient.get('/foods/search', {
      params: {
        query,
        pageSize,
        api_key: API_KEY,
      }
    });

    return response.data.foods.map(food => ({
      id: food.fdcId,
      name: food.description,
      brand: food.brandName || 'Generic',
      calories: food.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 0,
      protein: food.foodNutrients?.find(n => n.nutrientId === 1003)?.value || 0,
      carbs: food.foodNutrients?.find(n => n.nutrientId === 1005)?.value || 0,
      fat: food.foodNutrients?.find(n => n.nutrientId === 1004)?.value || 0,
      fiber: food.foodNutrients?.find(n => n.nutrientId === 1079)?.value || 0,
    }));
  } catch (error) {
    console.error('Food search error:', error);
    return [];
  }
};

/**
 * Get detailed food information
 */
export const getFoodDetails = async (foodId) => {
  try {
    const response = await foodApiClient.get(`/food/${foodId}`, {
      params: {
        api_key: API_KEY,
      }
    });

    const food = response.data;
    return {
      id: food.fdcId,
      name: food.description,
      nutrients: food.foodNutrients,
      servingSize: food.servingSize,
      servingUnit: food.servingSizeUnit,
    };
  } catch (error) {
    console.error('Food details error:', error);
    return null;
  }
};

export default { searchFoods, getFoodDetails };
```

#### Usage Example

```javascript
// In your component
import { searchFoods } from './services/foodApi';

const handleFoodSearch = async (query) => {
  const results = await searchFoods(query);
  console.log(results);
};
```

---

### Option 2: Nutritionix API

#### Setup

1. Get API key from: https://www.nutritionix.com/business/api
2. Add to `.env.local`:
```env
VITE_NUTRITIONIX_API_KEY=YOUR_API_KEY
VITE_NUTRITIONIX_APP_ID=YOUR_APP_ID
```

#### Implementation

```javascript
import axios from 'axios';

const nutritionixClient = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2',
  headers: {
    'x-app-id': import.meta.env.VITE_NUTRITIONIX_APP_ID,
    'x-app-key': import.meta.env.VITE_NUTRITIONIX_API_KEY,
  }
});

export const searchNutritionix = async (query) => {
  try {
    const response = await nutritionixClient.post('/search/instant', {
      query,
    });

    return response.data.common.map(item => ({
      id: item.tag,
      name: item.food_name,
      calories: item.nix_calories || 0,
      protein: item.nix_protein || 0,
      carbs: item.nix_carbs || 0,
      fat: item.nix_fat || 0,
    }));
  } catch (error) {
    console.error('Nutritionix search error:', error);
    return [];
  }
};
```

---

### Option 3: Edamam API

#### Setup

1. Register at: https://developer.edamam.com/
2. Create Food Database API application
3. Add to `.env.local`:
```env
VITE_EDAMAM_APP_ID=YOUR_APP_ID
VITE_EDAMAM_APP_KEY=YOUR_APP_KEY
```

#### Implementation

```javascript
import axios from 'axios';

export const searchEdamam = async (query) => {
  try {
    const response = await axios.get('https://api.edamam.com/api/food/v2/search', {
      params: {
        type: 'public',
        q: query,
        app_id: import.meta.env.VITE_EDAMAM_APP_ID,
        app_key: import.meta.env.VITE_EDAMAM_APP_KEY,
      }
    });

    return response.data.hints.map(hint => ({
      id: hint.food.uri,
      name: hint.food.label,
      calories: hint.food.nutrients.ENERC_KCAL || 0,
      protein: hint.food.nutrients.PROCNT || 0,
      carbs: hint.food.nutrients.CHOCDF || 0,
      fat: hint.food.nutrients.FAT || 0,
      fiber: hint.food.nutrients.FIBTG || 0,
    }));
  } catch (error) {
    console.error('Edamam search error:', error);
    return [];
  }
};
```

---

## 🧪 Testing Guide

### Unit Testing Setup

Install testing dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Create `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
});
```

### Test Examples

Create `src/utils/__tests__/calculations.test.js`:

```javascript
import { describe, it, expect } from 'vitest';
import { calculateBMI, getBMICategory } from '../calculations';

describe('BMI Calculations', () => {
  it('should calculate BMI correctly', () => {
    const bmi = calculateBMI(70, 180); // 70kg, 180cm
    expect(parseFloat(bmi)).toBeCloseTo(21.6, 1);
  });

  it('should return healthy weight category', () => {
    const category = getBMICategory(22);
    expect(category.category).toBe('Healthy Weight');
    expect(category.color).toBe('#10B981');
  });

  it('should return overweight category', () => {
    const category = getBMICategory(26);
    expect(category.category).toBe('Overweight');
  });

  it('should handle null values', () => {
    const bmi = calculateBMI(null, 180);
    expect(bmi).toBeNull();
  });
});
```

### Manual Testing Checklist

#### Authentication Testing
- [ ] Email signup works
- [ ] Email login works
- [ ] Google OAuth works
- [ ] Phone OTP verification works
- [ ] Guest login works
- [ ] Logout works
- [ ] Session persists after refresh
- [ ] Invalid credentials show error

#### Onboarding Testing
- [ ] All fields are required
- [ ] Age validation (10-120)
- [ ] Height validation (100-250 cm)
- [ ] Weight validation (30-300 kg)
- [ ] Gender selection works
- [ ] Goal selection works
- [ ] Profile saves correctly

#### Home Section Testing
- [ ] Greeting message displays correctly
- [ ] Calorie progress bar updates
- [ ] Target calorie can be edited
- [ ] Water intake increases on button click
- [ ] Macro breakdown displays correctly
- [ ] Color-coded status shows correctly

#### Food Logging Testing
- [ ] Search food items
- [ ] Food quantity input works
- [ ] Multiple foods can be added
- [ ] Food item can be removed
- [ ] Calories update in home section
- [ ] Macros update correctly
- [ ] Search clears after adding food

#### Progress Tracking Testing
- [ ] Daily target status shows green/yellow/red
- [ ] BMI calculates correctly
- [ ] BMI category displays
- [ ] 20-day activity shows colors
- [ ] Export data as CSV
- [ ] Export file downloads

#### Exercise Testing
- [ ] Exercise selection works
- [ ] Timer starts/pauses correctly
- [ ] Estimated calories display
- [ ] Exercises can be ended
- [ ] Exercise history shows
- [ ] Calories burned deduct from daily goal

#### Profile Testing
- [ ] User information displays
- [ ] Profile can be updated
- [ ] Settings accessible
- [ ] Logout works
- [ ] Profile data persists

### Performance Testing

```bash
# Lighthouse testing
npm install -g lighthouse
lighthouse https://yourdomain.vercel.app
```

### Browser Compatibility Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Android Chrome

### Mobile Testing

Use Chrome DevTools:
1. Press F12
2. Click device toolbar icon
3. Test on:
   - iPhone 12
   - iPhone 14 Pro
   - iPhone SE
   - Pixel 6
   - Samsung Galaxy S21

---

## 📚 Example Implementations

### Complete Food Service Integration

```javascript
// src/services/foodService.js

import axios from 'axios';
import { storage } from '../utils/utils';

const API_BASE_URL = import.meta.env.VITE_FOOD_API_BASE_URL;
const API_KEY = import.meta.env.VITE_FOOD_API_KEY;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class FoodService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  /**
   * Get cached food data if available
   */
  getCachedFood(query) {
    const cached = storage.get(`food_${query}`);
    if (!cached) return null;
    
    const { data, timestamp } = cached;
    if (Date.now() - timestamp > CACHE_DURATION) {
      storage.remove(`food_${query}`);
      return null;
    }
    
    return data;
  }

  /**
   * Cache food search results
   */
  cacheFood(query, data) {
    storage.set(`food_${query}`, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Search for foods with caching
   */
  async searchFoods(query, pageSize = 10) {
    // Check cache first
    const cached = this.getCachedFood(query);
    if (cached) return cached;

    try {
      const response = await this.client.get('/foods/search', {
        params: {
          query,
          pageSize,
          api_key: API_KEY,
        }
      });

      const foods = (response.data.foods || []).map(food => this.normalizeFoodData(food));
      
      // Cache results
      this.cacheFood(query, foods);
      
      return foods;
    } catch (error) {
      console.error('Food search error:', error);
      return [];
    }
  }

  /**
   * Normalize API response to standard format
   */
  normalizeFoodData(food) {
    const nutrients = {};
    
    food.foodNutrients?.forEach(nutrient => {
      if (nutrient.nutrientId === 1008) nutrients.calories = nutrient.value;
      if (nutrient.nutrientId === 1003) nutrients.protein = nutrient.value;
      if (nutrient.nutrientId === 1005) nutrients.carbs = nutrient.value;
      if (nutrient.nutrientId === 1004) nutrients.fat = nutrient.value;
      if (nutrient.nutrientId === 1079) nutrients.fiber = nutrient.value;
    });

    return {
      id: food.fdcId,
      name: food.description,
      brand: food.brandName || 'Generic',
      calories: nutrients.calories || 0,
      protein: nutrients.protein || 0,
      carbs: nutrients.carbs || 0,
      fat: nutrients.fat || 0,
      fiber: nutrients.fiber || 0,
      servingSize: food.servingSize || 100,
      servingUnit: food.servingSizeUnit || 'g',
    };
  }

  /**
   * Get food details by ID
   */
  async getFoodDetails(foodId) {
    try {
      const response = await this.client.get(`/food/${foodId}`, {
        params: {
          api_key: API_KEY,
        }
      });

      return this.normalizeFoodData(response.data);
    } catch (error) {
      console.error('Food details error:', error);
      return null;
    }
  }

  /**
   * Calculate nutrition for quantity
   */
  calculateNutritionForQuantity(foodData, quantity, servingSize = 100) {
    const multiplier = quantity / servingSize;
    
    return {
      ...foodData,
      calories: foodData.calories * multiplier,
      protein: foodData.protein * multiplier,
      carbs: foodData.carbs * multiplier,
      fat: foodData.fat * multiplier,
      fiber: foodData.fiber * multiplier,
      quantity,
    };
  }
}

export default new FoodService();
```

### Complete Supabase Integration

```javascript
// src/services/supabaseService.js

import { supabase } from './supabaseClient';

class SupabaseService {
  /**
   * Create user profile
   */
  async createUser(userData) {
    const { error } = await supabase
      .from('users')
      .insert([userData]);
    
    if (error) throw error;
    return userData;
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  }

  /**
   * Get or create daily tracking
   */
  async getDailyTracking(userId, date) {
    const { data, error } = await supabase
      .from('daily_tracking')
      .select('*')
      .eq('user_id', userId)
      .eq('tracking_date', date)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // Not found, create new
      return await this.createDailyTracking(userId, date);
    }
    
    if (error) throw error;
    return data;
  }

  /**
   * Create daily tracking
   */
  async createDailyTracking(userId, date) {
    const { data, error } = await supabase
      .from('daily_tracking')
      .insert([{
        user_id: userId,
        tracking_date: date,
        target_calories: 2000,
        consumed_calories: 0,
        water_intake: 0,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Add food to daily tracking
   */
  async addFoodLog(foodData) {
    const { data, error } = await supabase
      .from('food_log')
      .insert([foodData])
      .select();
    
    if (error) throw error;
    return data;
  }

  /**
   * Get all food logs for date
   */
  async getFoodLogs(userId, date) {
    const { data, error } = await supabase
      .from('food_log')
      .select(`
        *,
        daily_tracking(id)
      `)
      .eq('user_id', userId)
      .eq('daily_tracking.tracking_date', date);
    
    if (error) throw error;
    return data;
  }

  /**
   * Delete food log
   */
  async deleteFoodLog(foodLogId) {
    const { error } = await supabase
      .from('food_log')
      .delete()
      .eq('id', foodLogId);
    
    if (error) throw error;
  }

  /**
   * Add exercise log
   */
  async addExerciseLog(exerciseData) {
    const { data, error } = await supabase
      .from('exercise_log')
      .insert([exerciseData])
      .select();
    
    if (error) throw error;
    return data;
  }

  /**
   * Get activity history
   */
  async getActivityHistory(userId, limit = 20) {
    const { data, error } = await supabase
      .from('activity_history')
      .select('*')
      .eq('user_id', userId)
      .order('activity_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  /**
   * Update daily tracking
   */
  async updateDailyTracking(trackingId, updates) {
    const { data, error } = await supabase
      .from('daily_tracking')
      .update(updates)
      .eq('id', trackingId);
    
    if (error) throw error;
    return data;
  }
}

export default new SupabaseService();
```

---

## 📖 API References

### USDA FoodData Central API
- **Documentation**: https://fdc.nal.usda.gov/api-guide.html
- **Base URL**: https://api.nal.usda.gov/fdc/v1
- **Rate Limit**: 120 requests/minute
- **Authentication**: Query parameter `api_key`

### Nutritionix API
- **Documentation**: https://www.nutritionix.com/business/api
- **Base URL**: https://trackapi.nutritionix.com/v2
- **Authentication**: Headers `x-app-id` and `x-app-key`

### Edamam API
- **Documentation**: https://developer.edamam.com/
- **Base URL**: https://api.edamam.com
- **Authentication**: Query parameters `app_id` and `app_key`

### Supabase API
- **Documentation**: https://supabase.com/docs
- **Type**: PostgreSQL Database + Auth
- **Authentication**: JWT Tokens via Auth

---

## 🔍 Debugging

### Enable Debug Logging

```javascript
// In your API service
const DEBUG = import.meta.env.VITE_DEBUG_MODE === 'true';

if (DEBUG) {
  console.log('API Request:', { url, params, data });
  console.log('API Response:', response);
}
```

### Network Tab Inspection

1. Open DevTools (F12)
2. Go to Network tab
3. Monitor API requests
4. Check response status and payload

### Supabase Dashboard Monitoring

1. Go to Supabase dashboard
2. Database > Logs
3. View real-time query logs
4. Check for errors

---

## 🚀 Performance Optimization

### API Request Caching

Implemented in FoodService with 24-hour cache

### Database Query Optimization

- Indexes created on frequently queried columns
- Pagination implemented for large datasets
- Selective column selection with `select()`

### Frontend Optimization

- React.memo for expensive components
- useCallback for event handlers
- Code splitting with dynamic imports

---

This guide provides complete API integration examples and testing procedures for CaloryTracker Pro. Choose the food API that best suits your needs and follow the implementation examples provided.
