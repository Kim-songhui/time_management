import React from 'react';
import { Clock } from 'lucide-react';
import { formatTimerTime } from '../utils';

const QuickTimer = ({ isTimerRunning, currentTimer, toggleTimer, CATEGORIES }) => {
  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg flex items-center gap-2">
          <Clock style={{ color: '#3B82F6', width: 20, height: 20 }} />
          빠른 타이머
        </h3>
        {isTimerRunning && (
          <div style={{ fontFamily: 'monospace', color: '#2563eb', fontSize: '1.5rem' }}>
            {formatTimerTime(currentTimer.elapsed)}
          </div>
        )}
      </div>

      {isTimerRunning ? (
        <div className="text-center">
          <div className="text-lg mb-2">진행 중: <span className="text-bold">{currentTimer.activity}</span></div>
          <button
            onClick={() => toggleTimer()}
            className="btn btn-danger"
          >
            중지 및 저장
          </button>
        </div>
      ) : (
        <div className="grid-4 gap-2">
          {Object.entries(CATEGORIES).slice(0, 8).map(([category, data]) => (
            <button
              key={category}
              onClick={() => toggleTimer(data.activities[0], category)}
              className="btn btn-secondary text-center"
              style={{ border: `2px solid ${data.color}` }}
            >
              <div className="text-bold">{category.split(' ')[0]}</div>
              <div className="text-sm">{data.activities[0]}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickTimer; 