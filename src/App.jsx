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
  ChevronRight,
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
  const [onboardingStep, setOnboardingStep] = useState('basics'); // basics | body | goal

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
        setOnboardingStep('basics');
        setAuthStep('onboarding');
        setLoading(false);
      }, 1000);
    } else {
      setOnboardingStep('basics');
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

  // ── AUTH ─────────────────────────────────────────────────────────────────

  const AuthShell = ({ children }) => (
    <div style={{ minHeight:'100vh', background:'#09090B', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
      {/* Single clean gradient blob top-left */}
      <div style={{
        position:'absolute', top:'-120px', left:'-80px',
        width:'420px', height:'420px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 65%)',
        filter:'blur(48px)', pointerEvents:'none',
      }}/>
      {/* Single accent blob bottom-right */}
      <div style={{
        position:'absolute', bottom:'-80px', right:'-60px',
        width:'320px', height:'320px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)',
        filter:'blur(40px)', pointerEvents:'none',
      }}/>
      {/* Subtle grid */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize:'32px 32px',
      }}/>
      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>
        {children}
      </div>
    </div>
  );

  const Field = ({ label, children }) => (
    <div>
      <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:8 }}>{label}</p>
      {children}
    </div>
  );

  const Input = (props) => (
    <input {...props}
      style={{
        width:'100%', padding:'13px 16px', borderRadius:12,
        background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
        color:'white', fontSize:14, fontWeight:500, outline:'none',
        boxSizing:'border-box', ...props.style,
      }}
    />
  );

  const PrimaryBtn = ({ children, onClick, disabled, style }) => (
    <button onClick={onClick} disabled={disabled}
      style={{
        width:'100%', padding:'14px', borderRadius:12,
        background:'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        border:'none', color:'white', fontSize:14, fontWeight:700,
        cursor:disabled?'not-allowed':'pointer', opacity:disabled?0.5:1,
        boxShadow:'0 1px 0 rgba(255,255,255,0.1) inset, 0 8px 24px rgba(13,148,136,0.25)',
        transition:'all 0.15s', ...style,
      }}>
      {children}
    </button>
  );

  const GhostBtn = ({ children, onClick, style }) => (
    <button onClick={onClick}
      style={{
        width:'100%', padding:'13px', borderRadius:12,
        background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
        color:'rgba(255,255,255,0.65)', fontSize:14, fontWeight:600,
        cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        transition:'all 0.15s', ...style,
      }}>
      {children}
    </button>
  );

  const Card = ({ children, style }) => (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
      borderRadius:20, padding:24, backdropFilter:'blur(12px)',
      boxShadow:'0 24px 48px rgba(0,0,0,0.4)', ...style,
    }}>
      {children}
    </div>
  );

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  if (authStep === 'login') {
    return (
      <AuthShell>
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 20px 32px' }}>

          {/* Hero */}
          <div style={{ paddingTop:72, paddingBottom:48, textAlign:'center' }}>
            <div style={{
              width:64, height:64, borderRadius:18, margin:'0 auto 20px',
              background:'linear-gradient(135deg,#14B8A6,#0D9488)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:28,
              boxShadow:'0 8px 32px rgba(13,148,136,0.35)',
            }}>🎯</div>
            <h1 style={{
              fontSize:32, fontWeight:900, letterSpacing:'-0.8px', color:'white',
              margin:'0 0 8px', lineHeight:1.1,
            }}>Kinetic</h1>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', fontWeight:500, margin:0 }}>
              Nutrition &amp; Fitness Tracking
            </p>
          </div>

          {/* Auth options */}
          <Card style={{ marginBottom:16 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>

              {/* Email — primary */}
              <button onClick={() => handleLogin('email')}
                style={{
                  width:'100%', padding:'14px 16px', borderRadius:12,
                  background:'linear-gradient(135deg,#14B8A6,#0D9488)',
                  border:'none', color:'white', fontSize:14, fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center', gap:12,
                  boxShadow:'0 8px 24px rgba(13,148,136,0.25), 0 1px 0 rgba(255,255,255,0.12) inset',
                }}>
                <div style={{ width:34, height:34, borderRadius:9, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Mail size={16} color="white"/>
                </div>
                <span style={{ flex:1, textAlign:'left' }}>Continue with Email</span>
                <ChevronRight size={16} color="rgba(255,255,255,0.5)"/>
              </button>

              {/* Divider */}
              <div style={{ display:'flex', alignItems:'center', gap:12, margin:'2px 0' }}>
                <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.06)' }}/>
                <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.2)', letterSpacing:'0.05em' }}>OR</span>
                <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.06)' }}/>
              </div>

              {/* Google */}
              <GhostBtn onClick={() => handleLogin('google')}>
                <div style={{ width:34, height:34, borderRadius:9, background:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                Continue with Google
              </GhostBtn>

              {/* Phone */}
              <GhostBtn onClick={() => handleLogin('phone')}>
                <div style={{ width:34, height:34, borderRadius:9, background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Phone size={15} color="#818CF8"/>
                </div>
                Continue with Phone
              </GhostBtn>

              {/* Guest */}
              <button onClick={() => handleLogin('guest')}
                style={{ width:'100%', padding:'11px', borderRadius:12, background:'none', border:'1px dashed rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.3)', fontSize:13, fontWeight:600, cursor:'pointer', marginTop:2 }}>
                Skip — Browse as Guest
              </button>
            </div>
          </Card>

          {/* Sign up */}
          <p style={{ textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.35)', marginBottom:12 }}>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => { setIsNewUser(true); setAuthMethod('email'); setAuthStep('signup'); }}
              style={{ background:'none', border:'none', color:'#2DD4BF', fontWeight:700, fontSize:13, cursor:'pointer', padding:0 }}>
              Sign up free
            </button>
          </p>

          <p style={{ textAlign:'center', fontSize:11, color:'rgba(255,255,255,0.15)' }}>
            By continuing you agree to our Terms &amp; Privacy Policy
          </p>
        </div>
      </AuthShell>
    );
  }

  // ── EMAIL SIGN IN / SIGN UP ───────────────────────────────────────────────
  if (authStep === 'signup' && authMethod === 'email') {
    return (
      <AuthShell>
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 20px 32px' }}>

          {/* Back */}
          <button onClick={() => { setAuthStep('login'); setIsNewUser(false); }}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6, padding:'20px 0 0', alignSelf:'flex-start' }}>
            <ChevronRight size={14} style={{ transform:'rotate(180deg)' }}/> Back
          </button>

          {/* Heading */}
          <div style={{ padding:'32px 0 28px' }}>
            <h1 style={{ fontSize:28, fontWeight:900, color:'white', margin:'0 0 6px', letterSpacing:'-0.5px' }}>
              {isNewUser ? 'Create account' : 'Welcome back'}
            </h1>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', margin:0 }}>
              {isNewUser ? 'Start your fitness journey today' : 'Sign in to continue'}
            </p>
          </div>

          <Card>
            {/* Tab toggle */}
            <div style={{ display:'flex', background:'rgba(255,255,255,0.04)', borderRadius:10, padding:4, marginBottom:20, border:'1px solid rgba(255,255,255,0.06)' }}>
              {[{label:'Sign In',val:false},{label:'Sign Up',val:true}].map(t => (
                <button key={t.label} onClick={() => setIsNewUser(t.val)}
                  style={{
                    flex:1, padding:'10px', borderRadius:8, border:'none',
                    background: isNewUser === t.val ? 'linear-gradient(135deg,#14B8A6,#0D9488)' : 'none',
                    color: isNewUser === t.val ? 'white' : 'rgba(255,255,255,0.35)',
                    fontSize:13, fontWeight:700, cursor:'pointer',
                    boxShadow: isNewUser === t.val ? '0 4px 12px rgba(13,148,136,0.3)' : 'none',
                    transition:'all 0.2s',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {isNewUser && (
                <Field label="Full Name">
                  <Input type="text" placeholder="Your full name" onChange={e => setUser(u => ({...u, name: e.target.value}))} />
                </Field>
              )}
              <Field label="Email">
                <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </Field>
              <Field label="Password">
                <div style={{ position:'relative' }}>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight:44 }}/>
                  <button onClick={() => setShowPassword(v => !v)}
                    style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', padding:0 }}>
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </Field>
              {isNewUser && (
                <Field label="Confirm Password">
                  <Input type="password" placeholder="••••••••" />
                </Field>
              )}
            </div>

            <PrimaryBtn onClick={handleEmailAuth} disabled={loading} style={{ marginTop:20 }}>
              {loading ? 'Please wait…' : isNewUser ? 'Create Account' : 'Sign In'}
            </PrimaryBtn>
          </Card>
        </div>
      </AuthShell>
    );
  }

  // ── PHONE OTP ─────────────────────────────────────────────────────────────
  if (authStep === 'otp') {
    return (
      <AuthShell>
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 20px 32px' }}>
          <button onClick={() => { setAuthStep('login'); setOtpSent(false); setOtp(''); setPhone(''); }}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6, padding:'20px 0 0', alignSelf:'flex-start' }}>
            <ChevronRight size={14} style={{ transform:'rotate(180deg)' }}/> Back
          </button>

          <div style={{ padding:'32px 0 28px' }}>
            <div style={{ width:48, height:48, borderRadius:14, background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
              <Phone size={20} color="#818CF8"/>
            </div>
            <h1 style={{ fontSize:28, fontWeight:900, color:'white', margin:'0 0 6px', letterSpacing:'-0.5px' }}>
              {otpSent ? 'Enter code' : 'Phone number'}
            </h1>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', margin:0 }}>
              {otpSent ? `We sent a 6-digit code to ${phone}` : 'We'll send a verification code'}
            </p>
          </div>

          <Card>
            <Field label="Mobile Number">
              <div style={{ display:'flex', gap:8 }}>
                <Input type="tel" placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setOtpSent(false); setOtp(''); }}
                  disabled={otpSent}
                  style={{ flex:1, opacity:otpSent?0.5:1 }}
                />
                {!otpSent ? (
                  <button onClick={handleSendOTP} disabled={loading}
                    style={{ padding:'13px 16px', borderRadius:12, background:'linear-gradient(135deg,#14B8A6,#0D9488)', border:'none', color:'white', fontSize:13, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap', opacity:loading?0.6:1 }}>
                    {loading ? '…' : 'Send OTP'}
                  </button>
                ) : (
                  <button onClick={() => { setOtpSent(false); setOtp(''); }}
                    style={{ padding:'13px 16px', borderRadius:12, background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.2)', color:'#818CF8', fontSize:13, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
                    Resend
                  </button>
                )}
              </div>
            </Field>

            {otpSent && (
              <div style={{ marginTop:16 }}>
                <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:10, padding:'10px 14px', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:16 }}>✓</span>
                  <p style={{ fontSize:13, color:'rgba(16,185,129,0.9)', fontWeight:600, margin:0 }}>OTP sent to {phone}</p>
                </div>
                <Field label="6-Digit Code">
                  <Input type="text" placeholder="000000"
                    value={otp} onChange={e => setOtp(e.target.value)} maxLength={6}
                    style={{ textAlign:'center', fontSize:24, fontWeight:800, letterSpacing:'0.3em', padding:'16px' }}
                  />
                </Field>
                <PrimaryBtn onClick={handleOTPSubmit} style={{ marginTop:16 }}>
                  Verify &amp; Continue
                </PrimaryBtn>
              </div>
            )}
          </Card>
        </div>
      </AuthShell>
    );
  }

  // ── ONBOARDING ────────────────────────────────────────────────────────────
  if (authStep === 'onboarding') {
    const steps   = ['basics','body','goal'];
    const stepIdx = steps.indexOf(onboardingStep || 'basics');
    const pct     = Math.round(((stepIdx + 1) / 3) * 100);

    return (
      <AuthShell>
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 20px 32px', overflowY:'auto' }}>

          {/* Header */}
          <div style={{ paddingTop:52, paddingBottom:28 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <p style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.08em', margin:0 }}>
                Setting up your profile
              </p>
              <p style={{ fontSize:12, fontWeight:700, color:'#14B8A6', margin:0 }}>{pct}%</p>
            </div>
            {/* Progress bar */}
            <div style={{ height:3, background:'rgba(255,255,255,0.06)', borderRadius:4, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#14B8A6,#2DD4BF)', borderRadius:4, transition:'width 0.5s ease' }}/>
            </div>
            {/* Step labels */}
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              {['About You','Body Stats','Your Goal'].map((s,i) => (
                <p key={s} style={{ fontSize:11, fontWeight:600, margin:0, color: i<=stepIdx ? '#2DD4BF' : 'rgba(255,255,255,0.2)' }}>{s}</p>
              ))}
            </div>
          </div>

          <Card>
            {/* STEP 1 */}
            {(!onboardingStep || onboardingStep === 'basics') && (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ marginBottom:4 }}>
                  <h2 style={{ fontSize:22, fontWeight:900, color:'white', margin:'0 0 4px' }}>About you 👋</h2>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', margin:0 }}>Help us personalise your experience</p>
                </div>

                <Field label="Your Name">
                  <Input type="text" placeholder="What should we call you?" value={user.name} onChange={e => setUser(u => ({...u, name: e.target.value}))} />
                </Field>

                <Field label="Gender">
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                    {[{val:'male',label:'Male',emoji:'👨'},{val:'female',label:'Female',emoji:'👩'},{val:'other',label:'Other',emoji:'🧑'}].map(g => (
                      <button key={g.val} onClick={() => setUser(u => ({...u, gender:g.val}))}
                        style={{
                          padding:'12px 8px', borderRadius:10,
                          background: user.gender===g.val ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
                          border: user.gender===g.val ? '1.5px solid rgba(20,184,166,0.5)' : '1px solid rgba(255,255,255,0.07)',
                          color: user.gender===g.val ? '#2DD4BF' : 'rgba(255,255,255,0.4)',
                          fontSize:12, fontWeight:700, cursor:'pointer',
                          display:'flex', flexDirection:'column', alignItems:'center', gap:4, transition:'all 0.15s',
                        }}>
                        <span style={{ fontSize:20 }}>{g.emoji}</span>{g.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Age">
                  <Input type="number" placeholder="Your age" value={user.age} onChange={e => setUser(u => ({...u, age:e.target.value}))} />
                </Field>

                <PrimaryBtn onClick={() => setOnboardingStep('body')}>Next →</PrimaryBtn>
              </div>
            )}

            {/* STEP 2 */}
            {onboardingStep === 'body' && (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ marginBottom:4 }}>
                  <h2 style={{ fontSize:22, fontWeight:900, color:'white', margin:'0 0 4px' }}>Body stats 📏</h2>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', margin:0 }}>Used to calculate your BMI &amp; calorie targets</p>
                </div>

                <Field label="Height (cm)">
                  <div style={{ position:'relative' }}>
                    <Input type="number" placeholder="e.g. 175" value={user.height} onChange={e => setUser(u => ({...u, height:e.target.value}))} style={{ paddingRight:48 }}/>
                    <span style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.25)' }}>cm</span>
                  </div>
                </Field>

                <Field label="Weight (kg)">
                  <div style={{ position:'relative' }}>
                    <Input type="number" placeholder="e.g. 70" value={user.weight} onChange={e => setUser(u => ({...u, weight:e.target.value}))} style={{ paddingRight:48 }}/>
                    <span style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.25)' }}>kg</span>
                  </div>
                </Field>

                {/* Live BMI preview */}
                {user.height && user.weight && (() => {
                  const b = calculateBMI();
                  const cat = getBMICategory();
                  return b ? (
                    <div style={{ padding:'14px 16px', borderRadius:12, background:'rgba(20,184,166,0.08)', border:'1px solid rgba(20,184,166,0.15)' }}>
                      <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.35)', margin:'0 0 4px' }}>BMI Preview</p>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <p style={{ fontSize:28, fontWeight:900, color:'#2DD4BF', margin:0 }}>{b}</p>
                        {cat && <span style={{ padding:'3px 10px', borderRadius:6, background:`${cat.color}18`, color:cat.color, fontSize:12, fontWeight:700, border:`1px solid ${cat.color}30` }}>{cat.category}</span>}
                      </div>
                    </div>
                  ) : null;
                })()}

                <div style={{ display:'flex', gap:10, marginTop:4 }}>
                  <GhostBtn onClick={() => setOnboardingStep('basics')} style={{ flex:1 }}>← Back</GhostBtn>
                  <PrimaryBtn onClick={() => setOnboardingStep('goal')} style={{ flex:2 }}>Next →</PrimaryBtn>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {onboardingStep === 'goal' && (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ marginBottom:4 }}>
                  <h2 style={{ fontSize:22, fontWeight:900, color:'white', margin:'0 0 4px' }}>Your goal 🎯</h2>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', margin:0 }}>We&apos;ll personalise everything around this</p>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {[
                    {val:'lose',    emoji:'📉', label:'Lose Weight',    sub:'Calorie deficit · More cardio',      color:'#F87171', bg:'rgba(239,68,68,0.08)',  border:'rgba(239,68,68,0.25)'},
                    {val:'maintain',emoji:'⚖️', label:'Maintain Weight',sub:'Balanced diet · Regular activity',  color:'#818CF8', bg:'rgba(99,102,241,0.08)', border:'rgba(99,102,241,0.25)'},
                    {val:'gain',    emoji:'📈', label:'Gain Weight',    sub:'Calorie surplus · Strength training',color:'#34D399', bg:'rgba(16,185,129,0.08)', border:'rgba(16,185,129,0.25)'},
                  ].map(g => (
                    <button key={g.val} onClick={() => setUser(u => ({...u, goal:g.val}))}
                      style={{
                        width:'100%', padding:'14px 16px', borderRadius:12, cursor:'pointer',
                        background: user.goal===g.val ? g.bg : 'rgba(255,255,255,0.03)',
                        border: user.goal===g.val ? `1.5px solid ${g.border}` : '1px solid rgba(255,255,255,0.07)',
                        display:'flex', alignItems:'center', gap:14, textAlign:'left',
                        transition:'all 0.15s',
                      }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                        {g.emoji}
                      </div>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:14, fontWeight:700, color:'white', margin:'0 0 2px' }}>{g.label}</p>
                        <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', margin:0 }}>{g.sub}</p>
                      </div>
                      <div style={{
                        width:18, height:18, borderRadius:'50%', flexShrink:0,
                        background: user.goal===g.val ? g.color : 'transparent',
                        border: `2px solid ${user.goal===g.val ? g.color : 'rgba(255,255,255,0.15)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        {user.goal===g.val && <div style={{ width:6, height:6, borderRadius:'50%', background:'white' }}/>}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ display:'flex', gap:10, marginTop:4 }}>
                  <GhostBtn onClick={() => setOnboardingStep('body')} style={{ flex:1 }}>← Back</GhostBtn>
                  <PrimaryBtn onClick={handleOnboardingSubmit} disabled={!user.goal} style={{ flex:2 }}>
                    🚀 Let&apos;s Go!
                  </PrimaryBtn>
                </div>
              </div>
            )}
          </Card>
        </div>
      </AuthShell>
    );
  }

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
    const filteredFoods    = getCategoryItems(foodCategory).filter(f =>
      f.name.toLowerCase().includes(foodSearch.toLowerCase())
    );
    const selectedFoodItem = foodDatabase.find(f => f.id === selectedFood);
    const totalLogged      = foodItems.reduce((s, f) => s + f.calories, 0);
    const mealIcons        = ['🍛','🥗','🍱','🥘','🍲','🥙','🫓','🥚','🍜','🥞'];
    const catEmojis = {
      'All':'🍽️','Rice & Breads':'🍚','Curries':'🍛','Snacks':'🥨',
      'Breakfast':'🌅','Dairy & Drinks':'🥛','Fruits':'🍎',
      'Proteins':'💪','Sweets':'🍬','Other':'🥦',
    };

    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: '#F0F4F8' }}>

        {/* Header */}
        <div className="relative px-5 pt-10 pb-20 overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#059669 0%,#047857 50%,#064E3B 100%)' }}>
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute top-14 -right-4 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">Nutrition</p>
          <h1 className="text-3xl font-black text-white">Log Food</h1>
          <p className="text-emerald-200 text-sm mt-1">100+ Indian &amp; global foods</p>
        </div>

        <div className="px-4 relative" style={{ marginTop: '-60px' }}>

          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon:'🍽️', label:'Logged',   val:foodItems.length,                                                unit:'items', color:'#059669' },
              { icon:'🔥', label:'Consumed',  val:Math.round(totalLogged),                                        unit:'kcal',  color:'#0D9488' },
              { icon:'⚡', label:'Remaining', val:Math.max(0,Math.round(dailyData.targetCalories - totalLogged)), unit:'kcal',  color:'#F97316' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-3.5 text-center"
                style={{ boxShadow:'0 4px 16px rgba(0,0,0,0.07)' }}>
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="text-lg font-black" style={{ color:s.color }}>
                  {s.val}<span className="text-xs font-semibold text-gray-400 ml-0.5">{s.unit}</span>
                </p>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Search + Category + List */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Database</p>
            <p className="text-lg font-extrabold text-gray-800 mb-4">Find Food</p>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-3.5 text-gray-400" size={17} />
              <input type="text"
                placeholder="Search roti, biryani, dal, chicken…"
                value={foodSearch}
                onChange={e => { setFoodSearch(e.target.value); setFoodCategory('All'); }}
                className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm font-medium focus:outline-none"
                style={{ background:'#F8FAFB', border:'1.5px solid #E5E7EB' }}
              />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4"
              style={{ scrollbarWidth:'none', msOverflowStyle:'none' }}>
              {FOOD_CATEGORIES.map(cat => (
                <button key={cat}
                  onClick={() => { setFoodCategory(cat); setFoodSearch(''); setSelectedFood(null); }}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95"
                  style={{
                    background: foodCategory === cat ? '#059669' : '#F0FDF4',
                    color:      foodCategory === cat ? '#fff'    : '#059669',
                    border:     foodCategory === cat ? '1.5px solid #059669' : '1.5px solid #A7F3D0',
                  }}>
                  {catEmojis[cat]} {cat}
                </button>
              ))}
            </div>

            {/* Selected food detail */}
            {selectedFoodItem && (
              <div className="mb-4 rounded-2xl overflow-hidden"
                style={{ border:'1.5px solid #A7F3D0', boxShadow:'0 4px 16px rgba(5,150,105,0.1)' }}>
                <div className="px-4 py-3 flex justify-between items-start"
                  style={{ background:'linear-gradient(135deg,#ECFDF5,#D1FAE5)' }}>
                  <div>
                    <p className="font-extrabold text-gray-800 text-sm">{selectedFoodItem.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-black" style={{ color:'#059669' }}>{selectedFoodItem.calories}</span>
                      <span className="text-xs text-gray-500 font-semibold">kcal / serving</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFood(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-600"
                    style={{ background:'rgba(255,255,255,0.6)' }}>
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-4" style={{ borderTop:'1px solid #D1FAE5' }}>
                  {[
                    { label:'Protein', val:selectedFoodItem.protein, color:'#0D9488', bg:'#F0FDF9' },
                    { label:'Carbs',   val:selectedFoodItem.carbs,   color:'#F97316', bg:'#FFF7ED' },
                    { label:'Fat',     val:selectedFoodItem.fat,     color:'#EF4444', bg:'#FEF2F2' },
                    { label:'Fiber',   val:selectedFoodItem.fiber,   color:'#6366F1', bg:'#EEF2FF' },
                  ].map((m,i) => (
                    <div key={m.label}
                      className={`flex flex-col items-center py-2.5 ${i < 3 ? 'border-r' : ''}`}
                      style={{ background:m.bg, borderColor:'#E5E7EB' }}>
                      <p className="text-sm font-black" style={{ color:m.color }}>{m.val}<span className="text-xs">g</span></p>
                      <p className="text-xs text-gray-400 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 p-3" style={{ background:'#FAFFFE' }}>
                  <input type="number"
                    placeholder="Qty (1 = 1 serving)"
                    value={foodQuantity}
                    onChange={e => setFoodQuantity(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none"
                    style={{ background:'#F0FDF4', border:'1.5px solid #A7F3D0', color:'#064E3B' }}
                  />
                  <button onClick={handleAddFood}
                    className="px-5 py-2.5 rounded-xl font-bold text-white flex items-center gap-1.5 text-sm active:scale-95"
                    style={{ background:'linear-gradient(135deg,#059669,#047857)', boxShadow:'0 4px 12px rgba(5,150,105,0.3)' }}>
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            )}

            {/* Food list */}
            <div className="space-y-2 overflow-y-auto" style={{ maxHeight:280 }}>
              {filteredFoods.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-sm font-semibold text-gray-500">No foods found</p>
                  <p className="text-xs text-gray-400 mt-1">Try a different search or category</p>
                </div>
              ) : filteredFoods.map(food => (
                <button key={food.id}
                  onClick={() => { setSelectedFood(food.id); setFoodSearch(''); setFoodQuantity(''); }}
                  className="w-full text-left p-3 rounded-2xl transition"
                  style={{
                    background: selectedFood === food.id ? '#ECFDF5' : '#F8FAFB',
                    border:     selectedFood === food.id ? '1.5px solid #6EE7B7' : '1.5px solid #F1F5F9',
                  }}>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800 text-sm flex-1 pr-2">{food.name}</p>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-extrabold" style={{ color:'#059669' }}>{food.calories}</p>
                      <p className="text-xs text-gray-400">kcal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {[{l:'P',v:food.protein,c:'#0D9488'},{l:'C',v:food.carbs,c:'#F97316'},{l:'F',v:food.fat,c:'#EF4444'}].map(m => (
                      <span key={m.l} className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                        style={{ background:m.c+'18', color:m.c }}>
                        {m.l}: {m.v}g
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Meal Log */}
          {foodItems.length > 0 && (
            <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Today</p>
                  <p className="text-lg font-extrabold text-gray-800">Meal Log</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black" style={{ color:'#059669' }}>{Math.round(totalLogged)}</p>
                  <p className="text-xs text-gray-400">total kcal</p>
                </div>
              </div>
              <div className="space-y-2">
                {foodItems.map((food, idx) => (
                  <div key={food.id} className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background:'#F8FAFB', border:'1px solid #F1F5F9' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background:'#ECFDF5' }}>
                      {mealIcons[idx % mealIcons.length]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{food.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-xs text-gray-400">×{food.quantity}</span>
                        {[{l:'P',v:food.protein,c:'#0D9488'},{l:'C',v:food.carbs,c:'#F97316'},{l:'F',v:food.fat,c:'#EF4444'}].map(m => (
                          <span key={m.l} className="text-xs font-semibold" style={{ color:m.c }}>{m.l}:{Math.round(m.v)}g</span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-extrabold" style={{ color:'#059669' }}>{Math.round(food.calories)}</p>
                        <p className="text-xs text-gray-400">kcal</p>
                      </div>
                      <button onClick={() => handleRemoveFood(food.id)}
                        className="w-7 h-7 rounded-xl flex items-center justify-center"
                        style={{ background:'#FEF2F2', color:'#EF4444' }}>
                        <X size={14} />
                      </button>
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
  const renderProfile = () => {
    const bmi         = calculateBMI();
    const bmiCategory = getBMICategory();
    const goalLabel   = user.goal === 'lose' ? 'Lose Weight' : user.goal === 'gain' ? 'Gain Weight' : user.goal === 'maintain' ? 'Maintain Weight' : '—';
    const goalEmoji   = user.goal === 'lose' ? '📉' : user.goal === 'gain' ? '📈' : user.goal === 'maintain' ? '⚖️' : '🎯';
    const initials    = (user.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);

    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: '#F0F4F8' }}>

        {/* Header with avatar */}
        <div className="relative px-5 pt-10 pb-24 overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0F172A 0%,#1E293B 50%,#0F172A 100%)' }}>
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full" style={{ background: 'rgba(99,102,241,0.12)' }} />
          <div className="absolute top-16 -right-4 w-28 h-28 rounded-full" style={{ background: 'rgba(99,102,241,0.07)' }} />
          <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full" style={{ background: 'rgba(99,102,241,0.06)' }} />

          <div className="relative z-10 flex items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white shrink-0"
              style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-0.5">Your Profile</p>
              <h1 className="text-2xl font-black text-white truncate">{user.name || 'Guest User'}</h1>
              <p className="text-slate-400 text-sm truncate">{user.email || 'No email'}</p>
              {bmi && bmiCategory && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg"
                  style={{ background: bmiCategory.color + '22', border: `1px solid ${bmiCategory.color}44` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: bmiCategory.color }} />
                  <p className="text-xs font-bold" style={{ color: bmiCategory.color }}>BMI {bmi} · {bmiCategory.category}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 relative" style={{ marginTop: '-52px' }}>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label:'Age',    val: user.age    ? `${user.age}y`    : '—', icon:'🎂', color:'#6366F1' },
              { label:'Height', val: user.height ? `${user.height}cm`: '—', icon:'📏', color:'#0D9488' },
              { label:'Weight', val: user.weight ? `${user.weight}kg`: '—', icon:'⚖️', color:'#F97316' },
              { label:'BMI',    val: bmi || '—',                             icon:'❤️', color: bmiCategory?.color || '#EF4444' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-3 text-center"
                style={{ boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
                <div className="text-lg mb-1">{s.icon}</div>
                <p className="text-sm font-black" style={{ color:s.color }}>{s.val}</p>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Goal card */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Fitness</p>
            <p className="text-lg font-extrabold text-gray-800 mb-3">Your Goal</p>
            <div className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background:'linear-gradient(135deg,#EEF2FF,#E0E7FF)', border:'1.5px solid #C7D2FE' }}>
              <span className="text-3xl">{goalEmoji}</span>
              <div>
                <p className="font-black text-indigo-800 text-base">{goalLabel}</p>
                <p className="text-xs text-indigo-500 mt-0.5">
                  {user.goal === 'lose' ? 'Caloric deficit · More cardio'
                    : user.goal === 'gain' ? 'Caloric surplus · Strength training'
                    : user.goal === 'maintain' ? 'Balanced diet · Regular activity'
                    : 'Set a goal to get personalised tips'}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          {!editingProfile ? (
            <button onClick={() => setEditingProfile(true)}
              className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 mb-4 transition active:scale-95"
              style={{ background:'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow:'0 4px 16px rgba(99,102,241,0.3)' }}>
              <Settings size={18} /> Edit Profile
            </button>
          ) : (
            <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Edit</p>
              <p className="text-lg font-extrabold text-gray-800 mb-4">Your Information</p>
              <div className="space-y-3">
                {[
                  { label:'Full Name',    key:'name',   type:'text',   placeholder:'Your full name'    },
                  { label:'Age',          key:'age',    type:'number', placeholder:'Your age'          },
                  { label:'Height (cm)',  key:'height', type:'number', placeholder:'Height in cm'      },
                  { label:'Weight (kg)',  key:'weight', type:'number', placeholder:'Weight in kg'      },
                ].map(f => (
                  <div key={f.key}>
                    <p className="text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">{f.label}</p>
                    <input type={f.type} placeholder={f.placeholder}
                      value={user[f.key] || ''}
                      onChange={e => setUser(u => ({ ...u, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none"
                      style={{ background:'#F8FAFB', border:'1.5px solid #E5E7EB' }}
                    />
                  </div>
                ))}
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Gender</p>
                  <select value={user.gender || ''}
                    onChange={e => setUser(u => ({ ...u, gender: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none"
                    style={{ background:'#F8FAFB', border:'1.5px solid #E5E7EB' }}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Fitness Goal</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val:'lose',     label:'Lose Weight', emoji:'📉', color:'#EF4444', bg:'#FEF2F2', border:'#FECACA' },
                      { val:'maintain', label:'Maintain',    emoji:'⚖️', color:'#6366F1', bg:'#EEF2FF', border:'#C7D2FE' },
                      { val:'gain',     label:'Gain Weight', emoji:'📈', color:'#059669', bg:'#ECFDF5', border:'#A7F3D0' },
                    ].map(g => (
                      <button key={g.val}
                        onClick={() => setUser(u => ({ ...u, goal: g.val }))}
                        className="py-3 rounded-2xl text-xs font-bold transition active:scale-95"
                        style={{
                          background: user.goal === g.val ? g.bg    : '#F8FAFB',
                          border:     user.goal === g.val ? `2px solid ${g.color}` : '2px solid #E5E7EB',
                          color:      user.goal === g.val ? g.color  : '#9CA3AF',
                        }}>
                        <div className="text-lg mb-1">{g.emoji}</div>
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditingProfile(false)}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-white transition active:scale-95"
                  style={{ background:'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow:'0 4px 12px rgba(99,102,241,0.3)' }}>
                  Save Changes
                </button>
                <button onClick={() => setEditingProfile(false)}
                  className="flex-1 py-3.5 rounded-2xl font-bold transition active:scale-95"
                  style={{ background:'#F1F5F9', color:'#6B7280', border:'2px solid #E5E7EB' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="bg-white rounded-3xl p-5 mb-4" style={{ boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">App</p>
            <p className="text-lg font-extrabold text-gray-800 mb-3">Settings</p>
            <div className="space-y-1">
              {[
                { icon:'🔔', label:'Notifications',  sub:'Meal reminders & alerts',    color:'#F97316' },
                { icon:'🔒', label:'Privacy',         sub:'Data & security settings',   color:'#6366F1' },
                { icon:'ℹ️', label:'About Kinetic',   sub:'Version 1.0.0',              color:'#0D9488' },
              ].map(s => (
                <button key={s.label}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition active:scale-98"
                  style={{ background:'#F8FAFB' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background:s.color+'18' }}>
                    {s.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-gray-800">{s.label}</p>
                    <p className="text-xs text-gray-400">{s.sub}</p>
                  </div>
                  <ChevronRight size={16} color="#D1D5DB" />
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button onClick={() => setAuthStep('login')}
            className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mb-4 transition active:scale-95"
            style={{ background:'#FEF2F2', color:'#EF4444', border:'2px solid #FECACA' }}>
            <LogOut size={18} /> Sign Out
          </button>

        </div>
      </div>
    );
  };

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
        {TAB_LIST.map(tab => {
          const tabIcon = {
            home:      <Home size={22} />,
            'log-food':<Apple size={22} />,
            progress:  <TrendingUp size={22} />,
            exercise:  <Zap size={22} />,
            profile:   <User size={22} />,
          }[tab];
          return (
            <button
              key={tab}
              onClick={() => { setCurrentTab(tab); setShowProfileMenu(false); }}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition"
              style={{
                color:      currentTab === tab ? '#0D9488' : '#6B7280',
                background: currentTab === tab ? '#F0FDFA' : 'transparent',
              }}
            >
              {tabIcon}
              <span className="text-xs font-semibold">{TAB_LABELS[tab]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CaloryTrackerPro;
