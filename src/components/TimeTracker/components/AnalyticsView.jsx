import React from 'react';
import { PieChart, BarChart, Bar, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { formatTime } from '../utils';

const AnalyticsView = ({ stats, activities, CATEGORIES, routineAnalysis }) => {
  const pieData = Object.entries(stats.categoryStats)
    .filter(([, data]) => data.time > 0)
    .map(([category, data]) => ({
      name: category.replace(/^.+ /, ''),
      value: data.time,
      color: data.color
    }));
  const barData = Object.entries(stats.categoryStats)
    .filter(([, data]) => data.count > 0)
    .map(([cat, data]) => ({
      category: cat.replace(/^.+ /, ''),
      count: data.count,
      fill: data.color
    }));
  const hourlyData = React.useMemo(() => {
    const hourlyStats = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00`,
      activities: 0,
      productive: 0
    }));
    activities.forEach(activity => {
      if (activity.startTime) {
        const hour = Math.floor((activity.startTime && activity.startTime.includes(':')) ? parseInt(activity.startTime.split(':')[0], 10) : 0);
        if (hour >= 0 && hour < 24) {
          hourlyStats[hour].activities += 1;
          if (CATEGORIES[activity.category]?.productive) {
            hourlyStats[hour].productive += 1;
          }
        }
      }
    });
    return hourlyStats;
  }, [activities, CATEGORIES]);
  return (
    <div>
      <h2 className="text-lg mb-6">활동 분석</h2>
      <div className="grid-2 gap-6 mb-6">
        <div className="card">
          <h3 className="text-lg mb-4">카테고리별 시간 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, value}) => `${name}: ${formatTime(value)}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatTime(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="text-lg mb-4">카테고리별 활동 횟수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card mb-6">
        <h3 className="text-lg mb-4">시간대별 활동 패턴</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activities" stroke="#3B82F6" name="전체 활동" />
            <Line type="monotone" dataKey="productive" stroke="#10B981" name="생산적 활동" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <BarChart3 style={{ color: '#8B5CF6', width: 20, height: 20 }} />
          루틴 분석
        </h3>
        <div className="grid-2 gap-4">
          <div>
            <h4 className="text-bold mb-2">일관된 활동</h4>
            {routineAnalysis.consistentActivities.length > 0 ? (
              <div className="gap-2" style={{ display: 'flex', flexDirection: 'column' }}>
                {routineAnalysis.consistentActivities.map(activity => (
                  <div key={activity} className="routine-card" style={{ borderLeftColor: CATEGORIES[activity]?.color || '#ccc', backgroundColor: '#f9fafb' }}>
                    <span className="text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">아직 일관된 루틴이 감지되지 않았습니다.</p>
            )}
          </div>
          <div>
            <h4 className="text-bold mb-2">개선 제안</h4>
            {routineAnalysis.recommendations.length > 0 ? (
              <div className="gap-2" style={{ display: 'flex', flexDirection: 'column' }}>
                {routineAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="p-2 bg-gray rounded">
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">현재 추천사항이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView; 