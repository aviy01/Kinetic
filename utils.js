// ========================================
// Calculation Utilities
// ========================================

/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight (kg) / (height (m) ^ 2)
 */
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

/**
 * Get BMI category and health status
 */
export const getBMICategory = (bmi) => {
  if (!bmi) return null;
  bmi = parseFloat(bmi);
  
  if (bmi < 18.5) {
    return { 
      category: 'Underweight', 
      color: '#3B82F6',
      description: 'Your BMI is below the healthy range'
    };
  }
  if (bmi < 25) {
    return { 
      category: 'Healthy Weight', 
      color: '#10B981',
      description: 'Your BMI is within the healthy range'
    };
  }
  if (bmi < 30) {
    return { 
      category: 'Overweight', 
      color: '#F59E0B',
      description: 'Your BMI is above the healthy range'
    };
  }
  return { 
    category: 'Obese', 
    color: '#EF4444',
    description: 'Your BMI is significantly above the healthy range'
  };
};

/**
 * Calculate daily caloric needs (TDEE - Total Daily Energy Expenditure)
 * Using Mifflin-St Jeor formula
 */
export const calculateTDEE = (gender, age, weight, height, activityLevel) => {
  let bmr;
  
  // Calculate Basal Metabolic Rate
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  
  // Apply activity level multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate macro targets based on goal
 */
export const calculateMacroTargets = (dailyCalories, goal) => {
  // Default: 40% carbs, 30% protein, 30% fat
  let carbPercent = 0.4;
  let proteinPercent = 0.3;
  let fatPercent = 0.3;
  
  if (goal === 'lose') {
    // Higher protein for muscle preservation: 35% carbs, 35% protein, 30% fat
    carbPercent = 0.35;
    proteinPercent = 0.35;
  } else if (goal === 'gain') {
    // Higher carbs for energy: 45% carbs, 25% protein, 30% fat
    carbPercent = 0.45;
    proteinPercent = 0.25;
  }
  
  return {
    carbs: Math.round((dailyCalories * carbPercent) / 4), // 4 cal/g
    protein: Math.round((dailyCalories * proteinPercent) / 4), // 4 cal/g
    fat: Math.round((dailyCalories * fatPercent) / 9), // 9 cal/g
    fiber: 25, // General recommendation
  };
};

/**
 * Calculate calories burned during exercise
 */
export const calculateCaloriesBurned = (exercise, durationMinutes, weight) => {
  // MET values (Metabolic Equivalent Task) for common exercises
  const metValues = {
    running: { met: 9.8, label: 'Running (8 mph)' },
    walking: { met: 3.5, label: 'Walking (3 mph)' },
    jumpingJacks: { met: 8, label: 'Jumping Jacks' },
    pushups: { met: 7, label: 'Push-ups' },
    pullups: { met: 9, label: 'Pull-ups' },
    cycling: { met: 8, label: 'Cycling (12 mph)' },
    swimming: { met: 11, label: 'Swimming (moderate)' },
    yoga: { met: 3, label: 'Yoga' },
    boxing: { met: 12, label: 'Boxing' },
    skipping: { met: 10, label: 'Skipping Rope' },
  };
  
  const met = metValues[exercise]?.met || 7;
  // Formula: Calories = (MET × weight in kg × time in hours)
  return Math.round((met * weight * (durationMinutes / 60)) * 10) / 10;
};

/**
 * Calculate water intake recommendation
 */
export const calculateWaterTarget = (weight, activityLevel) => {
  // Base: 30-35 ml per kg of body weight
  let baseWater = weight * 35;
  
  // Add extra for activity
  const activityBonus = {
    sedentary: 0,
    light: 250,
    moderate: 500,
    active: 750,
    veryActive: 1000,
  };
  
  return Math.round(baseWater + (activityBonus[activityLevel] || 0));
};

// ========================================
// Formatting Utilities
// ========================================

/**
 * Format time in mm:ss format
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format duration to readable string
 */
export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds} seconds`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (typeof date === 'string') date = new Date(date);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date to short format
 */
export const formatDateShort = (date) => {
  if (typeof date === 'string') date = new Date(date);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format calorie number
 */
export const formatCalories = (calories) => {
  return Math.round(calories).toLocaleString();
};

/**
 * Format weight (add unit)
 */
export const formatWeight = (weight, unit = 'kg') => {
  return `${weight} ${unit}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value, total) => {
  if (!total) return '0%';
  const percentage = (value / total) * 100;
  return `${Math.round(percentage)}%`;
};

/**
 * Get meal type based on time
 */
export const getMealType = (hour = null) => {
  if (!hour && typeof window !== 'undefined') {
    hour = new Date().getHours();
  }
  
  if (hour >= 5 && hour < 11) return 'Breakfast';
  if (hour >= 11 && hour < 15) return 'Lunch';
  if (hour >= 15 && hour < 17) return 'Snack';
  if (hour >= 17 && hour < 21) return 'Dinner';
  return 'Late Meal';
};

// ========================================
// Color & Status Utilities
// ========================================

/**
 * Get activity status color based on achievement
 */
export const getActivityColor = (achieved, target) => {
  const percentage = (achieved / target) * 100;
  
  if (percentage >= 90) return '#10B981'; // Green - Target achieved
  if (percentage >= 60) return '#FBBF24'; // Yellow - On track
  return '#EF4444'; // Red - Behind target
};

/**
 * Get status label
 */
export const getStatusLabel = (percentage) => {
  if (percentage >= 90) return 'Excellent!';
  if (percentage >= 75) return 'Great';
  if (percentage >= 60) return 'Good';
  if (percentage >= 50) return 'Fair';
  return 'Needs Work';
};

/**
 * Get goal achievement status
 */
export const getGoalStatus = (consumed, target, threshold = 0.9) => {
  const percentage = consumed / target;
  
  if (percentage >= threshold) {
    return { status: 'achieved', color: '#10B981', label: 'Target Reached ✓' };
  } else if (percentage >= 0.6) {
    return { status: 'on-track', color: '#FBBF24', label: 'On Track' };
  }
  return { status: 'behind', color: '#EF4444', label: 'Behind Target' };
};

// ========================================
// Data Validation Utilities
// ========================================

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?91?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);
  
  return {
    isStrong: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial,
    strength: [minLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length,
    requirements: {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
    }
  };
};

/**
 * Validate user profile data
 */
export const validateProfile = (profile) => {
  const errors = {};
  
  if (!profile.name || profile.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!profile.age || profile.age < 10 || profile.age > 120) {
    errors.age = 'Age must be between 10 and 120';
  }
  
  if (!profile.height || profile.height < 100 || profile.height > 250) {
    errors.height = 'Height must be between 100 and 250 cm';
  }
  
  if (!profile.weight || profile.weight < 30 || profile.weight > 300) {
    errors.weight = 'Weight must be between 30 and 300 kg';
  }
  
  if (!profile.gender || !['male', 'female', 'other'].includes(profile.gender)) {
    errors.gender = 'Please select a valid gender';
  }
  
  if (!profile.goal || !['lose', 'gain', 'maintain'].includes(profile.goal)) {
    errors.goal = 'Please select a valid goal';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ========================================
// Export Data Utilities
// ========================================

/**
 * Generate CSV report from activity data
 */
export const generateCSVReport = (user, activityHistory) => {
  const headers = ['Date', 'Calories Consumed', 'Calories Burned', 'Water Intake (ml)', 'Achievement'];
  
  const rows = activityHistory.map(day => [
    day.date.toLocaleDateString(),
    day.caloriesConsumed,
    day.caloriesBurned,
    day.waterIntake,
    getGoalStatus(day.caloriesConsumed, 2000).label
  ]);
  
  const csv = [
    `CaloryTracker Pro - Activity Report`,
    `User: ${user.name}`,
    `Generated: ${new Date().toLocaleDateString()}`,
    ``,
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csv;
};

/**
 * Download file helper
 */
export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// ========================================
// Array & Object Utilities
// ========================================

/**
 * Group activities by date
 */
export const groupByDate = (activities) => {
  return activities.reduce((grouped, activity) => {
    const date = new Date(activity.date).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(activity);
    return grouped;
  }, {});
};

/**
 * Sum calories from array of foods
 */
export const sumCalories = (foods) => {
  return foods.reduce((sum, food) => sum + (food.calories || 0), 0);
};

/**
 * Calculate total macros from array of foods
 */
export const calculateTotalMacros = (foods) => {
  return foods.reduce(
    (totals, food) => ({
      protein: totals.protein + (food.protein || 0),
      carbs: totals.carbs + (food.carbs || 0),
      fat: totals.fat + (food.fat || 0),
      fiber: totals.fiber + (food.fiber || 0),
    }),
    { protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
};

/**
 * Get average from array
 */
export const getAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return Math.round(sum / numbers.length);
};

/**
 * Get max from array
 */
export const getMax = (array, key) => {
  if (array.length === 0) return 0;
  return Math.max(...array.map(item => key ? item[key] : item));
};

/**
 * Get min from array
 */
export const getMin = (array, key) => {
  if (array.length === 0) return 0;
  return Math.min(...array.map(item => key ? item[key] : item));
};

// ========================================
// Storage Utilities
// ========================================

/**
 * Local storage helper
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
};

export default {
  calculateBMI,
  getBMICategory,
  calculateTDEE,
  calculateMacroTargets,
  calculateCaloriesBurned,
  calculateWaterTarget,
  formatTime,
  formatDuration,
  formatDate,
  formatDateShort,
  formatNumber,
  formatCalories,
  formatWeight,
  formatPercentage,
  getMealType,
  getActivityColor,
  getStatusLabel,
  getGoalStatus,
  validateEmail,
  validatePhone,
  validatePassword,
  validateProfile,
  generateCSVReport,
  downloadFile,
  groupByDate,
  sumCalories,
  calculateTotalMacros,
  getAverage,
  getMax,
  getMin,
  storage,
};
