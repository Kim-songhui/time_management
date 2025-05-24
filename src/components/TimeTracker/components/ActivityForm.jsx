import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { timeToMinutes } from '../utils';

const ActivityForm = ({ addActivity, CATEGORIES, MOODS }) => {
  const [formData, setFormData] = useState({
    category: Object.keys(CATEGORIES)[0],
    activity: '',
    startTime: '',
    endTime: '',
    mood: '😐',
    note: ''
  });

  // 소요 시간 자동 계산
  let duration = '';
  if (formData.startTime && formData.endTime) {
    const start = timeToMinutes(formData.startTime);
    const end = timeToMinutes(formData.endTime);
    duration = end - start;
    if (duration < 0) duration += 24 * 60;
  }

  const handleSubmit = () => {
    if (formData.activity && formData.startTime && formData.endTime) {
      addActivity({
        ...formData,
        duration: duration || 0
      });
      setFormData({
        category: Object.keys(CATEGORIES)[0],
        activity: '',
        startTime: '',
        endTime: '',
        mood: '😐',
        note: ''
      });
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg mb-4 flex items-center gap-2">
        <Plus style={{ color: '#10B981', width: 20, height: 20 }} />
        활동 추가
      </h3>
      <div className="gap-4 grid-2 mb-4">
        <div>
          <label className="text-sm mb-2">카테고리</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value, activity: ''})}
          >
            {Object.keys(CATEGORIES).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm mb-2">활동</label>
          <select
            value={formData.activity}
            onChange={(e) => setFormData({...formData, activity: e.target.value})}
          >
            <option value="">선택하세요</option>
            {CATEGORIES[formData.category]?.activities.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="gap-4 grid-2 mb-4">
        <div>
          <label className="text-sm mb-2">시작 시간</label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm mb-2">종료 시간</label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({...formData, endTime: e.target.value})}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="text-sm mb-2">소요 시간 (분)</label>
        <input type="number" value={duration} readOnly style={{ background: '#f3f4f6' }} />
      </div>
      <div className="gap-4 grid-2 mb-4">
        <div>
          <label className="text-sm mb-2">기분</label>
          <select
            value={formData.mood}
            onChange={(e) => setFormData({...formData, mood: e.target.value})}
          >
            {MOODS.map(mood => (
              <option key={mood.emoji} value={mood.emoji}>
                {mood.emoji} {mood.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-sm mb-2">메모 (선택사항)</label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData({...formData, note: e.target.value})}
          rows="2"
          placeholder="활동에 대한 간단한 메모..."
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!(formData.activity && formData.startTime && formData.endTime)}
        className="btn"
        style={{ opacity: formData.activity && formData.startTime && formData.endTime ? 1 : 0.5 }}
      >
        활동 추가하기
      </button>
    </div>
  );
};

export default ActivityForm; 