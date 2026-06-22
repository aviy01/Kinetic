import React, { useState, useEffect } from 'react';
import { Home, Apple, TrendingUp, Zap, User, Mail, Eye, EyeOff, Phone, Menu, LogOut, Settings, Download, Play, Pause, StopCircle, Search, Plus, X, Google } from 'lucide-react';

const CaloryTrackerPro = () => {
  const [authStep, setAuthStep] = useState('login');
  const [authMethod, setAuthMethod] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    id: null, name: '', email: '', gender: '', age: '', height: '', weight: '', goal: '', isGuest: false
  });

  const [currentTab, setCurrentTab] = useState('home');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [dailyData, setDailyData] = useState({
    targetCalories: 2000, consumedCalories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, waterIntake: 0, waterTarget: 3000,
  });

  const [foodItems, setFoodItems] = useState([]);
  const [foodSearch, setFoodSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState('');

  const foodDatabase = [
    { id: 1, name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { id: 2, name: 'Brown Rice (100g)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8 },
    { id: 3, name: 'Banana (medium)', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
    { id: 4, name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.4 },
    { id: 5, name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  ];

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);

  const exerciseDatabase = [
    { id: 1, name: 'Running', caloriesPerMin: 10, icon: '🏃' },
    { id: 2, name: 'Walking', caloriesPerMin: 4, icon: '🚶' },
    { id: 3, name: 'Cycling', caloriesPerMin: 8, icon: '🚴' },
    { id: 4, name: 'Swimming', caloriesPerMin: 11, icon: '🏊' },
    { id: 5, name: 'Yoga', caloriesPerMin: 3, icon: '🧘' },
  ];

  const [activityHistory] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      date: new Date(Date.now() - (19 - i) * 24 * 60 * 60 * 1000),
      caloriesConsumed: Math.floor(Math.random() * 2500) + 1500,
      waterIntake: Math.floor(Math.random() * 4000) + 1000,
    }))
  );

  const calculateBMI = () => {
    if (!user.height || !user.weight) return null;
    return (user.weight / ((user.height / 100) ** 2)).toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = calculateBMI();
    if (!bmi) return null;
    if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' };
    if (bmi < 25) return { category: 'Healthy Weight', color: '#10B981' };
    if (bmi < 30) return { category: 'Overweight', color: '#F59E0B' };
    return { category: 'Obese', color: '#EF4444' };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getActivityColor = (cal) => {
    const pct = (cal / dailyData.targetCalories) * 100;
    return pct >= 90 ? '#10B981' : pct >= 60 ? '#FBBF24' : '#EF4444';
  };

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

  const handleEmailAuth = () => {
    if (!email || !password) { alert('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      setUser({ ...user, email, id: Math.random() });
      setAuthStep('onboarding');
      setLoading(false);
    }, 1000);
  };

  const handleOTPSubmit = () => {
    if (!phone || !otp) { alert('Please enter phone and OTP'); return; }
    setUser({ ...user, email: phone, id: Math.random() });
    setAuthStep('onboarding');
  };

  const handleOnboardingSubmit = () => {
    if (!user.name || !user.gender || !user.age || !user.height || !user.weight || !user.goal) {
      alert('Please complete all fields');
      return;
    }
    setAuthStep('app');
  };

  const handleAddFood = () => {
    if (!selectedFood || !foodQuantity) { alert('Select food and quantity'); return; }
    const food = foodDatabase.find(f => f.id === selectedFood);
    const quantity = parseFloat(foodQuantity);
    
    const newFood = {
      id: Math.random(), name: food.name, quantity,
      calories: food.calories * quantity, protein: food.protein * quantity,
      carbs: food.carbs * quantity, fat: food.fat * quantity, fiber: food.fiber * quantity,
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

  useEffect(() => {
    let interval;
    if (isExerciseRunning && selectedExercise) {
      interval = setInterval(() => {
        setExerciseTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseRunning, selectedExercise]);

  const handleEndExercise = () => {
    const exercise = exerciseDatabase.find(e => e.id === selectedExercise);
    const caloriesBurned = (exercise.caloriesPerMin * exerciseTimer) / 60;
    
    setExercises([...exercises, {
      id: Math.random(), name: exercise.name, duration: exerciseTimer, calories: caloriesBurned,
    }]);
    
    setSelectedExercise(null);
    setExerciseTimer(0);
    setIsExerciseRunning(false);
  };

  const handleExportData = () => {
    const csv = `CaloryTracker Pro Report\nUser: ${user.name}\nBMI: ${calculateBMI()}\n\nActivity History:\n` + activityHistory.map(day => 
      `${day.date.toLocaleDateString()},${day.caloriesConsumed}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // LOGIN
  if (authStep === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold text-white mb-2">CaloryTracker</h1>
            <p className="text-teal-50">Nutrition & Fitness Tracking</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Get Started</h2>
            <button onClick={() => handleLogin('email')} className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"><Mail className="inline mr-2" size={20} /> Email</button>
            <button onClick={() => handleLogin('google')} className="w-full py-3 border-2 border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition"><Google className="inline mr-2" size={20} /> Google</button>
            <button onClick={() => handleLogin('phone')} className="w-full py-3 bg-white border-2 border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition"><Phone className="inline mr-2" size={20} /> Phone</button>
            <button onClick={() => handleLogin('guest')} className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">Guest</button>
          </div>
        </div>
      </div>
    );
  }

  // SIGNUP
  if (authStep === 'signup' && authMethod === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            <button onClick={handleEmailAuth} disabled={loading} className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold">{loading ? 'Signing In...' : 'Continue'}</button>
            <button onClick={() => setAuthStep('login')} className="w-full text-teal-600 font-semibold">Back</button>
          </div>
        </div>
      </div>
    );
  }

  // OTP
  if (authStep === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Phone Verification</h1>
            <input type="tel" placeholder="Phone (+91...)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <button onClick={handleOTPSubmit} className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold">Verify</button>
            <button onClick={() => setAuthStep('login')} className="w-full text-teal-600 font-semibold">Back</button>
          </div>
        </div>
      </div>
    );
  }

  // ONBOARDING
  if (authStep === 'onboarding') {
    return (
      <div className="min-h-screen bg-white p-6 overflow-y-auto" style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}>
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
            <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <select value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="number" placeholder="Age" value={user.age} onChange={(e) => setUser({ ...user, age: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <input type="number" placeholder="Height (cm)" value={user.height} onChange={(e) => setUser({ ...user, height: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <input type="number" placeholder="Weight (kg)" value={user.weight} onChange={(e) => setUser({ ...user, weight: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            <select value={user.goal} onChange={(e) => setUser({ ...user, goal: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="maintain">Maintain</option>
            </select>
            <button onClick={handleOnboardingSubmit} className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold mt-6">Start</button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  if (authStep === 'app') {
    const renderContent = () => {
      if (currentTab === 'home') {
        const caloriePercentage = (dailyData.consumedCalories / dailyData.targetCalories) * 100;
        const waterPercentage = (dailyData.waterIntake / dailyData.waterTarget) * 100;

        return (
          <div className="min-h-screen bg-gray-50 pb-24">
            <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Hey {user.name}! 👋</h1>
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="p-2 bg-white bg-opacity-20 rounded-full"><Menu size={24} /></button>
              </div>
            </div>

            {showProfileMenu && (
              <div className="fixed top-16 right-6 bg-white rounded-lg shadow-2xl z-50 w-48">
                <button onClick={() => { setCurrentTab('profile'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-teal-50 border-b font-semibold"><User className="inline mr-2" size={18} /> Profile</button>
                <button onClick={() => setAuthStep('login')} className="w-full text-left px-4 py-3 hover:bg-teal-50 text-red-600 font-semibold"><LogOut className="inline mr-2" size={18} /> Logout</button>
              </div>
            )}

            <div className="px-6 py-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Daily Calories</h2>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#14B8A6" strokeWidth="8" strokeDasharray={`${(caloriePercentage / 100) * 339.3} 339.3`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{Math.round(dailyData.consumedCalories)}</p>
                    <p className="text-xs text-gray-500">/ {dailyData.targetCalories}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Water Intake</h2>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-teal-500" style={{ width: `${Math.min(waterPercentage, 100)}%` }} />
                </div>
                <p className="text-sm text-gray-600">{dailyData.waterIntake}ml / {dailyData.waterTarget}ml</p>
                <button onClick={() => setDailyData({ ...dailyData, waterIntake: Math.min(dailyData.waterIntake + 250, dailyData.waterTarget) })} className="w-full mt-4 py-2 bg-teal-500 text-white rounded-lg font-semibold">+ 250ml</button>
              </div>
            </div>
          </div>
        );
      }

      if (currentTab === 'log-food') {
        return (
          <div className="min-h-screen bg-gray-50 pb-24">
            <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
              <h1 className="text-2xl font-bold">Log Food 🍎</h1>
            </div>

            <div className="px-6 py-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type="text" placeholder="Search food..." value={foodSearch} onChange={(e) => setFoodSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg" />
                </div>

                {foodSearch && (
                  <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                    {foodDatabase.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase())).map(food => (
                      <button key={food.id} onClick={() => { setSelectedFood(food.id); setFoodSearch(''); }} className="w-full text-left p-3 bg-teal-50 hover:bg-teal-100 rounded-lg border-l-4 border-teal-500">
                        <p className="font-semibold">{food.name}</p>
                        <p className="text-sm text-gray-600">{food.calories} cal</p>
                      </button>
                    ))}
                  </div>
                )}

                {selectedFood && (
                  <>
                    <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500 mb-4">
                      <p className="font-semibold">{foodDatabase.find(f => f.id === selectedFood)?.name}</p>
                    </div>
                    <input type="number" placeholder="Quantity" value={foodQuantity} onChange={(e) => setFoodQuantity(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4" />
                    <button onClick={handleAddFood} className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2"><Plus size={20} /> Add Food</button>
                  </>
                )}
              </div>

              {foodItems.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Today's Meals</h3>
                  <div className="space-y-3">
                    {foodItems.map(food => (
                      <div key={food.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-teal-500">
                        <div>
                          <p className="font-semibold">{food.name} × {food.quantity}</p>
                          <p className="text-sm text-gray-600">{Math.round(food.calories)} cal</p>
                        </div>
                        <button onClick={() => handleRemoveFood(food.id)} className="text-red-500 hover:text-red-700"><X size={20} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      if (currentTab === 'progress') {
        const bmi = calculateBMI();
        const bmiCategory = getBMICategory();

        return (
          <div className="min-h-screen bg-gray-50 pb-24">
            <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
              <h1 className="text-2xl font-bold">Progress 📊</h1>
            </div>

            <div className="px-6 py-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-bold mb-4">Body Metrics</h3>
                <p className="text-4xl font-bold text-center mb-4">{bmi}</p>
                <p className="text-center text-gray-600 mb-4">Your BMI</p>
                {bmiCategory && (
                  <div className="p-4 rounded-lg text-center" style={{ background: bmiCategory.color + '20', borderLeft: `4px solid ${bmiCategory.color}` }}>
                    <p className="font-semibold" style={{ color: bmiCategory.color }}>{bmiCategory.category}</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Last 20 Days</h3>
                  <button onClick={handleExportData} className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1 text-sm"><Download size={16} /> Export</button>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {activityHistory.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{ background: getActivityColor(day.caloriesConsumed) }}>{day.date.getDate()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (currentTab === 'exercise') {
        return (
          <div className="min-h-screen bg-gray-50 pb-24">
            <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
              <h1 className="text-2xl font-bold">Exercises 💪</h1>
            </div>

            <div className="px-6 py-6">
              {!selectedExercise ? (
                <>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Select Activity</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {exerciseDatabase.map(ex => (
                      <button key={ex.id} onClick={() => setSelectedExercise(ex.id)} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border-t-4 border-teal-500">
                        <p className="text-3xl mb-2">{ex.icon}</p>
                        <p className="font-semibold text-sm">{ex.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{ex.caloriesPerMin} cal/min</p>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                  <p className="text-4xl mb-4">{exerciseDatabase.find(e => e.id === selectedExercise)?.icon}</p>
                  <h2 className="text-2xl font-bold mb-4">{exerciseDatabase.find(e => e.id === selectedExercise)?.name}</h2>
                  <div className="text-6xl font-bold text-teal-600 mb-6 font-mono">{formatTime(exerciseTimer)}</div>
                  <div className="bg-teal-50 p-4 rounded-lg mb-6 border-l-4 border-teal-500">
                    <p className="text-gray-600 text-sm mb-1">Estimated Calories Burned</p>
                    <p className="text-2xl font-bold text-teal-600">{Math.round((exerciseDatabase.find(e => e.id === selectedExercise)?.caloriesPerMin || 0) * exerciseTimer / 60)}</p>
                  </div>
                  <div className="flex gap-4 mb-4">
                    {!isExerciseRunning ? (
                      <button onClick={() => setIsExerciseRunning(true)} className="flex-1 py-4 bg-teal-500 text-white rounded-lg font-bold flex items-center justify-center gap-2"><Play size={24} /> Start</button>
                    ) : (
                      <button onClick={() => setIsExerciseRunning(false)} className="flex-1 py-4 bg-orange-500 text-white rounded-lg font-bold flex items-center justify-center gap-2"><Pause size={24} /> Pause</button>
                    )}
                    <button onClick={handleEndExercise} className="flex-1 py-4 bg-red-500 text-white rounded-lg font-bold flex items-center justify-center gap-2"><StopCircle size={24} /> End</button>
                  </div>
                  <button onClick={() => setSelectedExercise(null)} className="w-full py-2 text-teal-600 font-semibold">Change</button>
                </div>
              )}

              {exercises.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
                  <h3 className="text-lg font-bold mb-4">Today's Workouts</h3>
                  <div className="space-y-3">
                    {exercises.map((ex, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                        <div>
                          <p className="font-semibold">{ex.name}</p>
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

      if (currentTab === 'profile') {
        return (
          <div className="min-h-screen bg-gray-50 pb-24">
            <div style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }} className="text-white p-6 pt-8">
              <h1 className="text-2xl font-bold">Profile 👤</h1>
            </div>

            <div className="px-6 py-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-4xl mx-auto mb-4">👤</div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email || 'Guest'}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-bold mb-4">Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-semibold capitalize">{user.gender}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Age</span>
                    <span className="font-semibold">{user.age}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Height</span>
                    <span className="font-semibold">{user.height} cm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-semibold">{user.weight} kg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">BMI</span>
                    <span className="font-semibold">{calculateBMI() || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setAuthStep('login')} className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2"><LogOut size={20} /> Logout</button>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-50 flex flex-col">
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 shadow-2xl">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'log-food', icon: Apple, label: 'Log' },
            { id: 'progress', icon: TrendingUp, label: 'Progress' },
            { id: 'exercise', icon: Zap, label: 'Exercise' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setCurrentTab(tab.id)} className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition ${currentTab === tab.id ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`} style={{ background: currentTab === tab.id ? '#F0FDFA' : 'transparent' }}>
                <Icon size={24} />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
};

export default CaloryTrackerPro;
