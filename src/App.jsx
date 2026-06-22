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
  Lock,
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
  Google,
  Droplet,
  Flame,
  Weight,
  Heart,
  Smartphone
} from 'lucide-react';

const CaloryTrackerPro = () => {
  // Authentication States
  const [authStep, setAuthStep] = useState('login'); // login, signup, otp, onboarding, app
  const [authMethod, setAuthMethod] = useState(null); // email, google, phone, guest
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // User Profile
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    gender: '',
    age: '',
    height: '', // cm
    weight: '', // kg
    goal: '', // lose, gain, maintain
    isGuest: false
  });

  // App States
  const [currentTab, setCurrentTab] = useState('home');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Home Section Data
  const [dailyData, setDailyData] = useState({
    targetCalories: 2000,
    consumedCalories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    waterIntake: 0, // ml
    waterTarget: 3000, // ml
  });

  // Log Food States
  const [foodItems, setFoodItems] = useState([]);
  const [foodSearch, setFoodSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState('');

  // Mock Food Database (API ready)
  const foodDatabase = [
    { id: 1, name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { id: 2, name: 'Brown Rice (100g)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8 },
    { id: 3, name: 'Banana (medium)', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
    { id: 4, name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.4 },
    { id: 5, name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
    { id: 6, name: 'Egg (large)', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, fiber: 0 },
    { id: 7, name: 'Almonds (30g)', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 },
    { id: 8, name: 'Apple (medium)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
    { id: 9, name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
    { id: 10, name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.3, fat: 0.4, fiber: 0 },
  ];

  // Exercise States
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);

  // Exercise Database
  const exerciseDatabase = [
    { id: 1, name: 'Running', caloriesPerMin: 10, icon: '🏃' },
    { id: 2, name: 'Walking', caloriesPerMin: 4, icon: '🚶' },
    { id: 3, name: 'Jumping Jacks', caloriesPerMin: 8, icon: '⏫' },
    { id: 4, name: 'Push-ups', caloriesPerMin: 7, icon: '💪' },
    { id: 5, name: 'Pull-ups', caloriesPerMin: 9, icon: '🤸' },
    { id: 6, name: 'Cycling', caloriesPerMin: 8, icon: '🚴' },
    { id: 7, name: 'Swimming', caloriesPerMin: 11, icon: '🏊' },
    { id: 8, name: 'Yoga', caloriesPerMin: 3, icon: '🧘' },
    { id: 9, name: 'Boxing', caloriesPerMin: 12, icon: '🥊' },
    { id: 10, name: 'Skipping', caloriesPerMin: 10, icon: '⛹️' },
  ];

  // Activity History (for Progress)
  const [activityHistory, setActivityHistory] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      date: new Date(Date.now() - (19 - i) * 24 * 60 * 60 * 1000),
      caloriesConsumed: Math.floor(Math.random() * 2500) + 1500,
      caloriesBurned: Math.floor(Math.random() * 500),
      waterIntake: Math.floor(Math.random() * 4000) + 1000,
    }))
  );

  // Calculate BMI
  const calculateBMI = () => {
    if (!user.height || !user.weight) return null;
    const heightInMeters = user.height / 100;
    return (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = calculateBMI();
    if (!bmi) return '';
    if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' };
    if (bmi < 25) return { category: 'Healthy Weight', color: '#10B981' };
    if (bmi < 30) return { category: 'Overweight', color: '#F59E0B' };
    return { category: 'Obese', color: '#EF4444' };
  };

  // Handle Login
  const handleLogin = (method) => {
    setAuthMethod(method);
    if (method === 'guest') {
      setUser({ ...user, isGuest: true });
      setAuthStep('onboarding');
    } else if (method === 'phone') {
      setAuthStep('otp');
    } else {
      setAuthStep('signup');
    }
  };

  // Handle Signup/Email Login
  const handleEmailAuth = () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setUser({ ...user, email, id: Math.random() });
      setAuthStep('onboarding');
      setLoading(false);
    }, 1000);
  };

  // Handle OTP
  const handleOTPSubmit = () => {
    if (!phone || !otp) {
      alert('Please enter phone and OTP');
      return;
    }
    setUser({ ...user, email: phone, id: Math.random() });
    setAuthStep('onboarding');
  };

  // Handle Onboarding Submit
  const handleOnboardingSubmit = () => {
    if (!user.name || !user.gender || !user.age || !user.height || !user.weight || !user.goal) {
      alert('Please complete all fields');
      return;
    }
    setAuthStep('app');
  };

  // Add Food
  const handleAddFood = () => {
    if (!selectedFood || !foodQuantity) {
      alert('Select food and quantity');
      return;
    }
    const food = foodDatabase.find(f => f.id === selectedFood);
    const quantity = parseFloat(foodQuantity);
    
    const newFood = {
      id: Math.random(),
      name: food.name,
      quantity,
      calories: food.calories * quantity,
      protein: food.protein * quantity,
      carbs: food.carbs * quantity,
      fat: food.fat * quantity,
      fiber: food.fiber * quantity,
    };
    
    setFoodItems([...foodItems, newFood]);
    setDailyData({
      ...dailyData,
      consumedCalories: dailyData.consumedCalories + newFood.calories,
      protein: dailyData.protein + newFood.protein,
      carbs: dailyData.carbs + newFood.carbs,
      fat: dailyData.fat + newFood.fat,
      fiber: dailyData.fiber + newFood.fiber,
    });
    
    setSelectedFood(null);
    setFoodQuantity('');
    setFoodSearch('');
  };

  // Remove Food
  const handleRemoveFood = (id) => {
    const food = foodItems.find(f => f.id === id);
    setFoodItems(foodItems.filter(f => f.id !== id));
    setDailyData({
      ...dailyData,
      consumedCalories: dailyData.consumedCalories - food.calories,
      protein: dailyData.protein - food.protein,
      carbs: dailyData.carbs - food.carbs,
      fat: dailyData.fat - food.fat,
      fiber: dailyData.fiber - food.fiber,
    });
  };

  // Exercise Timer Effect
  useEffect(() => {
    let interval;
    if (isExerciseRunning && selectedExercise) {
      interval = setInterval(() => {
        setExerciseTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseRunning, selectedExercise]);

  // Handle End Exercise
  const handleEndExercise = () => {
    const exercise = exerciseDatabase.find(e => e.id === selectedExercise);
    const caloriesBurned = (exercise.caloriesPerMin * exerciseTimer) / 60;
    
    setDailyData({
      ...dailyData,
      consumedCalories: Math.max(0, dailyData.consumedCalories - caloriesBurned),
    });
    
    setExercises([...exercises, {
      id: Math.random(),
      name: exercise.name,
      duration: exerciseTimer,
      calories: caloriesBurned,
    }]);
    
    setSelectedExercise(null);
    setExerciseTimer(0);
    setIsExerciseRunning(false);
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get activity color
  const getActivityColor = (caloriesConsumed, target = 2000, waterIntake = 3000) => {
    const caloriePercentage = (caloriesConsumed / target) * 100;
    const waterPercentage = (waterIntake / 3000) * 100;
    const avgPercentage = (caloriePercentage + waterPercentage) / 2;
    
    if (avgPercentage >= 90) return '#10B981'; // Green
    if (avgPercentage >= 60) return '#FBBF24'; // Yellow
    return '#EF4444'; // Red
  };

  // Export Data
  const handleExportData = () => {
    const reportData = {
      user: user,
      currentDate: new Date().toLocaleDateString(),
      summary: {
        averageCalories: Math.round(activityHistory.reduce((a, b) => a + b.caloriesConsumed, 0) / activityHistory.length),
        totalWaterIntake: activityHistory.reduce((a, b) => a + b.waterIntake, 0),
        totalCaloriesBurned: activityHistory.reduce((a, b) => a + b.caloriesBurned, 0),
      },
      activityHistory
    };
    
    const csv = `CaloryTracker Pro - Activity Report\n\nUser: ${user.name}\nGender: ${user.gender}\nAge: ${user.age}\nHeight: ${user.height}cm\nWeight: ${user.weight}kg\nGoal: ${user.goal}\nBMI: ${calculateBMI()}\n\nSummary:\nAverage Daily Calories: ${reportData.summary.averageCalories}\nTotal Water Intake (20 days): ${reportData.summary.totalWaterIntake}ml\nTotal Calories Burned: ${reportData.summary.totalCaloriesBurned}\n\nLast 20 Days Activity:\n`;
    
    const csvWithHistory = csv + activityHistory.map(day => 
      `${day.date.toLocaleDateString()},${day.caloriesConsumed},${day.caloriesBurned},${day.waterIntake}`
    ).join('\n');
    
    const blob = new Blob([csvWithHistory], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CaloryTracker_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Login Screen
  if (authStep === 'login') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold text-white mb-2">CaloryTracker</h1>
            <p className="text-teal-50">Professional Nutrition & Fitness Tracking</p>
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

            <button
              onClick={() => handleLogin('google')}
              className="w-full py-3 border-2 border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              <Google className="inline mr-2" size={20} />
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
          </div>
        </div>
      </div>
    );
  }

  // Signup/Email Auth Screen
  if (authStep === 'signup' && authMethod === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-teal-100">Using Email & Password</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleEmailAuth}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Continue'}
            </button>

            <button
              onClick={() => setAuthStep('login')}
              className="w-full text-teal-600 font-semibold hover:text-teal-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // OTP Screen
  if (authStep === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Phone Verification</h1>
            <p className="text-teal-100">Enter your phone and OTP</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <input
              type="tel"
              placeholder="Phone Number (+91XXXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <button
              onClick={handleOTPSubmit}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setAuthStep('login')}
              className="w-full text-teal-600 font-semibold hover:text-teal-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding Screen
  if (authStep === 'onboarding') {
    return (
      <div className="min-h-screen bg-white p-6 overflow-y-auto" style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}>
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl font-bold text-white mb-2">Let's Get to Know You</h1>
            <p className="text-teal-100">Complete your profile to get personalized recommendations</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <select
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
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
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <input
              type="number"
              placeholder="Height (cm)"
              value={user.height}
              onChange={(e) => setUser({ ...user, height: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <input
              type="number"
              placeholder="Weight (kg)"
              value={user.weight}
              onChange={(e) => setUser({ ...user, weight: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />

            <select
              value={user.goal}
              onChange={(e) => setUser({ ...user, goal: e.target.value })}
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

  // Main App
  if (authStep === 'app') {
    // Home Section
    if (currentTab === 'home') {
      const caloriePercentage = (dailyData.consumedCalories / dailyData.targetCalories) * 100;
      const waterPercentage = (dailyData.waterIntake / dailyData.waterTarget) * 100;

      return (
        <div className="min-h-screen bg-gray-50 pb-24">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Hey, {user.name}! 👋</h1>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
              >
                <Menu size={24} />
              </button>
            </div>
            <p className="text-teal-50">Let's crush your goals today!</p>
          </div>

          {/* Profile Menu */}
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

          {/* Calorie Overview */}
          <div className="px-6 py-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Daily Calories</h2>
                <input
                  type="number"
                  value={dailyData.targetCalories}
                  onChange={(e) => setDailyData({ ...dailyData, targetCalories: parseInt(e.target.value) || 2000 })}
                  className="w-24 px-3 py-1 border border-teal-300 rounded-lg text-sm"
                  placeholder="Target"
                />
              </div>
              
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="8"
                    strokeDasharray={`${(caloriePercentage / 100) * 339.3} 339.3`}
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

            {/* Water Intake */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Water Intake</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all"
                      style={{ width: `${Math.min(waterPercentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{dailyData.waterIntake}ml / {dailyData.waterTarget}ml</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDailyData({ ...dailyData, waterIntake: Math.min(dailyData.waterIntake + 250, dailyData.waterTarget) })}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition"
                  >
                    + 250ml
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Log Food Section
    if (currentTab === 'log-food') {
      return (
        <div className="min-h-screen bg-gray-50 pb-24">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
            <h1 className="text-2xl font-bold">Log Food 🍎</h1>
            <p className="text-teal-50">Track your daily nutrition</p>
          </div>

          <div className="px-6 py-6">
            {/* Food Search & Add */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search food..."
                    value={foodSearch}
                    onChange={(e) => setFoodSearch(e.target.value)}
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
                          onClick={() => {
                            setSelectedFood(food.id);
                            setFoodSearch('');
                          }}
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
                      placeholder="Quantity"
                      value={foodQuantity}
                      onChange={(e) => setFoodQuantity(e.target.value)}
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

            {/* Logged Foods */}
            {foodItems.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Meals</h3>
                <div className="space-y-3">
                  {foodItems.map(food => (
                    <div key={food.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-teal-500">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{food.name} × {food.quantity}</p>
                        <p className="text-sm text-gray-600">{Math.round(food.calories)} cal</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFood(food.id)}
                        className="text-red-500 hover:text-red-700"
                      >
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
    }

    // Progress Section
    if (currentTab === 'progress') {
      const bmi = calculateBMI();
      const bmiCategory = getBMICategory();

      return (
        <div className="min-h-screen bg-gray-50 pb-24">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
            <h1 className="text-2xl font-bold">Your Progress 📊</h1>
            <p className="text-teal-50">Track your journey to health</p>
          </div>

          <div className="px-6 py-6">
            {/* Today's Status */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Calories Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-600 mb-2">Calories</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">
                    {Math.round((dailyData.consumedCalories / dailyData.targetCalories) * 100)}%
                  </p>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ background: (dailyData.consumedCalories / dailyData.targetCalories) >= 0.9 ? '#10B981' : (dailyData.consumedCalories / dailyData.targetCalories) >= 0.6 ? '#FBBF24' : '#EF4444' }}
                  >
                    ✓
                  </div>
                </div>
              </div>

              {/* Water Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-600 mb-2">Water</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">
                    {Math.round((dailyData.waterIntake / dailyData.waterTarget) * 100)}%
                  </p>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ background: (dailyData.waterIntake / dailyData.waterTarget) >= 0.9 ? '#10B981' : (dailyData.waterIntake / dailyData.waterTarget) >= 0.6 ? '#FBBF24' : '#EF4444' }}
                  >
                    ✓
                  </div>
                </div>
              </div>
            </div>

            {/* BMI Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Body Metrics</h3>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-gray-800">{bmi}</p>
                <p className="text-gray-600 mt-2">Your BMI</p>
              </div>

              {bmiCategory && (
                <div className="p-4 rounded-lg text-center" style={{ background: bmiCategory.color + '20', borderLeft: `4px solid ${bmiCategory.color}` }}>
                  <p className="font-semibold" style={{ color: bmiCategory.color }}>
                    {bmiCategory.category}
                  </p>
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600">
                <p>Height: {user.height} cm</p>
                <p>Weight: {user.weight} kg</p>
              </div>
            </div>

            {/* BMI Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">BMI Categories</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">Underweight</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">BMI &lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm text-gray-600">Healthy Weight</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">Overweight</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">25 - 29.9</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">Obese</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">BMI ≥ 30</span>
                </div>
              </div>
            </div>

            {/* Last 20 Days Activity */}
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
                      title={`${day.date.toLocaleDateString()}: ${day.caloriesConsumed} cal, ${day.waterIntake}ml water`}
                    >
                      {day.date.getDate()}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{day.date.toLocaleDateString('en-US', { month: 'short' })}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Exercise Section
    if (currentTab === 'exercise') {
      return (
        <div className="min-h-screen bg-gray-50 pb-24">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
            <h1 className="text-2xl font-bold">Exercises 💪</h1>
            <p className="text-teal-50">Burn calories and get fit</p>
          </div>

          <div className="px-6 py-6">
            {/* Exercise Selection or Timer */}
            {!selectedExercise ? (
              <>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Select an Activity</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {exerciseDatabase.map(exercise => (
                    <button
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise.id)}
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-t-4 border-teal-500"
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
                <p className="text-4xl mb-4">
                  {exerciseDatabase.find(e => e.id === selectedExercise)?.icon}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {exerciseDatabase.find(e => e.id === selectedExercise)?.name}
                </h2>

                {/* Timer */}
                <div className="text-6xl font-bold text-teal-600 mb-6 font-mono">
                  {formatTime(exerciseTimer)}
                </div>

                {/* Estimated Calories */}
                <div className="bg-teal-50 p-4 rounded-lg mb-6 border-l-4 border-teal-500">
                  <p className="text-gray-600 text-sm mb-1">Estimated Calories Burned</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {Math.round((exerciseDatabase.find(e => e.id === selectedExercise)?.caloriesPerMin || 0) * exerciseTimer / 60)}
                  </p>
                </div>

                {/* Controls */}
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
                  onClick={() => setSelectedExercise(null)}
                  className="w-full mt-4 py-2 text-teal-600 font-semibold hover:text-teal-700"
                >
                  Change Exercise
                </button>
              </div>
            )}

            {/* Completed Exercises */}
            {exercises.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Workouts</h3>
                <div className="space-y-3">
                  {exercises.map((ex, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
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
    }

    // Profile Section
    if (currentTab === 'profile') {
      return (
        <div className="min-h-screen bg-gray-50 pb-24">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
            <h1 className="text-2xl font-bold">Profile 👤</h1>
            <p className="text-teal-50">Manage your information</p>
          </div>

          <div className="px-6 py-6">
            {/* User Avatar & Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-4xl mx-auto mb-4">
                👤
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email || 'Guest User'}</p>
              {!user.isGuest && (
                <p className="text-xs text-gray-500 mt-2">ID: {user.id}</p>
              )}
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-semibold text-gray-800 capitalize">{user.gender}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Age</span>
                  <span className="font-semibold text-gray-800">{user.age} years</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Height</span>
                  <span className="font-semibold text-gray-800">{user.height} cm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold text-gray-800">{user.weight} kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">BMI</span>
                  <span className="font-semibold text-gray-800">{calculateBMI() || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {user.goal === 'lose' ? 'Lose Weight' : user.goal === 'gain' ? 'Gain Weight' : 'Maintain Weight'}
                  </span>
                </div>
              </div>
            </div>

            {/* Update Profile Button */}
            <button
              onClick={() => {
                const newName = prompt('Enter name:', user.name);
                if (newName) setUser({ ...user, name: newName });
              }}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition mb-4"
            >
              Update Profile
            </button>

            {/* Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings size={20} /> Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                  <p className="font-semibold text-gray-800">Notifications</p>
                  <p className="text-xs text-gray-500">Manage alerts</p>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                  <p className="font-semibold text-gray-800">Privacy</p>
                  <p className="text-xs text-gray-500">Data security</p>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition">
                  <p className="font-semibold text-gray-800">About</p>
                  <p className="text-xs text-gray-500">Version 1.0.0</p>
                </button>
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
    }
  }

  // Bottom Navigation
  const getTabIcon = (tab) => {
    switch(tab) {
      case 'home': return <Home size={24} />;
      case 'log-food': return <Apple size={24} />;
      case 'progress': return <TrendingUp size={24} />;
      case 'exercise': return <Zap size={24} />;
      case 'profile': return <User size={24} />;
      default: return <Home size={24} />;
    }
  };

  const getTabLabel = (tab) => {
    switch(tab) {
      case 'home': return 'Home';
      case 'log-food': return 'Log Food';
      case 'progress': return 'Progress';
      case 'exercise': return 'Exercise';
      case 'profile': return 'Profile';
      default: return 'Home';
    }
  };

  if (authStep === 'app') {
    return (
      <div className="fixed inset-0 bg-gray-50 flex flex-col">
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto">
          {currentTab === 'home' && /* Home content rendered above */}
          {currentTab === 'log-food' && /* Log Food content rendered above */}
          {currentTab === 'progress' && /* Progress content rendered above */}
          {currentTab === 'exercise' && /* Exercise content rendered above */}
          {currentTab === 'profile' && /* Profile content rendered above */}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 shadow-2xl">
          {['home', 'log-food', 'progress', 'exercise', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition ${
                currentTab === tab
                  ? 'text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{
                background: currentTab === tab ? '#F0FDFA' : 'transparent'
              }}
            >
              {getTabIcon(tab)}
              <span className="text-xs font-semibold">{getTabLabel(tab)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
};

export default CaloryTrackerPro;
