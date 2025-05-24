import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Calendar, Plus, Trash2, Star, CheckCircle, AlertCircle, TrendingUp, Activity, Sun, Moon, BarChart3 } from 'lucide-react';
import { PieChart, BarChart, Bar, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import './TimeTrackerAgent.css';
import { CATEGORIES, MOODS } from './constants';
import {
  formatTime,
  formatTimerTime,
  formatTimeSlot,
  timeToMinutes,
  minutesToTime,
  analyzeRoutine,
  generateInsights,
  generateTomorrowPlan
} from './utils';
import QuickTimer from './components/QuickTimer';
import ActivityForm from './components/ActivityForm';
import TodayStats from './components/TodayStats';
import ActivityList from './components/ActivityList';
import Charts from './components/Charts';
import InsightsPanel from './components/InsightsPanel';
import Navigation from './components/Navigation';
import TimelineView from './components/TimelineView';
import AnalyticsView from './components/AnalyticsView';
import PlannerView from './components/PlannerView';

const TimeTrackerAgent = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activities, setActivities] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);

  // 타이머 로직
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && currentTimer) {
      interval = setInterval(() => {
        setCurrentTimer(prev => ({ ...prev, elapsed: prev.elapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentTimer]);

  const toggleTimer = (activity = null, category = null) => {
    if (isTimerRunning) {
      const duration = Math.ceil(currentTimer.elapsed / 60);
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - currentTimer.elapsed * 1000);
      addActivity({
        category: currentTimer.category,
        activity: currentTimer.activity,
        duration,
        mood: '😐',
        note: '타이머로 측정됨',
        startTime: `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`,
        endTime: `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`
      });
      setIsTimerRunning(false);
      setCurrentTimer(null);
    } else if (activity && category) {
      setCurrentTimer({ activity, category, elapsed: 0 });
      setIsTimerRunning(true);
    }
  };

  const addActivity = (formData) => {
    const now = new Date();
    let duration = formData.duration;
    if (formData.startTime && formData.endTime) {
      const startMinutes = timeToMinutes(formData.startTime);
      const endMinutes = timeToMinutes(formData.endTime);
      duration = endMinutes - startMinutes;
      if (duration < 0) duration += 24 * 60;
    }
    const activity = {
      id: Date.now(),
      ...formData,
      duration,
      date: selectedDate,
      timestamp: now.toISOString(),
      startTime: formData.startTime || `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
      endTime: formData.endTime || minutesToTime(timeToMinutes(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`) + duration)
    };
    setActivities(prev => [...prev, activity]);
  };

  const todayActivities = activities.filter(activity => activity.date === selectedDate);

  const stats = useMemo(() => {
    const totalTime = todayActivities.reduce((sum, activity) => sum + activity.duration, 0);
    const productiveTime = todayActivities.filter(activity => CATEGORIES[activity.category]?.productive).reduce((sum, activity) => sum + activity.duration, 0);
    const categoryStats = {};
    Object.keys(CATEGORIES).forEach(category => {
      const categoryActivities = todayActivities.filter(a => a.category === category);
      categoryStats[category] = {
        time: categoryActivities.reduce((sum, a) => sum + a.duration, 0),
        count: categoryActivities.length,
        color: CATEGORIES[category].color
      };
    });
    const moodValues = todayActivities.map(a => MOODS.find(m => m.emoji === a.mood)?.value || 3);
    const avgMood = moodValues.length > 0 ? moodValues.reduce((a, b) => a + b, 0) / moodValues.length : 0;
    return {
      totalTime,
      productiveRatio: totalTime > 0 ? (productiveTime / totalTime) * 100 : 0,
      activitiesCount: todayActivities.length,
      avgMood,
      categoryStats
    };
  }, [todayActivities]);

  const routineAnalysis = useMemo(() => analyzeRoutine(activities.filter(a => a.startTime && a.endTime)), [activities]);
  const tomorrowPlan = useMemo(() => generateTomorrowPlan(routineAnalysis, stats, CATEGORIES), [routineAnalysis, stats]);
  const insights = generateInsights(stats, routineAnalysis, CATEGORIES, MOODS);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Navigation 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        <div className="container">
          {currentPage === 'dashboard' && (
            <>
              <TodayStats stats={stats} />
              <QuickTimer 
                isTimerRunning={isTimerRunning}
                currentTimer={currentTimer}
                toggleTimer={toggleTimer}
                CATEGORIES={CATEGORIES}
              />
              <div className="grid-2 gap-6">
                <ActivityForm 
                  addActivity={addActivity}
                  CATEGORIES={CATEGORIES}
                  MOODS={MOODS}
                />
                <ActivityList 
                  todayActivities={todayActivities}
                  setActivities={setActivities}
                  CATEGORIES={CATEGORIES}
                  formatTime={formatTime}
                  formatTimeSlot={formatTimeSlot}
                />
              </div>
              <div className="mt-6">
                <InsightsPanel 
                  stats={stats}
                  routineAnalysis={routineAnalysis}
                  insights={insights}
                />
              </div>
            </>
          )}
          {currentPage === 'timeline' && (
            <TimelineView todayActivities={todayActivities} CATEGORIES={CATEGORIES} />
          )}
          {currentPage === 'analytics' && (
            <AnalyticsView stats={stats} activities={activities} CATEGORIES={CATEGORIES} routineAnalysis={routineAnalysis} />
          )}
          {currentPage === 'planner' && (
            <PlannerView tomorrowPlan={tomorrowPlan} routineAnalysis={routineAnalysis} stats={stats} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerAgent; 