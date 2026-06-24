import React, { useState, useEffect } from 'react';
import {
  Home,
  Apple,
  TrendingUp,
  Zap,
  User,
  Mail,
  Eye,
  EyeOff,
  Phone,
  Menu,
  LogOut,
  Settings,
  Download,
  Play,
  Pause,
  StopCircle,
  Search,
  Plus,
  X,
} from 'lucide-react';

// ─── Static Data ────────────────────────────────────────────────────────────

const foodDatabase = [
  // ── Indian Staples & Rice Dishes ─────────────────────────────────────────
  { id: 1,   name: 'Basmati Rice, cooked (100g)',       calories: 130, protein: 2.7, carbs: 28,  fat: 0.3, fiber: 0.4 },
  { id: 2,   name: 'Brown Rice, cooked (100g)',          calories: 111, protein: 2.6, carbs: 23,  fat: 0.9, fiber: 1.8 },
  { id: 3,   name: 'Jeera Rice (1 serving 150g)',        calories: 220, protein: 4,   carbs: 40,  fat: 5,   fiber: 0.5 },
  { id: 4,   name: 'Biryani - Veg (1 plate 300g)',       calories: 400, protein: 9,   carbs: 65,  fat: 12,  fiber: 3   },
  { id: 5,   name: 'Biryani - Chicken (1 plate 350g)',   calories: 490, protein: 28,  carbs: 58,  fat: 15,  fiber: 2   },
  { id: 6,   name: 'Khichdi (1 bowl 200g)',              calories: 200, protein: 7,   carbs: 35,  fat: 4,   fiber: 3   },
  { id: 7,   name: 'Pulao (1 serving 150g)',             calories: 210, protein: 4,   carbs: 38,  fat: 5,   fiber: 1.5 },

  // ── Indian Breads ─────────────────────────────────────────────────────────
  { id: 8,   name: 'Roti / Chapati (1 piece)',           calories: 71,  protein: 2.7, carbs: 14,  fat: 0.9, fiber: 1.9 },
  { id: 9,   name: 'Whole Wheat Roti (1 piece)',         calories: 80,  protein: 3,   carbs: 15,  fat: 1,   fiber: 2.5 },
  { id: 10,  name: 'Paratha - Plain (1 piece)',          calories: 160, protein: 3.5, carbs: 22,  fat: 6,   fiber: 2   },
  { id: 11,  name: 'Paratha - Aloo (1 piece)',           calories: 200, protein: 4,   carbs: 28,  fat: 8,   fiber: 2.5 },
  { id: 12,  name: 'Naan (1 piece)',                     calories: 262, protein: 8.7, carbs: 45,  fat: 5,   fiber: 1.7 },
  { id: 13,  name: 'Puri (1 piece)',                     calories: 100, protein: 2,   carbs: 13,  fat: 4.5, fiber: 1   },
  { id: 14,  name: 'Bhatura (1 piece)',                  calories: 190, protein: 4,   carbs: 27,  fat: 8,   fiber: 1   },
  { id: 15,  name: 'Dosa - Plain (1 piece)',             calories: 120, protein: 3,   carbs: 22,  fat: 2.5, fiber: 1   },
  { id: 16,  name: 'Masala Dosa (1 piece)',              calories: 230, protein: 5,   carbs: 35,  fat: 8,   fiber: 2   },
  { id: 17,  name: 'Idli (1 piece)',                     calories: 39,  protein: 2,   carbs: 8,   fat: 0.2, fiber: 0.5 },
  { id: 18,  name: 'Uttapam (1 piece)',                  calories: 107, protein: 3.5, carbs: 18,  fat: 2.5, fiber: 1.5 },

  // ── Indian Curries & Gravies ──────────────────────────────────────────────
  { id: 19,  name: 'Dal Tadka (1 bowl 200ml)',           calories: 170, protein: 10,  carbs: 22,  fat: 5,   fiber: 6   },
  { id: 20,  name: 'Dal Makhani (1 bowl 200ml)',         calories: 220, protein: 10,  carbs: 24,  fat: 9,   fiber: 6   },
  { id: 21,  name: 'Chana Masala (1 bowl 200g)',         calories: 210, protein: 11,  carbs: 32,  fat: 5,   fiber: 9   },
  { id: 22,  name: 'Rajma (1 bowl 200g)',                calories: 220, protein: 13,  carbs: 35,  fat: 4,   fiber: 10  },
  { id: 23,  name: 'Palak Paneer (1 bowl 200g)',         calories: 260, protein: 14,  carbs: 10,  fat: 18,  fiber: 3   },
  { id: 24,  name: 'Paneer Butter Masala (1 bowl 200g)', calories: 340, protein: 14,  carbs: 14,  fat: 26,  fiber: 2   },
  { id: 25,  name: 'Chicken Curry (1 bowl 200g)',        calories: 280, protein: 26,  carbs: 8,   fat: 16,  fiber: 1.5 },
  { id: 26,  name: 'Butter Chicken (1 bowl 200g)',       calories: 320, protein: 25,  carbs: 12,  fat: 20,  fiber: 1   },
  { id: 27,  name: 'Mutton Curry (1 bowl 200g)',         calories: 360, protein: 28,  carbs: 6,   fat: 24,  fiber: 1   },
  { id: 28,  name: 'Fish Curry (1 bowl 200g)',           calories: 240, protein: 24,  carbs: 8,   fat: 13,  fiber: 1   },
  { id: 29,  name: 'Egg Curry (2 eggs + gravy)',         calories: 250, protein: 16,  carbs: 10,  fat: 16,  fiber: 1.5 },
  { id: 30,  name: 'Sambar (1 bowl 200ml)',              calories: 90,  protein: 4,   carbs: 14,  fat: 2,   fiber: 4   },
  { id: 31,  name: 'Rasam (1 bowl 200ml)',               calories: 50,  protein: 2,   carbs: 8,   fat: 1,   fiber: 1   },

  // ── Indian Snacks & Street Food ───────────────────────────────────────────
  { id: 32,  name: 'Samosa (1 piece)',                   calories: 130, protein: 2.5, carbs: 16,  fat: 6.5, fiber: 1.5 },
  { id: 33,  name: 'Vada Pav (1 piece)',                 calories: 290, protein: 6,   carbs: 44,  fat: 10,  fiber: 3   },
  { id: 34,  name: 'Pav Bhaji (1 plate)',                calories: 380, protein: 9,   carbs: 55,  fat: 14,  fiber: 6   },
  { id: 35,  name: 'Pani Puri (6 pieces)',               calories: 180, protein: 3,   carbs: 30,  fat: 5,   fiber: 2   },
  { id: 36,  name: 'Bhel Puri (1 plate 150g)',           calories: 180, protein: 4,   carbs: 32,  fat: 4,   fiber: 3   },
  { id: 37,  name: 'Aloo Tikki (1 piece)',               calories: 140, protein: 3,   carbs: 22,  fat: 5,   fiber: 2   },
  { id: 38,  name: 'Dhokla (2 pieces 100g)',             calories: 130, protein: 5,   carbs: 22,  fat: 3,   fiber: 1.5 },
  { id: 39,  name: 'Medu Vada (1 piece)',                calories: 100, protein: 3.5, carbs: 12,  fat: 4.5, fiber: 1.5 },
  { id: 40,  name: 'Pakora (4 pieces 80g)',              calories: 200, protein: 5,   carbs: 22,  fat: 10,  fiber: 2   },

  // ── Indian Breakfast ──────────────────────────────────────────────────────
  { id: 41,  name: 'Poha (1 bowl 150g)',                 calories: 180, protein: 4,   carbs: 32,  fat: 4,   fiber: 2   },
  { id: 42,  name: 'Upma (1 bowl 150g)',                 calories: 190, protein: 5,   carbs: 30,  fat: 5,   fiber: 2.5 },
  { id: 43,  name: 'Halwa - Suji (1 bowl 100g)',         calories: 230, protein: 3,   carbs: 36,  fat: 8,   fiber: 0.5 },
  { id: 44,  name: 'Besan Cheela (1 piece)',             calories: 120, protein: 6,   carbs: 14,  fat: 4,   fiber: 3   },
  { id: 45,  name: 'Sabudana Khichdi (1 bowl 150g)',     calories: 300, protein: 3,   carbs: 55,  fat: 7,   fiber: 1   },

  // ── Indian Dairy & Drinks ─────────────────────────────────────────────────
  { id: 46,  name: 'Paneer (100g)',                      calories: 265, protein: 18,  carbs: 1.2, fat: 20,  fiber: 0   },
  { id: 47,  name: 'Dahi / Curd (100g)',                 calories: 60,  protein: 3.5, carbs: 4,   fat: 3,   fiber: 0   },
  { id: 48,  name: 'Lassi - Sweet (1 glass 250ml)',      calories: 200, protein: 6,   carbs: 30,  fat: 6,   fiber: 0   },
  { id: 49,  name: 'Lassi - Salted (1 glass 250ml)',     calories: 120, protein: 6,   carbs: 12,  fat: 5,   fiber: 0   },
  { id: 50,  name: 'Chai with Milk & Sugar (1 cup)',     calories: 60,  protein: 1.5, carbs: 9,   fat: 1.5, fiber: 0   },
  { id: 51,  name: 'Masala Chai (1 cup)',                calories: 70,  protein: 2,   carbs: 10,  fat: 2,   fiber: 0   },
  { id: 52,  name: 'Buttermilk / Chaas (1 glass 200ml)',calories: 40,  protein: 2,   carbs: 4,   fat: 1,   fiber: 0   },
  { id: 53,  name: 'Milk - Full Fat (200ml)',            calories: 130, protein: 6.8, carbs: 9.6, fat: 7,   fiber: 0   },

  // ── Indian Sweets & Desserts ──────────────────────────────────────────────
  { id: 54,  name: 'Gulab Jamun (1 piece)',              calories: 150, protein: 2,   carbs: 25,  fat: 5,   fiber: 0   },
  { id: 55,  name: 'Jalebi (2 pieces 50g)',              calories: 150, protein: 1.5, carbs: 30,  fat: 3.5, fiber: 0   },
  { id: 56,  name: 'Kheer (1 bowl 150g)',                calories: 180, protein: 5,   carbs: 28,  fat: 5.5, fiber: 0.5 },
  { id: 57,  name: 'Ladoo - Besan (1 piece)',            calories: 180, protein: 4,   carbs: 22,  fat: 9,   fiber: 1   },

  // ── Pulses & Legumes ──────────────────────────────────────────────────────
  { id: 58,  name: 'Moong Dal, cooked (100g)',           calories: 105, protein: 7,   carbs: 19,  fat: 0.4, fiber: 7   },
  { id: 59,  name: 'Masoor Dal, cooked (100g)',          calories: 116, protein: 9,   carbs: 20,  fat: 0.4, fiber: 8   },
  { id: 60,  name: 'Chana Dal, cooked (100g)',           calories: 164, protein: 9,   carbs: 27,  fat: 2.6, fiber: 8   },
  { id: 61,  name: 'Kidney Beans / Rajma (100g)',        calories: 127, protein: 8.7, carbs: 22,  fat: 0.5, fiber: 6   },
  { id: 62,  name: 'Black Chana, cooked (100g)',         calories: 164, protein: 9,   carbs: 27,  fat: 2.6, fiber: 8   },

  // ── Vegetables (Indian Cooking) ───────────────────────────────────────────
  { id: 63,  name: 'Aloo Gobi (1 bowl 150g)',            calories: 130, protein: 3,   carbs: 18,  fat: 5,   fiber: 4   },
  { id: 64,  name: 'Bhindi Masala (1 bowl 150g)',        calories: 110, protein: 3,   carbs: 12,  fat: 5,   fiber: 4   },
  { id: 65,  name: 'Baingan Bharta (1 bowl 150g)',       calories: 100, protein: 2.5, carbs: 12,  fat: 4.5, fiber: 4   },
  { id: 66,  name: 'Mixed Veg Sabzi (1 bowl 150g)',      calories: 120, protein: 3,   carbs: 14,  fat: 5,   fiber: 4   },
  { id: 67,  name: 'Spinach / Palak (100g raw)',         calories: 23,  protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  { id: 68,  name: 'Tomato (1 medium)',                  calories: 22,  protein: 1,   carbs: 4.8, fat: 0.2, fiber: 1.5 },
  { id: 69,  name: 'Onion (1 medium)',                   calories: 44,  protein: 1.2, carbs: 10,  fat: 0.1, fiber: 1.7 },
  { id: 70,  name: 'Potato (1 medium 150g)',             calories: 116, protein: 2.5, carbs: 26,  fat: 0.1, fiber: 2.2 },

  // ── Fruits (Common in India) ──────────────────────────────────────────────
  { id: 71,  name: 'Mango (1 medium 200g)',              calories: 134, protein: 1,   carbs: 35,  fat: 0.6, fiber: 3   },
  { id: 72,  name: 'Banana (1 medium)',                  calories: 89,  protein: 1.1, carbs: 23,  fat: 0.3, fiber: 2.6 },
  { id: 73,  name: 'Apple (1 medium)',                   calories: 95,  protein: 0.5, carbs: 25,  fat: 0.3, fiber: 4.4 },
  { id: 74,  name: 'Papaya (100g)',                      calories: 43,  protein: 0.5, carbs: 11,  fat: 0.3, fiber: 1.7 },
  { id: 75,  name: 'Guava (1 medium)',                   calories: 68,  protein: 2.6, carbs: 14,  fat: 1,   fiber: 5.4 },
  { id: 76,  name: 'Watermelon (100g)',                  calories: 30,  protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4 },
  { id: 77,  name: 'Orange (1 medium)',                  calories: 62,  protein: 1.2, carbs: 15,  fat: 0.2, fiber: 3.1 },
  { id: 78,  name: 'Pomegranate (100g)',                 calories: 83,  protein: 1.7, carbs: 19,  fat: 1.2, fiber: 4   },

  // ── Nuts & Seeds ─────────────────────────────────────────────────────────
  { id: 79,  name: 'Almonds (30g / ~20 pieces)',         calories: 164, protein: 6,   carbs: 6,   fat: 14,  fiber: 3.5 },
  { id: 80,  name: 'Cashews (30g)',                      calories: 163, protein: 4.3, carbs: 9,   fat: 13,  fiber: 0.9 },
  { id: 81,  name: 'Peanuts (30g)',                      calories: 166, protein: 7.5, carbs: 6,   fat: 14,  fiber: 2.5 },
  { id: 82,  name: 'Walnuts (30g)',                      calories: 196, protein: 4.6, carbs: 4,   fat: 19,  fiber: 2   },
  { id: 83,  name: 'Flaxseeds (1 tbsp 10g)',             calories: 55,  protein: 1.9, carbs: 3,   fat: 4.3, fiber: 2.8 },

  // ── Proteins ──────────────────────────────────────────────────────────────
  { id: 84,  name: 'Chicken Breast (100g)',              calories: 165, protein: 31,  carbs: 0,   fat: 3.6, fiber: 0   },
  { id: 85,  name: 'Chicken Leg (100g)',                 calories: 232, protein: 26,  carbs: 0,   fat: 14,  fiber: 0   },
  { id: 86,  name: 'Egg (1 whole large)',                calories: 78,  protein: 6.3, carbs: 0.6, fat: 5.3, fiber: 0   },
  { id: 87,  name: 'Egg White (1 large)',                calories: 17,  protein: 3.6, carbs: 0.2, fat: 0.1, fiber: 0   },
  { id: 88,  name: 'Salmon (100g)',                      calories: 208, protein: 20,  carbs: 0,   fat: 13,  fiber: 0   },
  { id: 89,  name: 'Tuna, canned (100g)',                calories: 116, protein: 26,  carbs: 0,   fat: 1,   fiber: 0   },
  { id: 90,  name: 'Greek Yogurt (100g)',                calories: 59,  protein: 10,  carbs: 3.3, fat: 0.4, fiber: 0   },
  { id: 91,  name: 'Whey Protein (1 scoop 30g)',         calories: 120, protein: 24,  carbs: 3,   fat: 1.5, fiber: 0   },

  // ── Fast Food & Common Outside Food ───────────────────────────────────────
  { id: 92,  name: 'Burger - Veg (1 piece)',             calories: 310, protein: 8,   carbs: 42,  fat: 12,  fiber: 3   },
  { id: 93,  name: 'Burger - Chicken (1 piece)',         calories: 380, protein: 20,  carbs: 38,  fat: 17,  fiber: 2   },
  { id: 94,  name: 'Pizza - Veg slice (1 slice)',        calories: 250, protein: 9,   carbs: 33,  fat: 9,   fiber: 2   },
  { id: 95,  name: 'French Fries (medium 120g)',         calories: 365, protein: 4,   carbs: 48,  fat: 17,  fiber: 3.8 },
  { id: 96,  name: 'White Bread (1 slice)',              calories: 79,  protein: 2.7, carbs: 15,  fat: 1,   fiber: 0.6 },
  { id: 97,  name: 'Maggi Noodles (1 pack 70g)',         calories: 310, protein: 7,   carbs: 43,  fat: 12,  fiber: 1   },
  { id: 98,  name: 'Oats, cooked (100g)',                calories: 71,  protein: 2.5, carbs: 12,  fat: 1.5, fiber: 1.7 },
  { id: 99,  name: 'Sweet Potato (100g)',                calories: 86,  protein: 1.6, carbs: 20,  fat: 0.1, fiber: 3   },
  { id: 100, name: 'Broccoli (100g)',                    calories: 34,  protein: 2.8, carbs: 7,   fat: 0.4, fiber: 2.4 },
];

const exerciseDatabase = [
  { id: 1,  name: 'Running',       caloriesPerMin: 10, icon: '🏃' },
  { id: 2,  name: 'Walking',       caloriesPerMin: 4,  icon: '🚶' },
  { id: 3,  name: 'Jumping Jacks', caloriesPerMin: 8,  icon: '⏫' },
  { id: 4,  name: 'Push-ups',      caloriesPerMin: 7,  icon: '💪' },
  { id: 5,  name: 'Pull-ups',      caloriesPerMin: 9,  icon: '🤸' },
  { id: 6,  name: 'Cycling',       caloriesPerMin: 8,  icon: '🚴' },
  { id: 7,  name: 'Swimming',      caloriesPerMin: 11, icon: '🏊' },
  { id: 8,  name: 'Yoga',          caloriesPerMin: 3,  icon: '🧘' },
  { id: 9,  name: 'Boxing',        caloriesPerMin: 12, icon: '🥊' },
  { id: 10, name: 'Skipping',      caloriesPerMin: 10, icon: '⛹️' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getActivityColor = (caloriesConsumed, target = 2000) => {
  const pct = (caloriesConsumed / target) * 100;
  if (pct >= 90) return '#10B981';
  if (pct >= 60) return '#FBBF24';
  return '#EF4444';
};

// ─── Tab icon / label maps (defined outside component to avoid re-creation) ──

const TAB_LIST   = ['home', 'log-food', 'progress', 'exercise', 'profile'];
const TAB_ICONS  = { home: <Home size={22} />, 'log-food': <Apple size={22} />, progress: <TrendingUp size={22} />, exercise: <Zap size={22} />, profile: <User size={22} /> };
const TAB_LABELS = { home: 'Home', 'log-food': 'Log Food', progress: 'Progress', exercise: 'Exercise', profile: 'Profile' };

// ─── Main Component ───────────────────────────────────────────────────────────

const CaloryTrackerPro = () => {

  // ── Auth ──────────────────────────────────────────────────────────────────
  const [authStep,   setAuthStep]   = useState('login'); // login | signup | otp | onboarding | app
  const [authMethod, setAuthMethod] = useState(null);    // email | google | phone | guest
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [phone,      setPhone]      = useState('');
  const [otp,        setOtp]        = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [isNewUser,  setIsNewUser]  = useState(false); // toggle between Sign In / Sign Up
  const [otpSent,    setOtpSent]    = useState(false); // tracks if OTP has been sent
  const [editingProfile, setEditingProfile] = useState(false); // show edit profile form

  // ── User profile ──────────────────────────────────────────────────────────
  const [user, setUser] = useState({
    id: null, name: '', email: '', gender: '',
    age: '', height: '', weight: '', goal: '', isGuest: false,
  });

  // ── App navigation ────────────────────────────────────────────────────────
  const [currentTab,      setCurrentTab]      = useState('home');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ── Daily nutrition data ──────────────────────────────────────────────────
  const [dailyData, setDailyData] = useState({
    targetCalories: 2000,
    consumedCalories: 0,
    protein: 0, carbs: 0, fat: 0, fiber: 0,
    waterIntake: 0,
    waterTarget: 3000,
  });

  // ── Food log ──────────────────────────────────────────────────────────────
  const [foodItems,    setFoodItems]    = useState([]);
  const [foodSearch,   setFoodSearch]   = useState('');
  const [foodCategory, setFoodCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState('');

  // ── Exercise ──────────────────────────────────────────────────────────────
  const [exercises,         setExercises]         = useState([]);
  const [selectedExercise,  setSelectedExercise]  = useState(null);
  const [exerciseTimer,     setExerciseTimer]     = useState(0);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);

  // ── Activity history (lazy init so random values are stable) ─────────────
  // FIX: was re-generated on every render; lazy initialiser runs only once.
  const [activityHistory] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      date:             new Date(Date.now() - (19 - i) * 24 * 60 * 60 * 1000),
      caloriesConsumed: Math.floor(Math.random() * 2500) + 1500,
      caloriesBurned:   Math.floor(Math.random() * 500),
      waterIntake:      Math.floor(Math.random() * 4000) + 1000,
    }))
  );

  // ── Exercise timer effect ─────────────────────────────────────────────────
  useEffect(() => {
    let interval;
    if (isExerciseRunning && selectedExercise) {
      interval = setInterval(() => setExerciseTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseRunning, selectedExercise]);

  // ── BMI helpers ───────────────────────────────────────────────────────────
  const calculateBMI = () => {
    if (!user.height || !user.weight) return null;
    const h = user.height / 100;
    return (user.weight / (h * h)).toFixed(1);
  };

  const getBMICategory = () => {
    // FIX: calculateBMI returns a string; must parseFloat before numeric comparison.
    const bmi = parseFloat(calculateBMI());
    if (!bmi) return null;
    if (bmi < 18.5) return { category: 'Underweight',    color: '#3B82F6' };
    if (bmi < 25)   return { category: 'Healthy Weight', color: '#10B981' };
    if (bmi < 30)   return { category: 'Overweight',     color: '#F59E0B' };
    return              { category: 'Obese',           color: '#EF4444' };
  };

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLogin = (method) => {
    setAuthMethod(method);
    if (method === 'guest') {
      setUser(u => ({ ...u, isGuest: true }));
      setAuthStep('onboarding');
    } else if (method === 'phone') {
      setAuthStep('otp');
    } else if (method === 'google') {
      // Google auth: simulate OAuth and land on onboarding/home
      setLoading(true);
      setTimeout(() => {
        setUser(u => ({ ...u, email: 'user@gmail.com', id: Math.random() }));
        setAuthStep('onboarding');
        setLoading(false);
      }, 1000);
    } else {
      setAuthStep('signup');
    }
  };

  const handleEmailAuth = () => {
    if (!email || !password) { alert('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      // FIX: use functional updater to avoid stale closure.
      setUser(u => ({ ...u, email, id: Math.random() }));
      setAuthStep('onboarding');
      setLoading(false);
    }, 1000);
  };

  const handleSendOTP = () => {
    if (!phone || phone.length < 10) { alert('Please enter a valid phone number'); return; }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      alert(`OTP sent to ${phone}`);
    }, 1000);
  };

  const handleOTPSubmit = () => {
    if (!phone || !otp) { alert('Please enter phone and OTP'); return; }
    setUser(u => ({ ...u, email: phone, id: Math.random() }));
    setOtpSent(false);
    setAuthStep('onboarding');
  };

  const handleOnboardingSubmit = () => {
    if (!user.name || !user.gender || !user.age || !user.height || !user.weight || !user.goal) {
      alert('Please complete all fields');
      return;
    }
    setAuthStep('app');
  };

  // ── Food handlers ─────────────────────────────────────────────────────────
  const handleAddFood = () => {
    if (!selectedFood || !foodQuantity) { alert('Select food and enter quantity'); return; }
    const food     = foodDatabase.find(f => f.id === selectedFood);
    const quantity = parseFloat(foodQuantity);

    const newFood = {
      id:       Math.random(),
      name:     food.name,
      quantity,
      calories: food.calories * quantity,
      protein:  food.protein  * quantity,
      carbs:    food.carbs    * quantity,
      fat:      food.fat      * quantity,
      fiber:    food.fiber    * quantity,
    };

    setFoodItems(prev => [...prev, newFood]);
    // FIX: functional updater avoids stale dailyData closure.
    setDailyData(prev => ({
      ...prev,
      consumedCalories: prev.consumedCalories + newFood.calories,
      protein:          prev.protein  + newFood.protein,
      carbs:            prev.carbs    + newFood.carbs,
      fat:              prev.fat      + newFood.fat,
      fiber:            prev.fiber    + newFood.fiber,
    }));

    setSelectedFood(null);
    setFoodQuantity('');
    setFoodSearch('');
  };

  const handleRemoveFood = (id) => {
    const food = foodItems.find(f => f.id === id);
    // FIX: guard against missing item to prevent crash.
    if (!food) return;

    setFoodItems(prev => prev.filter(f => f.id !== id));
    setDailyData(prev => ({
      ...prev,
      consumedCalories: prev.consumedCalories - food.calories,
      protein:          prev.protein  - food.protein,
      carbs:            prev.carbs    - food.carbs,
      fat:              prev.fat      - food.fat,
      fiber:            prev.fiber    - food.fiber,
    }));
  };

  // ── Exercise handlers ─────────────────────────────────────────────────────
  const handleEndExercise = () => {
    const exercise = exerciseDatabase.find(e => e.id === selectedExercise);
    // FIX: guard for missing exercise entry.
    if (!exercise) return;

    const caloriesBurned = (exercise.caloriesPerMin * exerciseTimer) / 60;

    setDailyData(prev => ({
      ...prev,
      consumedCalories: Math.max(0, prev.consumedCalories - caloriesBurned),
    }));

    setExercises(prev => [...prev, {
      id:       Math.random(),
      name:     exercise.name,
      duration: exerciseTimer,
      calories: caloriesBurned,
    }]);

    setSelectedExercise(null);
    setExerciseTimer(0);
    setIsExerciseRunning(false);
  };

  // ── Export ────────────────────────────────────────────────────────────────
  const handleExportData = () => {
    const avg   = Math.round(activityHistory.reduce((a, b) => a + b.caloriesConsumed, 0) / activityHistory.length);
    const water = activityHistory.reduce((a, b) => a + b.waterIntake, 0);
    const burnt = activityHistory.reduce((a, b) => a + b.caloriesBurned, 0);

    const csv =
      `CaloryTracker Pro - Activity Report\n\n` +
      `User: ${user.name}\nGender: ${user.gender}\nAge: ${user.age}\n` +
      `Height: ${user.height}cm\nWeight: ${user.weight}kg\nGoal: ${user.goal}\nBMI: ${calculateBMI()}\n\n` +
      `Summary:\nAverage Daily Calories: ${avg}\nTotal Water Intake (20 days): ${water}ml\nTotal Calories Burned: ${burnt}\n\n` +
      `Last 20 Days Activity:\nDate,Calories Consumed,Calories Burned,Water Intake\n` +
      activityHistory.map(d =>
        `${d.date.toLocaleDateString()},${d.caloriesConsumed},${d.caloriesBurned},${d.waterIntake}`
      ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = window.URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `CaloryTracker_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH SCREENS
  // ═══════════════════════════════════════════════════════════════════════════

  if (authStep === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold text-white mb-2">CaloryTracker</h1>
            <p className="text-teal-50">Professional Nutrition &amp; Fitness Tracking</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Get Started</h2>

            <button
              onClick={() => handleLogin('email')}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              <Mail className="inline mr-2" size={20} />
              Continue with Email
            </button>

            {/* FIX: removed non-existent <Google> lucide icon; replaced with SVG inline */}
            <button
              onClick={() => handleLogin('google')}
              className="w-full py-3 border-2 border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              <svg className="inline mr-2 mb-0.5" width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1H12v2.87h5.35c-.24 1.3-1 2.4-2.1 3.12v2.6h3.4c2-1.84 3.15-4.56 3.15-7.74 0-.52-.05-1.03-.15-1.53-.05-.25-.1-.5-.25-.32z" opacity=".8"/>
                <path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.4-2.6c-.9.6-2.04.96-3.22.96-2.48 0-4.58-1.67-5.33-3.92H3.13v2.67C4.78 19.93 8.16 22 12 22z" opacity=".8"/>
                <path d="M6.67 14.01A5.94 5.94 0 0 1 6.35 12c0-.7.12-1.38.32-2.01V7.32H3.13A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.13 4.48l3.54-2.47z" opacity=".8"/>
                <path d="M12 6.08c1.4 0 2.65.48 3.64 1.42l2.72-2.72C16.95 3.24 14.69 2.25 12 2.25 8.16 2.25 4.78 4.32 3.13 7.52l3.54 2.47C7.42 7.75 9.52 6.08 12 6.08z" opacity=".8"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleLogin('phone')}
              className="w-full py-3 bg-white border-2 border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              <Phone className="inline mr-2" size={20} />
              Continue with Phone
            </button>

            <button
              onClick={() => handleLogin('guest')}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continue as Guest
            </button>

            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>

            <div className="border-t pt-4 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => { setIsNewUser(true); setAuthMethod('email'); setAuthStep('signup'); }}
                  className="text-teal-600 font-bold hover:text-teal-700 underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'signup' && authMethod === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🎯</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isNewUser ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-teal-100">
              {isNewUser ? 'Sign up to start tracking' : 'Sign in to your account'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            {/* Toggle tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-2">
              <button
                onClick={() => setIsNewUser(false)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                  !isNewUser ? 'bg-teal-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsNewUser(true)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                  isNewUser ? 'bg-teal-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {isNewUser && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                onChange={e => setUser(u => ({ ...u, name: e.target.value }))}
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isNewUser && (
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            <button
              onClick={handleEmailAuth}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? (isNewUser ? 'Creating Account…' : 'Signing In…') : (isNewUser ? 'Create Account' : 'Sign In')}
            </button>

            <button
              onClick={() => { setAuthStep('login'); setIsNewUser(false); }}
              className="w-full text-teal-600 font-semibold hover:text-teal-700 text-sm"
            >
              ← Back to all options
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📱</div>
            <h1 className="text-3xl font-bold text-white mb-2">Phone Verification</h1>
            <p className="text-teal-100">
              {otpSent ? `OTP sent to ${phone}` : 'Enter your mobile number'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            {/* Step 1: Enter phone + Send OTP */}
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Phone Number (+91XXXXXXXXXX)"
                value={phone}
                onChange={e => { setPhone(e.target.value); setOtpSent(false); setOtp(''); }}
                disabled={otpSent}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {!otpSent && (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? '…' : 'Send OTP'}
                </button>
              )}
              {otpSent && (
                <button
                  onClick={() => { setOtpSent(false); setOtp(''); }}
                  className="px-4 py-3 border border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition whitespace-nowrap text-sm"
                >
                  Resend
                </button>
              )}
            </div>

            {/* Step 2: Enter OTP — shown only after OTP is sent */}
            {otpSent && (
              <>
                <div className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 text-sm text-teal-700 text-center">
                  ✅ OTP sent! Enter the 6-digit code below
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-center text-2xl tracking-widest font-bold"
                />
                <button
                  onClick={handleOTPSubmit}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Verify OTP
                </button>
              </>
            )}

            <button
              onClick={() => { setAuthStep('login'); setOtpSent(false); setOtp(''); setPhone(''); }}
              className="w-full text-teal-600 font-semibold hover:text-teal-700 text-sm"
            >
              ← Back to all options
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'onboarding') {
    return (
      <div
        className="min-h-screen p-6 overflow-y-auto"
        style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl font-bold text-white mb-2">Let's Get to Know You</h1>
            <p className="text-teal-100">Complete your profile for personalised recommendations</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={e => setUser(u => ({ ...u, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <select
              value={user.gender}
              onChange={e => setUser(u => ({ ...u, gender: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={user.age}
              onChange={e => setUser(u => ({ ...u, age: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={user.height}
              onChange={e => setUser(u => ({ ...u, height: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={user.weight}
              onChange={e => setUser(u => ({ ...u, weight: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <select
              value={user.goal}
              onChange={e => setUser(u => ({ ...u, goal: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Your Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>

            <button
              onClick={handleOnboardingSubmit}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition mt-6"
            >
              Start Tracking
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN APP  (authStep === 'app')
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Home ──────────────────────────────────────────────────────────────────
  const renderHome = () => {
    const caloriePercentage = Math.min((dailyData.consumedCalories / dailyData.targetCalories) * 100, 100);
    const waterPercentage   = Math.min((dailyData.waterIntake / dailyData.waterTarget) * 100, 100);
    const remaining         = Math.max(dailyData.targetCalories - dailyData.consumedCalories, 0);
    const burned            = dailyData.burnedCalories || 0;
    const net               = Math.round(dailyData.consumedCalories - burned);
    const CIRCUMFERENCE     = 2 * Math.PI * 52;
    const today             = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    const hour              = new Date().getHours();
    const greeting          = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    const greetingEmoji     = hour < 12 ? '🌤️' : hour < 17 ? '☀️' : '🌙';
    const tips = [
      'Eating slowly helps your brain register fullness — try putting your fork down between bites.',
      'Drinking water before meals can reduce calorie intake significantly.',
      'Protein keeps you full longer. Ensure every meal has a good protein source.',
      'Colorful plates mean more nutrients. Aim for 3 different colored foods per meal.',
      'Short walks after meals improve blood sugar and digestion.',
    ];

    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: '#F0F4F8' }}>

        {/* ── HEADER ── */}
        <div className="relative px-5 pt-10 pb-24 overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #0D9488 0%, #0F766E 50%, #134E4A 100%)' }}>
          {/* decorative blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute top-16 -right-4 w-28 h-28 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{greetingEmoji}</span>
                <p className="text-teal-200 text-xs font-semibold uppercase tracking-widest">{today}</p>
              </div>
              <h1 className="text-2xl font-extrabold text-white leading-tight">{greeting},</h1>
              <h2 className="text-3xl font-black text-white leading-tight">{user.name || 'Friend'}</h2>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-teal-100 text-xs font-medium">
                  {caloriePercentage < 50 ? 'Great start today!' : caloriePercentage < 90 ? 'Almost at your goal!' : 'Goal achieved! 🎉'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 relative z-10" style={{ marginTop: '-72px' }}>

          {/* ── HERO CALORIE CARD ── */}
          <div className="rounded-3xl mb-4 overflow-hidden"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(13,148,136,0.13)' }}>

            {/* Top bar with goal setter */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3"
              style={{ borderBottom: '1px solid #F1F5F9' }}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Calorie Summary</p>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                style={{ background: '#F0FDF9', border: '1.5px solid #99F6E4' }}>
                <span className="text-sm">🎯</span>
                <span className="text-xs font-semibold" style={{ color: '#5EEAD4' }}>Set Goal</span>
                <div style={{ width: '1px', height: '14px', background: '#99F6E4' }} />
                <input
                  type="number"
                  value={dailyData.targetCalories === 0 ? '' : dailyData.targetCalories}
                  onChange={e => {
                    const raw = e.target.value;
                    if (raw === '' || raw === '-') {
                      setDailyData(prev => ({ ...prev, targetCalories: 0 }));
                    } else {
                      const parsed = parseInt(raw, 10);
                      if (!isNaN(parsed) && parsed > 0) setDailyData(prev => ({ ...prev, targetCalories: parsed }));
                    }
                  }}
                  onBlur={e => {
                    const val = parseInt(e.target.value, 10);
                    if (!val || val <= 0) setDailyData(prev => ({ ...prev, targetCalories: 2000 }));
                  }}
                  min={1}
                  className="w-14 text-xs font-bold text-center bg-transparent focus:outline-none"
                  style={{ color: '#0D9488' }}
                  placeholder="2000"
                />
                <span className="text-xs font-semibold" style={{ color: '#5EEAD4' }}>kcal</span>
              </div>
            </div>

            {/* Ring + stats */}
            <div className="flex items-center gap-4 px-5 py-5">
              {/* Donut ring */}
              <div className="relative shrink-0" style={{ width: 120, height: 120 }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke={caloriePercentage >= 100 ? '#EF4444' : 'url(#ringGrad)'}
                    strokeWidth="10"
                    strokeDasharray={`${(caloriePercentage / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)' }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2DD4BF" />
                      <stop offset="100%" stopColor="#0D9488" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-black leading-none" style={{ color: caloriePercentage >= 100 ? '#EF4444' : '#0D9488' }}>
                    {Math.round(caloriePercentage)}%
                  </p>
                  <p className="text-xs text-gray-400 font-medium">of goal</p>
                </div>
              </div>

              {/* Stats column */}
              <div className="flex-1 space-y-2.5">
                {[
                  { label: 'Consumed',  val: Math.round(dailyData.consumedCalories), color: '#0D9488', bg: '#F0FDF9', icon: '🍽️' },
                  { label: 'Remaining', val: remaining,                               color: remaining === 0 ? '#EF4444' : '#F97316', bg: remaining === 0 ? '#FEF2F2' : '#FFF7ED', icon: '⚡' },
                  { label: 'Goal',      val: dailyData.targetCalories,               color: '#6366F1', bg: '#EEF2FF', icon: '🎯' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between px-3 py-2 rounded-xl"
                    style={{ background: s.bg }}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{s.icon}</span>
                      <p className="text-xs font-semibold text-gray-500">{s.label}</p>
                    </div>
                    <p className="text-sm font-extrabold" style={{ color: s.color }}>{s.val} <span className="text-xs font-medium text-gray-400">kcal</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="px-5 pb-1">
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${caloriePercentage}%`,
                    background: caloriePercentage >= 100
                      ? 'linear-gradient(90deg,#F97316,#EF4444)'
                      : 'linear-gradient(90deg,#2DD4BF,#0D9488)'
                  }} />
              </div>
            </div>

            {/* Macro strip */}
            <div className="grid grid-cols-4 mt-3" style={{ borderTop: '1px solid #F8FAFC' }}>
              {[
                { label: 'Protein', val: Math.round(dailyData.protein), color: '#0D9488', bg: '#F0FDF9', bar: '#0D9488' },
                { label: 'Carbs',   val: Math.round(dailyData.carbs),   color: '#F97316', bg: '#FFF7ED', bar: '#F97316' },
                { label: 'Fat',     val: Math.round(dailyData.fat),     color: '#EF4444', bg: '#FEF2F2', bar: '#EF4444' },
                { label: 'Fiber',   val: Math.round(dailyData.fiber),   color: '#6366F1', bg: '#EEF2FF', bar: '#6366F1' },
              ].map((m, i) => (
                <div key={m.label}
                  className={`flex flex-col items-center py-3 ${i < 3 ? 'border-r' : ''}`}
                  style={{ background: m.bg, borderColor: '#F1F5F9' }}>
                  <p className="text-base font-black" style={{ color: m.color }}>{m.val}<span className="text-xs font-semibold">g</span></p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── NUTRITION BREAKDOWN (bar chart style) ── */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Macros</p>
            <p className="text-lg font-extrabold text-gray-800 mb-4">Nutrition Breakdown</p>
            {[
              { label: 'Protein', val: Math.round(dailyData.protein), max: 150, color: '#0D9488', bg: '#F0FDF9', unit: 'g' },
              { label: 'Carbs',   val: Math.round(dailyData.carbs),   max: 300, color: '#F97316', bg: '#FFF7ED', unit: 'g' },
              { label: 'Fat',     val: Math.round(dailyData.fat),     max: 80,  color: '#EF4444', bg: '#FEF2F2', unit: 'g' },
              { label: 'Fiber',   val: Math.round(dailyData.fiber),   max: 38,  color: '#6366F1', bg: '#EEF2FF', unit: 'g' },
            ].map(m => (
              <div key={m.label} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-semibold text-gray-600">{m.label}</p>
                  <p className="text-xs font-bold" style={{ color: m.color }}>{m.val}{m.unit} <span className="text-gray-300 font-normal">/ {m.max}{m.unit}</span></p>
                </div>
                <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: m.bg }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((m.val / m.max) * 100, 100)}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── WATER INTAKE ── */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Hydration</p>
                <p className="text-lg font-extrabold text-gray-800">Water Intake</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black" style={{ color: '#3B82F6' }}>{dailyData.waterIntake}<span className="text-sm font-semibold text-gray-400">ml</span></p>
                <p className="text-xs text-gray-400">of {dailyData.waterTarget}ml</p>
              </div>
            </div>

            {/* Animated wave-style bar */}
            <div className="relative w-full h-5 rounded-full overflow-hidden mb-3" style={{ background: '#EFF6FF' }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${waterPercentage}%`, background: 'linear-gradient(90deg,#93C5FD,#3B82F6)' }} />
              <p className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                style={{ color: waterPercentage > 50 ? 'white' : '#3B82F6' }}>
                {Math.round(waterPercentage)}%
              </p>
            </div>

            {/* Glass indicators */}
            <div className="flex gap-1.5 mb-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-1 rounded-lg transition-all duration-300 flex items-end justify-center pb-0.5"
                  style={{
                    height: 28,
                    background: i < Math.floor(dailyData.waterIntake / (dailyData.waterTarget / 8))
                      ? 'linear-gradient(180deg,#60A5FA,#3B82F6)'
                      : '#EFF6FF',
                    border: '1px solid #BFDBFE'
                  }}>
                  {i < Math.floor(dailyData.waterIntake / (dailyData.waterTarget / 8)) && (
                    <span style={{ fontSize: 8, color: 'white', fontWeight: 700 }}>💧</span>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[150, 250, 500].map(ml => (
                <button key={ml}
                  onClick={() => setDailyData(prev => ({ ...prev, waterIntake: Math.min(prev.waterIntake + ml, prev.waterTarget) }))}
                  className="py-2.5 rounded-xl text-sm font-bold transition active:scale-95 flex items-center justify-center gap-1"
                  style={{ background: '#EFF6FF', color: '#3B82F6', border: '1.5px solid #BFDBFE' }}>
                  💧 +{ml}ml
                </button>
              ))}
            </div>
          </div>

          {/* ── RECENT FOODS ── */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Today's Log</p>
                <p className="text-lg font-extrabold text-gray-800">Recent Foods</p>
              </div>
              <button onClick={() => setCurrentTab('log-food')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold active:scale-95 transition"
                style={{ background: '#F0FDF9', color: '#0D9488', border: '1.5px solid #99F6E4' }}>
                <Plus size={13} /> Add Food
              </button>
            </div>

            {foodItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3" style={{ background: '#F0FDF9' }}>🍽️</div>
                <p className="text-sm font-bold text-gray-500">Nothing logged yet</p>
                <p className="text-xs text-gray-400 mt-1">Start by adding your first meal</p>
                <button onClick={() => setCurrentTab('log-food')}
                  className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#0D9488,#0F766E)' }}>
                  Log First Meal
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {[...foodItems].reverse().slice(0, 4).map((food, idx) => {
                  const icons = ['🍛','🥗','🍱','🥘','🍲','🥙','🫓','🥚'];
                  return (
                    <div key={food.id}
                      className="flex items-center gap-3 p-3 rounded-2xl transition"
                      style={{ background: '#F8FAFB', border: '1px solid #F1F5F9' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: '#F0FDF9' }}>
                        {icons[idx % icons.length]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{food.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">× {food.quantity}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-xs text-gray-400">P: {Math.round(food.protein)}g</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-xs text-gray-400">C: {Math.round(food.carbs)}g</span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-extrabold" style={{ color: '#0D9488' }}>{Math.round(food.calories)}</p>
                        <p className="text-xs text-gray-400">kcal</p>
                      </div>
                    </div>
                  );
                })}
                {foodItems.length > 4 && (
                  <button onClick={() => setCurrentTab('log-food')}
                    className="w-full py-3 text-center text-sm font-bold rounded-2xl mt-1 transition active:scale-95"
                    style={{ background: '#F0FDF9', color: '#0D9488', border: '1px solid #99F6E4' }}>
                    View all {foodItems.length} items →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── DAILY TIP ── */}
          <div className="rounded-3xl p-5 mb-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 60%, #134E4A 100%)', boxShadow: '0 4px 20px rgba(13,148,136,0.25)' }}>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="absolute bottom-0 -left-4 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(255,255,255,0.15)' }}>💡</div>
                <p className="text-xs font-bold text-teal-200 uppercase tracking-widest">Daily Tip</p>
              </div>
              <p className="text-white font-semibold text-sm leading-relaxed">{tips[new Date().getDay() % 5]}</p>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // ── Log Food ──────────────────────────────────────────────────────────────
  const FOOD_CATEGORIES = ['All', 'Rice & Breads', 'Curries', 'Snacks', 'Breakfast', 'Dairy & Drinks', 'Fruits', 'Proteins', 'Sweets', 'Other'];

  const getCategoryItems = (cat) => {
    if (cat === 'All') return foodDatabase;
    const map = {
      'Rice & Breads':  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      'Curries':        [19,20,21,22,23,24,25,26,27,28,29,30,31],
      'Snacks':         [32,33,34,35,36,37,38,39,40],
      'Breakfast':      [41,42,43,44,45],
      'Dairy & Drinks': [46,47,48,49,50,51,52,53],
      'Sweets':         [54,55,56,57],
      'Fruits':         [71,72,73,74,75,76,77,78],
      'Proteins':       [84,85,86,87,88,89,90,91],
      'Other':          [58,59,60,61,62,63,64,65,66,67,68,69,70,79,80,81,82,83,92,93,94,95,96,97,98,99,100],
    };
    return foodDatabase.filter(f => (map[cat] || []).includes(f.id));
  };

  const renderLogFood = () => {
    const filteredFoods = getCategoryItems(foodCategory).filter(f =>
      f.name.toLowerCase().includes(foodSearch.toLowerCase())
    );
    const selectedFoodItem = foodDatabase.find(f => f.id === selectedFood);

    return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
        <h1 className="text-2xl font-bold">Log Food 🍎</h1>
        <p className="text-teal-50">100+ Indian &amp; global foods</p>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search roti, biryani, dal, chicken…"
              value={foodSearch}
              onChange={e => { setFoodSearch(e.target.value); setFoodCategory('All'); }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 bg-gray-50 text-sm"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {FOOD_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setFoodCategory(cat); setFoodSearch(''); setSelectedFood(null); }}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition"
                style={{
                  background: foodCategory === cat ? '#0D9488' : '#F0FDFA',
                  color:      foodCategory === cat ? '#ffffff' : '#0D9488',
                  border:     foodCategory === cat ? '1.5px solid #0D9488' : '1.5px solid #99f6e4',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Selected food card */}
          {selectedFoodItem && (
            <div className="mb-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-gray-800 text-sm leading-snug">{selectedFoodItem.name}</p>
                  <p className="text-xs text-teal-600 mt-0.5">{selectedFoodItem.calories} kcal per serving</p>
                </div>
                <button onClick={() => setSelectedFood(null)} className="text-gray-400 hover:text-gray-600 ml-2">
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: 'Protein', val: selectedFoodItem.protein, color: 'text-teal-700', bg: 'bg-teal-100' },
                  { label: 'Carbs',   val: selectedFoodItem.carbs,   color: 'text-orange-700', bg: 'bg-orange-100' },
                  { label: 'Fat',     val: selectedFoodItem.fat,     color: 'text-red-700',    bg: 'bg-red-100'    },
                  { label: 'Fiber',   val: selectedFoodItem.fiber,   color: 'text-blue-700',   bg: 'bg-blue-100'   },
                ].map(({ label, val, color, bg }) => (
                  <div key={label} className={`${bg} rounded-lg p-2 text-center`}>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className={`text-xs font-bold ${color}`}>{val}g</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Qty (1 = 1 serving)"
                  value={foodQuantity}
                  onChange={e => setFoodQuantity(e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 text-sm"
                />
                <button
                  onClick={handleAddFood}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-1.5 text-sm"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
          )}

          {/* Food list */}
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {filteredFoods.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-6">No foods found. Try a different search.</p>
            ) : (
              filteredFoods.map(food => (
                <button
                  key={food.id}
                  onClick={() => { setSelectedFood(food.id); setFoodSearch(''); setFoodQuantity(''); }}
                  className={`w-full text-left p-3 rounded-xl transition border ${
                    selectedFood === food.id
                      ? 'bg-teal-50 border-teal-400'
                      : 'bg-gray-50 border-gray-100 hover:bg-teal-50 hover:border-teal-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 text-sm">{food.name}</p>
                    <div className="text-right ml-2 shrink-0">
                      <p className="text-sm font-bold text-teal-600">{food.calories}</p>
                      <p className="text-xs text-gray-400">kcal</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">P: {food.protein}g · C: {food.carbs}g · F: {food.fat}g</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Today's logged meals */}
        {foodItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Meals</h3>
            <div className="space-y-3">
              {foodItems.map(food => (
                <div
                  key={food.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-teal-500"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{food.name} × {food.quantity}</p>
                    <p className="text-xs text-gray-500">{Math.round(food.calories)} kcal · P: {Math.round(food.protein)}g · C: {Math.round(food.carbs)}g</p>
                  </div>
                  <button onClick={() => handleRemoveFood(food.id)} className="text-red-400 hover:text-red-600 ml-2">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  // ── Progress ──────────────────────────────────────────────────────────────
  const renderProgress = () => {
    const bmi         = calculateBMI();
    const bmiCategory = getBMICategory();
    const caloriesPct = Math.min(Math.round((dailyData.consumedCalories / dailyData.targetCalories) * 100), 100);
    const waterPct    = Math.min(Math.round((dailyData.waterIntake / dailyData.waterTarget) * 100), 100);
    const proteinPct  = Math.min(Math.round((dailyData.protein / 150) * 100), 100);
    const CIRCUMFERENCE = 2 * Math.PI * 40;

    const bmiRanges = [
      { label: 'Underweight', range: '< 18.5',   color: '#3B82F6', min: 0,    max: 18.5 },
      { label: 'Healthy',     range: '18.5–24.9', color: '#10B981', min: 18.5, max: 25   },
      { label: 'Overweight',  range: '25–29.9',   color: '#F59E0B', min: 25,   max: 30   },
      { label: 'Obese',       range: '≥ 30',      color: '#EF4444', min: 30,   max: 50   },
    ];

    const stats = [
      { label: 'Calories',  val: `${Math.round(dailyData.consumedCalories)}`, unit: 'kcal', pct: caloriesPct, color: '#0D9488', bg: '#F0FDF9', icon: '🔥' },
      { label: 'Water',     val: `${dailyData.waterIntake}`,                  unit: 'ml',   pct: waterPct,    color: '#3B82F6', bg: '#EFF6FF', icon: '💧' },
      { label: 'Protein',   val: `${Math.round(dailyData.protein)}`,          unit: 'g',    pct: proteinPct,  color: '#8B5CF6', bg: '#F5F3FF', icon: '💪' },
      { label: 'Burned',    val: `${Math.round(dailyData.burnedCalories||0)}`,unit: 'kcal', pct: Math.min(Math.round(((dailyData.burnedCalories||0)/500)*100),100), color: '#F97316', bg: '#FFF7ED', icon: '⚡' },
    ];

    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: '#F0F4F8' }}>

        {/* Header */}
        <div className="relative px-5 pt-10 pb-20 overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #7C3AED 0%, #6D28D9 50%, #4C1D95 100%)' }}>
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute top-14 -right-4 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Your Journey</p>
          <h1 className="text-3xl font-black text-white">Progress</h1>
          <p className="text-purple-200 text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <div className="px-4 relative" style={{ marginTop: '-60px' }}>

          {/* ── Today's Stats Grid ── */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-3xl p-4"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                    <p className="text-xl font-black mt-0.5" style={{ color: s.color }}>
                      {s.val}<span className="text-xs font-semibold text-gray-400 ml-1">{s.unit}</span>
                    </p>
                  </div>
                  <div className="relative" style={{ width: 44, height: 44 }}>
                    <svg width="44" height="44" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="22" cy="22" r="18" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                      <circle cx="22" cy="22" r="18" fill="none"
                        stroke={s.color} strokeWidth="4"
                        strokeDasharray={`${(s.pct / 100) * (2 * Math.PI * 18)} ${2 * Math.PI * 18}`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span style={{ fontSize: 14 }}>{s.icon}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
                <p className="text-xs text-gray-400 mt-1.5 font-medium">{s.pct}% of daily goal</p>
              </div>
            ))}
          </div>

          {/* ── BMI Card ── */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Body Mass Index</p>
            <p className="text-lg font-extrabold text-gray-800 mb-4">BMI Analysis</p>

            <div className="flex items-center gap-5 mb-5">
              {/* BMI ring */}
              <div className="relative shrink-0" style={{ width: 100, height: 100 }}>
                <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="9" />
                  <circle cx="50" cy="50" r="40" fill="none"
                    stroke={bmiCategory?.color || '#0D9488'} strokeWidth="9"
                    strokeDasharray={`${Math.min(((parseFloat(bmi) || 0) / 40), 1) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl font-black" style={{ color: bmiCategory?.color || '#0D9488' }}>{bmi ?? '—'}</p>
                  <p className="text-xs text-gray-400">BMI</p>
                </div>
              </div>

              <div className="flex-1">
                {bmiCategory && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-2"
                    style={{ background: bmiCategory.color + '18' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: bmiCategory.color }} />
                    <p className="text-sm font-bold" style={{ color: bmiCategory.color }}>{bmiCategory.category}</p>
                  </div>
                )}
                <div className="space-y-1.5 mt-2">
                  {[
                    { label: 'Height', val: user.height ? `${user.height} cm` : '—' },
                    { label: 'Weight', val: user.weight ? `${user.weight} kg` : '—' },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between items-center">
                      <p className="text-xs text-gray-400 font-medium">{r.label}</p>
                      <p className="text-sm font-bold text-gray-700">{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BMI scale bar */}
            <div className="relative mb-2">
              <div className="flex rounded-xl overflow-hidden h-3">
                {bmiRanges.map(r => (
                  <div key={r.label} className="flex-1" style={{ background: r.color + '55' }} />
                ))}
              </div>
              {bmi && (
                <div className="absolute top-0 h-3 w-1 rounded-full bg-gray-800"
                  style={{ left: `${Math.min(((parseFloat(bmi) - 10) / 30) * 100, 98)}%`, transform: 'translateX(-50%)' }} />
              )}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {bmiRanges.map(r => (
                <div key={r.label} className="text-center">
                  <p className="text-xs font-bold" style={{ color: r.color }}>{r.label}</p>
                  <p className="text-xs text-gray-400">{r.range}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 20-Day Activity Heatmap ── */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">History</p>
                <p className="text-lg font-extrabold text-gray-800">20-Day Activity</p>
              </div>
              <button onClick={handleExportData}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition active:scale-95"
                style={{ background: '#F5F3FF', color: '#7C3AED', border: '1.5px solid #DDD6FE' }}>
                <Download size={13} /> Export
              </button>
            </div>

            <div className="grid grid-cols-10 gap-1.5 mb-3">
              {activityHistory.map((day, idx) => {
                const pct = Math.min((day.caloriesConsumed / (dailyData.targetCalories || 2000)) * 100, 100);
                const opacity = pct < 25 ? 0.2 : pct < 50 ? 0.45 : pct < 75 ? 0.7 : 1;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="w-full aspect-square rounded-lg flex items-center justify-center"
                      style={{ background: `rgba(13,148,136,${opacity})` }}
                      title={`${day.date.toLocaleDateString()}: ${day.caloriesConsumed} kcal`}>
                      <p className="text-white font-bold" style={{ fontSize: 9 }}>{day.date.getDate()}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 justify-end">
              <p className="text-xs text-gray-400">Less</p>
              {[0.2, 0.45, 0.7, 1].map(o => (
                <div key={o} className="w-4 h-4 rounded" style={{ background: `rgba(13,148,136,${o})` }} />
              ))}
              <p className="text-xs text-gray-400">More</p>
            </div>
          </div>

          {/* ── Weekly Macro Summary ── */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Today</p>
            <p className="text-lg font-extrabold text-gray-800 mb-4">Macro Breakdown</p>
            {[
              { label: 'Protein', val: Math.round(dailyData.protein), max: 150, color: '#0D9488' },
              { label: 'Carbs',   val: Math.round(dailyData.carbs),   max: 300, color: '#F97316' },
              { label: 'Fat',     val: Math.round(dailyData.fat),     max: 80,  color: '#EF4444' },
              { label: 'Fiber',   val: Math.round(dailyData.fiber),   max: 38,  color: '#6366F1' },
            ].map(m => (
              <div key={m.label} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-600">{m.label}</p>
                  <p className="text-xs font-bold" style={{ color: m.color }}>{m.val}g <span className="text-gray-300">/ {m.max}g</span></p>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((m.val / m.max) * 100, 100)}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  };

  // ── Exercise ──────────────────────────────────────────────────────────────
  const renderExercise = () => {
    const activeEx      = exerciseDatabase.find(e => e.id === selectedExercise);
    const burnedSoFar   = Math.round((activeEx?.caloriesPerMin ?? 0) * exerciseTimer / 60);
    const totalBurned   = exercises.reduce((sum, e) => sum + e.calories, 0);
    const totalDuration = exercises.reduce((sum, e) => sum + e.duration, 0);

    const categoryColors = {
      Cardio:    { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
      Strength:  { color: '#F97316', bg: '#FFF7ED', border: '#FED7AA' },
      Flexibility:{ color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE' },
      Sports:    { color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
      Yoga:      { color: '#10B981', bg: '#F0FDF4', border: '#A7F3D0' },
    };

    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: '#F0F4F8' }}>

        {/* Header */}
        <div className="relative px-5 pt-10 pb-20 overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #DC2626 0%, #B91C1C 50%, #7F1D1D 100%)' }}>
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute top-14 -right-4 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">Stay Active</p>
          <h1 className="text-3xl font-black text-white">Exercise</h1>
          <p className="text-red-200 text-sm mt-1">Track your workouts &amp; calories burned</p>
        </div>

        <div className="px-4 relative" style={{ marginTop: '-60px' }}>

          {/* ── Today's Summary Strip ── */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: '⚡', label: 'Burned',    val: Math.round(totalBurned),             unit: 'kcal', color: '#EF4444', bg: '#FEF2F2' },
              { icon: '⏱️', label: 'Duration',  val: Math.floor(totalDuration / 60),      unit: 'min',  color: '#F97316', bg: '#FFF7ED' },
              { icon: '🏅', label: 'Workouts',  val: exercises.length,                    unit: 'done', color: '#8B5CF6', bg: '#F5F3FF' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-3.5 text-center"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="text-lg font-black" style={{ color: s.color }}>{s.val}<span className="text-xs font-semibold text-gray-400 ml-0.5">{s.unit}</span></p>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Active Timer Card ── */}
          {selectedExercise ? (
            <div className="bg-white rounded-3xl p-6 mb-4 text-center"
              style={{ boxShadow: '0 8px 32px rgba(220,38,38,0.12)' }}>

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3"
                style={{ background: '#FEF2F2' }}>
                {activeEx?.icon}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{activeEx?.category || 'Exercise'}</p>
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">{activeEx?.name}</h2>

              {/* Big timer */}
              <div className="relative mx-auto mb-5" style={{ width: 160, height: 160 }}>
                <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="80" cy="80" r="68" fill="none" stroke="#FEF2F2" strokeWidth="10" />
                  <circle cx="80" cy="80" r="68" fill="none"
                    stroke="url(#exGrad)" strokeWidth="10"
                    strokeDasharray={`${Math.min((exerciseTimer / 3600), 1) * (2 * Math.PI * 68)} ${2 * Math.PI * 68}`}
                    strokeLinecap="round" />
                  <defs>
                    <linearGradient id="exGrad" x1="0%" y1="0%" x2="100%">
                      <stop offset="0%" stopColor="#FCA5A5" />
                      <stop offset="100%" stopColor="#DC2626" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-black text-gray-800 font-mono tracking-wider">{formatTime(exerciseTimer)}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">elapsed</p>
                </div>
              </div>

              {/* Calories burned live */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: '#DC2626' }}>{burnedSoFar}</p>
                  <p className="text-xs text-gray-400">kcal burned</p>
                </div>
                <div className="w-px" style={{ background: '#F1F5F9' }} />
                <div className="text-center">
                  <p className="text-2xl font-black text-gray-700">{activeEx?.caloriesPerMin}</p>
                  <p className="text-xs text-gray-400">kcal / min</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 mb-3">
                {!isExerciseRunning ? (
                  <button onClick={() => setIsExerciseRunning(true)}
                    className="flex-1 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#EF4444,#DC2626)', boxShadow: '0 4px 16px rgba(220,38,38,0.3)' }}>
                    <Play size={20} /> {exerciseTimer === 0 ? 'Start' : 'Resume'}
                  </button>
                ) : (
                  <button onClick={() => setIsExerciseRunning(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#F97316,#EA580C)', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }}>
                    <Pause size={20} /> Pause
                  </button>
                )}
                <button onClick={handleEndExercise}
                  className="flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition active:scale-95"
                  style={{ background: '#F1F5F9', color: '#6B7280', border: '2px solid #E5E7EB' }}>
                  <StopCircle size={20} /> Finish
                </button>
              </div>

              <button onClick={() => { setSelectedExercise(null); setIsExerciseRunning(false); setExerciseTimer(0); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition active:scale-95"
                style={{ color: '#DC2626', background: '#FEF2F2' }}>
                ← Change Exercise
              </button>
            </div>
          ) : (

            /* ── Exercise Picker ── */
            <div className="bg-white rounded-3xl p-5 mb-4"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Choose Activity</p>
              <p className="text-lg font-extrabold text-gray-800 mb-4">Select Workout</p>

              <div className="grid grid-cols-2 gap-3">
                {exerciseDatabase.map(ex => {
                  const style = categoryColors[ex.category] || { color: '#0D9488', bg: '#F0FDF9', border: '#99F6E4' };
                  return (
                    <button key={ex.id}
                      onClick={() => { setSelectedExercise(ex.id); setExerciseTimer(0); setIsExerciseRunning(false); }}
                      className="relative p-4 rounded-2xl text-left transition active:scale-95"
                      style={{ background: style.bg, border: `1.5px solid ${style.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      <div className="text-3xl mb-2">{ex.icon}</div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">{ex.name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: style.color + '20', color: style.color }}>
                          {ex.category}
                        </span>
                        <span className="text-xs font-bold" style={{ color: style.color }}>
                          {ex.caloriesPerMin} kcal/min
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Today's Workout Log ── */}
          {exercises.length > 0 && (
            <div className="bg-white rounded-3xl p-5 mb-4"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Today</p>
              <p className="text-lg font-extrabold text-gray-800 mb-4">Workout Log</p>
              <div className="space-y-2">
                {exercises.map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: '#FEE2E2' }}>
                      {exerciseDatabase.find(e => e.name === ex.name)?.icon || '💪'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{ex.name}</p>
                      <p className="text-xs text-gray-400">{formatTime(ex.duration)} · {Math.round(ex.calories)} kcal</p>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: '#DC2626' }}>
                      <p className="text-white text-xs font-black">✓</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  // ── Profile ───────────────────────────────────────────────────────────────
  const renderProfile = () => (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
        <h1 className="text-2xl font-bold">Profile 👤</h1>
        <p className="text-teal-50">Manage your information</p>
      </div>

      <div className="px-6 py-6">
        {/* Avatar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-4xl mx-auto mb-4">
            👤
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email || 'Guest User'}</p>
          {!user.isGuest && user.id && (
            <p className="text-xs text-gray-400 mt-1">ID: {user.id}</p>
          )}
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Information</h3>
          <div className="space-y-2">
            {[
              ['Gender', user.gender || '—'],
              ['Age',    user.age    ? `${user.age} years` : '—'],
              ['Height', user.height ? `${user.height} cm` : '—'],
              ['Weight', user.weight ? `${user.weight} kg` : '—'],
              ['BMI',    calculateBMI() || '—'],
              ['Goal',
                user.goal === 'lose'     ? 'Lose Weight'     :
                user.goal === 'gain'     ? 'Gain Weight'     :
                user.goal === 'maintain' ? 'Maintain Weight' : '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">{label}</span>
                <span className="font-semibold text-gray-800 capitalize text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile */}
        {!editingProfile ? (
          <button
            onClick={() => setEditingProfile(true)}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition mb-4 flex items-center justify-center gap-2"
          >
            <Settings size={18} /> Edit Profile
          </button>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 space-y-3">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Edit Your Profile</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={e => setUser(u => ({ ...u, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <select
              value={user.gender}
              onChange={e => setUser(u => ({ ...u, gender: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={user.age}
              onChange={e => setUser(u => ({ ...u, age: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={user.height}
              onChange={e => setUser(u => ({ ...u, height: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={user.weight}
              onChange={e => setUser(u => ({ ...u, weight: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <select
              value={user.goal}
              onChange={e => setUser(u => ({ ...u, goal: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Your Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditingProfile(false)}
                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings size={20} /> Settings
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Notifications', sub: 'Manage alerts'  },
              { label: 'Privacy',       sub: 'Data security'  },
              { label: 'About',         sub: 'Version 1.0.0'  },
            ].map(({ label, sub }) => (
              <button key={label} className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => setAuthStep('login')}
          className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );

  // ── Tab renderer map ──────────────────────────────────────────────────────
  const renderTab = {
    home:       renderHome,
    'log-food': renderLogFood,
    progress:   renderProgress,
    exercise:   renderExercise,
    profile:    renderProfile,
  };

  // ── Main app shell ────────────────────────────────────────────────────────
  // FIX: bottom navigation is now INSIDE the returned JSX tree, so it always
  //      renders. Previously it was placed after all the early returns, making
  //      it dead / unreachable code — the nav bar never appeared.
  return (
    <div className="relative min-h-screen">
      {/* Active tab content */}
      {(renderTab[currentTab] ?? renderHome)()}

      {/* Bottom navigation — always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 shadow-2xl z-40">
        {TAB_LIST.map(tab => (
          <button
            key={tab}
            onClick={() => { setCurrentTab(tab); setShowProfileMenu(false); }}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition"
            style={{
              color:      currentTab === tab ? '#0D9488' : '#6B7280',
              background: currentTab === tab ? '#F0FDFA' : 'transparent',
            }}
          >
            {TAB_ICONS[tab]}
            <span className="text-xs font-semibold">{TAB_LABELS[tab]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CaloryTrackerPro;
