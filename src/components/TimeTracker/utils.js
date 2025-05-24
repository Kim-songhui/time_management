export const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

export const formatTimerTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimeSlot = (startTime, endTime) => {
  return `${startTime} - ${endTime}`;
};

export const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const analyzeRoutine = (activities) => {
  const timeSlots = {};
  const categoryTimes = {};
  activities.forEach(activity => {
    const startMinutes = timeToMinutes(activity.startTime);
    const hourSlot = Math.floor(startMinutes / 60);
    if (!timeSlots[hourSlot]) timeSlots[hourSlot] = {};
    if (!timeSlots[hourSlot][activity.category]) timeSlots[hourSlot][activity.category] = 0;
    timeSlots[hourSlot][activity.category] += activity.duration;
    if (!categoryTimes[activity.category]) categoryTimes[activity.category] = [];
    categoryTimes[activity.category].push(startMinutes);
  });
  const consistentActivities = [];
  const recommendations = [];
  Object.entries(categoryTimes).forEach(([category, times]) => {
    if (times.length > 2) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const variance = times.reduce((acc, time) => acc + Math.pow(time - avgTime, 2), 0) / times.length;
      if (variance < 3600) {
        consistentActivities.push(category);
      }
    }
  });
  const morningWork = timeSlots[9] || timeSlots[10] || {};
  const afternoonWork = timeSlots[14] || timeSlots[15] || {};
  if (!morningWork['💼 업무'] && !morningWork['📚 학습']) {
    recommendations.push('오전 시간을 더 생산적으로 활용해보세요.');
  }
  if (!timeSlots[22] && !timeSlots[23]) {
    recommendations.push('저녁 시간에 휴식이나 개인 시간을 더 확보해보세요.');
  }
  return { consistentActivities, recommendations, timeSlots };
};

export const generateInsights = (stats, routineAnalysis = {}, categories, moods) => {
  const { consistentActivities = [], recommendations = [] } = routineAnalysis || {};
  const insights = [];
  if (stats.totalTime < 480) {
    insights.push({
      type: 'warning',
      title: '활동 시간 부족',
      message: '오늘은 8시간 미만의 활동이 기록되었습니다. 더 많은 활동을 기록해보세요.'
    });
  }
  if (stats.productiveRatio > 70) {
    insights.push({
      type: 'success',
      title: '높은 생산성!',
      message: `오늘은 ${stats.productiveRatio.toFixed(1)}%의 높은 생산성을 보였습니다. 계속 유지해보세요!`
    });
  }
  if (consistentActivities.length > 0) {
    insights.push({
      type: 'info',
      title: '일관된 루틴',
      message: `${consistentActivities.join(', ')} 활동이 일정한 시간대에 수행되고 있습니다.`
    });
  }
  if (recommendations.length > 0) {
    insights.push({
      type: 'info',
      title: '루틴 개선 제안',
      message: recommendations[0]
    });
  }
  return insights;
};

export const generateTomorrowPlan = (routineAnalysis, todayStats, categories) => {
  const plan = [];
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  routineAnalysis.consistentActivities.forEach(activity => {
    plan.push({
      time: '09:00',
      activity: `${activity} (루틴 유지)`,
      type: 'routine'
    });
  });
  const lowCategories = Object.entries(todayStats.categoryStats)
    .filter(([cat, data]) => data.time < 60 && categories[cat]?.productive)
    .map(([cat]) => cat);
  lowCategories.forEach((cat, index) => {
    plan.push({
      time: `${14 + index}:00`,
      activity: `${cat} 시간 확보`,
      type: 'improvement'
    });
  });
  if (todayStats.avgMood < 3) {
    plan.push({
      time: '20:00',
      activity: '기분 전환 활동 (산책, 취미 등)',
      type: 'wellbeing'
    });
  }
  return plan.slice(0, 5);
}; 