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
  { id: 1,  name: 'Chicken Breast (100g)', calories: 165, protein: 31,  carbs: 0,  fat: 3.6, fiber: 0   },
  { id: 2,  name: 'Brown Rice (100g)',      calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8 },
  { id: 3,  name: 'Banana (medium)',        calories: 89,  protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
  { id: 4,  name: 'Broccoli (100g)',        calories: 34,  protein: 2.8, carbs: 7,  fat: 0.4, fiber: 2.4 },
  { id: 5,  name: 'Salmon (100g)',          calories: 208, protein: 20,  carbs: 0,  fat: 13,  fiber: 0   },
  { id: 6,  name: 'Egg (large)',            calories: 78,  protein: 6.3, carbs: 0.6,fat: 5.3, fiber: 0   },
  { id: 7,  name: 'Almonds (30g)',          calories: 164, protein: 6,   carbs: 6,  fat: 14,  fiber: 3.5 },
  { id: 8,  name: 'Apple (medium)',         calories: 95,  protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
  { id: 9,  name: 'Sweet Potato (100g)',    calories: 86,  protein: 1.6, carbs: 20, fat: 0.1, fiber: 3   },
  { id: 10, name: 'Greek Yogurt (100g)',    calories: 59,  protein: 10,  carbs: 3.3,fat: 0.4, fiber: 0   },
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
    const CIRCUMFERENCE     = 2 * Math.PI * 54; // ≈ 339.3

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Hey, {user.name}! 👋</h1>
            <button
              onClick={() => setShowProfileMenu(v => !v)}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
            >
              <Menu size={24} />
            </button>
          </div>
          <p className="text-teal-50">Let's crush your goals today!</p>
        </div>

        {/* Profile dropdown */}
        {showProfileMenu && (
          <div className="fixed top-16 right-6 bg-white rounded-lg shadow-2xl z-50 w-48">
            <button
              onClick={() => { setCurrentTab('profile'); setShowProfileMenu(false); }}
              className="w-full text-left px-4 py-3 hover:bg-teal-50 border-b font-semibold text-gray-700"
            >
              <User className="inline mr-2" size={18} /> Profile
            </button>
            <button
              onClick={() => setAuthStep('login')}
              className="w-full text-left px-4 py-3 hover:bg-teal-50 text-red-600 font-semibold"
            >
              <LogOut className="inline mr-2" size={18} /> Logout
            </button>
          </div>
        )}

        {/* Calorie ring */}
        <div className="px-6 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Daily Calories</h2>
              <input
                type="number"
                value={dailyData.targetCalories}
                onChange={e => setDailyData(prev => ({ ...prev, targetCalories: parseInt(e.target.value) || 2000 }))}
                className="w-24 px-3 py-1 border border-teal-300 rounded-lg text-sm"
                placeholder="Target"
              />
            </div>

            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none" stroke="#14B8A6" strokeWidth="8"
                  strokeDasharray={`${(caloriePercentage / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-gray-800">{Math.round(dailyData.consumedCalories)}</p>
                <p className="text-xs text-gray-500">/ {dailyData.targetCalories}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-teal-50 rounded-lg p-2">
                <p className="text-xs text-gray-600">Protein</p>
                <p className="text-sm font-bold text-teal-600">{Math.round(dailyData.protein)}g</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-2">
                <p className="text-xs text-gray-600">Carbs</p>
                <p className="text-sm font-bold text-orange-600">{Math.round(dailyData.carbs)}g</p>
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <p className="text-xs text-gray-600">Fat</p>
                <p className="text-sm font-bold text-red-600">{Math.round(dailyData.fat)}g</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-xs text-gray-600">Fiber</p>
                <p className="text-sm font-bold text-blue-600">{Math.round(dailyData.fiber)}g</p>
              </div>
            </div>
          </div>

          {/* Water intake */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Water Intake</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all"
                    style={{ width: `${waterPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {dailyData.waterIntake}ml / {dailyData.waterTarget}ml
                </p>
              </div>
              <button
                onClick={() =>
                  setDailyData(prev => ({
                    ...prev,
                    waterIntake: Math.min(prev.waterIntake + 250, prev.waterTarget),
                  }))
                }
                className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                + 250ml
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Log Food ──────────────────────────────────────────────────────────────
  const renderLogFood = () => (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
        <h1 className="text-2xl font-bold">Log Food 🍎</h1>
        <p className="text-teal-50">Track your daily nutrition</p>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search food…"
                value={foodSearch}
                onChange={e => setFoodSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {foodSearch && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {foodDatabase
                  .filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()))
                  .map(food => (
                    <button
                      key={food.id}
                      onClick={() => { setSelectedFood(food.id); setFoodSearch(''); }}
                      className="w-full text-left p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition border-l-4 border-teal-500"
                    >
                      <p className="font-semibold text-gray-800">{food.name}</p>
                      <p className="text-sm text-gray-600">{food.calories} cal</p>
                    </button>
                  ))}
              </div>
            )}

            {selectedFood && (
              <>
                <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500">
                  <p className="font-semibold text-gray-800">
                    {foodDatabase.find(f => f.id === selectedFood)?.name}
                  </p>
                </div>
                <input
                  type="number"
                  placeholder="Quantity (1 = full serving)"
                  value={foodQuantity}
                  onChange={e => setFoodQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
                <button
                  onClick={handleAddFood}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Add Food
                </button>
              </>
            )}
          </div>
        </div>

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
                    <p className="font-semibold text-gray-800">{food.name} × {food.quantity}</p>
                    <p className="text-sm text-gray-600">{Math.round(food.calories)} cal</p>
                  </div>
                  <button onClick={() => handleRemoveFood(food.id)} className="text-red-500 hover:text-red-700">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── Progress ──────────────────────────────────────────────────────────────
  const renderProgress = () => {
    const bmi        = calculateBMI();
    const bmiCategory = getBMICategory();

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
          <h1 className="text-2xl font-bold">Your Progress 📊</h1>
          <p className="text-teal-50">Track your journey to health</p>
        </div>

        <div className="px-6 py-6">
          {/* Today at a glance */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Calories', val: dailyData.consumedCalories, target: dailyData.targetCalories },
              { label: 'Water',    val: dailyData.waterIntake,      target: dailyData.waterTarget    },
            ].map(({ label, val, target }) => {
              const pct = Math.round((val / target) * 100);
              const col = pct >= 90 ? '#10B981' : pct >= 60 ? '#FBBF24' : '#EF4444';
              return (
                <div key={label} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-xs text-gray-600 mb-2">{label}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{pct}%</p>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: col }}
                    >
                      ✓
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BMI */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Body Metrics</h3>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-gray-800">{bmi ?? '—'}</p>
              <p className="text-gray-600 mt-2">Your BMI</p>
            </div>
            {bmiCategory && (
              <div
                className="p-4 rounded-lg text-center font-semibold"
                style={{
                  background:  bmiCategory.color + '22',
                  borderLeft:  `4px solid ${bmiCategory.color}`,
                  color:       bmiCategory.color,
                }}
              >
                {bmiCategory.category}
              </div>
            )}
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>Height: {user.height} cm</p>
              <p>Weight: {user.weight} kg</p>
            </div>
          </div>

          {/* BMI categories */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">BMI Categories</h3>
            <div className="space-y-2">
              {[
                { label: 'Underweight',    range: 'BMI < 18.5',  bg: 'bg-blue-100',   text: 'text-blue-700'   },
                { label: 'Healthy Weight', range: '18.5 – 24.9', bg: 'bg-green-100',  text: 'text-green-700'  },
                { label: 'Overweight',     range: '25 – 29.9',   bg: 'bg-yellow-100', text: 'text-yellow-700' },
                { label: 'Obese',          range: 'BMI ≥ 30',    bg: 'bg-red-100',    text: 'text-red-700'    },
              ].map(({ label, range, bg, text }) => (
                <div key={label} className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className={`text-xs ${bg} ${text} px-2 py-1 rounded font-semibold`}>{range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Last 20 days */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Last 20 Days</h3>
              <button
                onClick={handleExportData}
                className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1 text-sm"
              >
                <Download size={16} /> Export
              </button>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {activityHistory.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
                    style={{ background: getActivityColor(day.caloriesConsumed) }}
                    title={`${day.date.toLocaleDateString()}: ${day.caloriesConsumed} cal, ${day.waterIntake}ml`}
                  >
                    {day.date.getDate()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {day.date.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Exercise ──────────────────────────────────────────────────────────────
  const renderExercise = () => {
    const activeEx = exerciseDatabase.find(e => e.id === selectedExercise);

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
          <h1 className="text-2xl font-bold">Exercise 💪</h1>
          <p className="text-teal-50">Burn calories and get fit</p>
        </div>

        <div className="px-6 py-6">
          {!selectedExercise ? (
            <>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Select an Activity</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {exerciseDatabase.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => { setSelectedExercise(exercise.id); setExerciseTimer(0); setIsExerciseRunning(false); }}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-t-4 border-teal-500 text-center"
                  >
                    <p className="text-3xl mb-2">{exercise.icon}</p>
                    <p className="font-semibold text-gray-800 text-sm">{exercise.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{exercise.caloriesPerMin} cal/min</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6 text-center">
              <p className="text-4xl mb-4">{activeEx?.icon}</p>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeEx?.name}</h2>

              <div className="text-6xl font-bold text-teal-600 mb-6 font-mono">
                {formatTime(exerciseTimer)}
              </div>

              <div className="bg-teal-50 p-4 rounded-lg mb-6 border-l-4 border-teal-500">
                <p className="text-gray-600 text-sm mb-1">Estimated Calories Burned</p>
                <p className="text-2xl font-bold text-teal-600">
                  {Math.round((activeEx?.caloriesPerMin ?? 0) * exerciseTimer / 60)}
                </p>
              </div>

              <div className="flex gap-4">
                {!isExerciseRunning ? (
                  <button
                    onClick={() => setIsExerciseRunning(true)}
                    className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Play size={24} /> Start
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExerciseRunning(false)}
                    className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Pause size={24} /> Pause
                  </button>
                )}
                <button
                  onClick={handleEndExercise}
                  className="flex-1 py-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition flex items-center justify-center gap-2"
                >
                  <StopCircle size={24} /> End
                </button>
              </div>

              <button
                onClick={() => { setSelectedExercise(null); setIsExerciseRunning(false); setExerciseTimer(0); }}
                className="w-full mt-4 py-2 text-teal-600 font-semibold hover:text-teal-700"
              >
                Change Exercise
              </button>
            </div>
          )}

          {exercises.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Workouts</h3>
              <div className="space-y-3">
                {exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{ex.name}</p>
                      <p className="text-sm text-gray-600">{formatTime(ex.duration)}</p>
                    </div>
                    <p className="font-bold text-teal-600">{Math.round(ex.calories)} cal</p>
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
