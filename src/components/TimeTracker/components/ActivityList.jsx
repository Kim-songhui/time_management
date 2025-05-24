import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { formatTime } from '../utils';

const ActivityList = ({ todayActivities, setActivities, CATEGORIES }) => {
  return (
    <div className="card">
      <h3 className="text-lg mb-4 flex items-center gap-2">
        <Calendar style={{ color: '#3B82F6', width: 20, height: 20 }} />
        오늘의 활동
      </h3>
      <div className="gap-2 max-h-96" style={{ display: 'flex', flexDirection: 'column' }}>
        {todayActivities.length === 0 ? (
          <p className="text-sm text-center" style={{ padding: '32px 0' }}>아직 추가된 활동이 없습니다.</p>
        ) : (
          todayActivities.map(activity => (
            <div key={activity.id} className="flex items-center justify-between bg-gray rounded p-2">
              <div className="flex items-center gap-2">
                <div 
                  className="rounded-full"
                  style={{ width: 12, height: 12, backgroundColor: CATEGORIES[activity.category]?.color }}
                />
                <div>
                  <div className="text-bold">{activity.activity}</div>
                  <div className="text-sm">
                    {formatTime(activity.duration)} • {activity.mood}
                    {activity.note && <span className="ml-2 text-sm" style={{ color: '#888' }}>&quot;{activity.note}&quot;</span>}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActivities(prev => prev.filter(a => a.id !== activity.id))}
                className="btn btn-danger"
                style={{ padding: 4, width: 32, height: 32 }}
              >
                <Trash2 style={{ width: 16, height: 16 }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityList; 