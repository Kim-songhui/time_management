import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

const PlannerView = ({ tomorrowPlan, routineAnalysis, stats }) => {
  return (
    <div>
      <h2 className="text-lg mb-6">내일 계획 및 추천</h2>
      <div className="grid-2 gap-6">
        <div className="card">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <Calendar style={{ color: '#3B82F6', width: 20, height: 20 }} />
            AI 추천 일정
          </h3>
          <div className="gap-3" style={{ display: 'flex', flexDirection: 'column' }}>
            {tomorrowPlan.length > 0 ? (
              tomorrowPlan.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded flex items-center gap-3"
                  style={{
                    backgroundColor: item.type === 'routine' ? '#e6f0fa' :
                                   item.type === 'improvement' ? '#fff7e6' : '#e6f9f2',
                    border: `1px solid ${item.type === 'routine' ? '#3B82F6' :
                                        item.type === 'improvement' ? '#F59E0B' : '#10B981'}`
                  }}
                >
                  <div
                    className="text-bold"
                    style={{
                      color: item.type === 'routine' ? '#3B82F6' :
                             item.type === 'improvement' ? '#F59E0B' : '#10B981'
                    }}
                  >
                    {item.time}
                  </div>
                  <div>
                    <div className="text-bold">{item.activity}</div>
                    <div className="text-sm" style={{ color: '#6b7280' }}>
                      {item.type === 'routine' ? '지속적인 루틴' :
                       item.type === 'improvement' ? '개선 필요 영역' : '웰빙 활동'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-center" style={{ padding: '32px 0' }}>
                더 많은 데이터가 쌓이면 개인화된 추천을 제공해드릴게요!
              </p>
            )}
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <TrendingUp style={{ color: '#10B981', width: 20, height: 20 }} />
            개선 포인트
          </h3>
          <div className="gap-3" style={{ display: 'flex', flexDirection: 'column' }}>
            {stats.productiveRatio < 50 && (
              <div className="p-3 rounded" style={{ backgroundColor: '#fff7e6', border: '1px solid #F59E0B' }}>
                <h4 className="text-bold" style={{ color: '#F59E0B' }}>생산성 향상 필요</h4>
                <p className="text-sm mt-1">생산적인 활동의 비율을 높여보세요. 목표: 60% 이상</p>
              </div>
            )}
            {stats.avgMood < 3 && (
              <div className="p-3 rounded" style={{ backgroundColor: '#fee2e2', border: '1px solid #EF4444' }}>
                <h4 className="text-bold" style={{ color: '#EF4444' }}>기분 관리</h4>
                <p className="text-sm mt-1">기분을 개선할 수 있는 활동을 늘려보세요.</p>
              </div>
            )}
            {stats.totalTime < 480 && (
              <div className="p-3 rounded" style={{ backgroundColor: '#e6f0fa', border: '1px solid #3B82F6' }}>
                <h4 className="text-bold" style={{ color: '#3B82F6' }}>활동 시간 확대</h4>
                <p className="text-sm mt-1">하루 8시간 이상의 의미있는 활동을 목표로 해보세요.</p>
              </div>
            )}
            <div className="p-3 rounded" style={{ backgroundColor: '#e6f9f2', border: '1px solid #10B981' }}>
              <h4 className="text-bold" style={{ color: '#10B981' }}>균형 잡힌 하루</h4>
              <p className="text-sm mt-1">업무, 운동, 휴식, 사교 활동의 균형을 맞춰보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerView; 