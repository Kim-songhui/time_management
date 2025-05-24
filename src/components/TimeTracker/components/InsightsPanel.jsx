import React from 'react';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';
import { generateInsights } from '../utils';

const InsightsPanel = ({ stats, CATEGORIES, MOODS }) => {
  const insights = generateInsights(stats, CATEGORIES, MOODS);
  
  return (
    <div className="card">
      <h3 className="text-lg mb-4 flex items-center gap-2">
        <Star style={{ color: '#F59E0B', width: 20, height: 20 }} />
        AI 인사이트 & 추천
      </h3>
      <div className="gap-2" style={{ display: 'flex', flexDirection: 'column' }}>
        {insights.length === 0 ? (
          <p className="text-sm">더 많은 활동을 추가하면 개인화된 인사이트를 제공해드릴게요!</p>
        ) : (
          insights.map((insight, index) => (
            <div 
              key={index}
              className="p-2 rounded flex items-start gap-2"
              style={{
                borderLeft: `6px solid ${
                  insight.type === 'success' ? '#10B981' :
                  insight.type === 'warning' ? '#F59E0B' : '#3B82F6'
                }`,
                background: insight.type === 'success' ? '#e6f9f2' :
                  insight.type === 'warning' ? '#fff7e6' : '#e6f0fa'
              }}
            >
              {insight.type === 'success' && <CheckCircle style={{ color: '#10B981', marginTop: 4 }} />}
              {insight.type === 'warning' && <AlertCircle style={{ color: '#F59E0B', marginTop: 4 }} />}
              {insight.type === 'info' && <AlertCircle style={{ color: '#3B82F6', marginTop: 4 }} />}
              <div>
                <h4 className="text-bold">{insight.title}</h4>
                <p className="text-sm mt-2">{insight.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InsightsPanel; 