import React from 'react';
import { Clock, TrendingUp, Activity, Sun, Moon } from 'lucide-react';
import { formatTime } from '../utils';

const TodayStats = ({ stats }) => {
  return (
    <div className="grid-4 mb-6">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">총 시간</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>{formatTime(stats.totalTime)}</p>
          </div>
          <Clock style={{ color: '#3B82F6', width: 32, height: 32 }} />
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">생산성</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>{stats.productiveRatio.toFixed(1)}%</p>
          </div>
          <TrendingUp style={{ color: '#10B981', width: 32, height: 32 }} />
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">활동 수</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B5CF6' }}>{stats.activitiesCount}</p>
          </div>
          <Activity style={{ color: '#8B5CF6', width: 32, height: 32 }} />
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">기분 점수</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>{stats.avgMood.toFixed(1)}</p>
          </div>
          {stats.avgMood > 0 ? <Sun style={{ color: '#F59E0B', width: 32, height: 32 }} /> : <Moon style={{ color: '#6B7280', width: 32, height: 32 }} />}
        </div>
      </div>
    </div>
  );
};

export default TodayStats; 