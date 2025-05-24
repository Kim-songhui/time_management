import React from 'react';
import { timeToMinutes } from '../utils';

const TimelineView = ({ todayActivities, CATEGORIES }) => {
  const timelineData = React.useMemo(() => {
    const segments = [];
    const sortedActivities = todayActivities
      .filter(activity => activity.startTime && activity.endTime)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    sortedActivities.forEach(activity => {
      const startMinutes = timeToMinutes(activity.startTime);
      const endMinutes = timeToMinutes(activity.endTime);
      const startAngle = (startMinutes / 1440) * 360 - 90;
      const endAngle = (endMinutes / 1440) * 360 - 90;
      segments.push({
        ...activity,
        startAngle,
        endAngle,
        color: CATEGORIES[activity.category]?.color || '#ccc'
      });
    });
    return segments;
  }, [todayActivities, CATEGORIES]);

  const createSegmentPath = (startAngle, endAngle, innerRadius, outerRadius) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const x1 = 200 + innerRadius * Math.cos(startAngleRad);
    const y1 = 200 + innerRadius * Math.sin(startAngleRad);
    const x2 = 200 + outerRadius * Math.cos(startAngleRad);
    const y2 = 200 + outerRadius * Math.sin(startAngleRad);
    const x3 = 200 + outerRadius * Math.cos(endAngleRad);
    const y3 = 200 + outerRadius * Math.sin(endAngleRad);
    const x4 = 200 + innerRadius * Math.cos(endAngleRad);
    const y4 = 200 + innerRadius * Math.sin(endAngleRad);
    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`;
  };

  return (
    <div>
      <h2 className="text-lg mb-6 text-center">24시간 활동 타임라인</h2>
      <div className="grid-2 gap-6">
        <div className="card">
          <div className="timeline-container">
            <svg width="400" height="400" style={{ display: 'block', margin: '0 auto' }}>
              {/* 시간 마커 */}
              {Array.from({ length: 24 }, (_, i) => {
                const angle = (i / 24) * 360 - 90;
                const angleRad = (angle * Math.PI) / 180;
                const x1 = 200 + 170 * Math.cos(angleRad);
                const y1 = 200 + 170 * Math.sin(angleRad);
                const x2 = 200 + 190 * Math.cos(angleRad);
                const y2 = 200 + 190 * Math.sin(angleRad);
                const textX = 200 + 160 * Math.cos(angleRad);
                const textY = 200 + 160 * Math.sin(angleRad);
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d1d5db" strokeWidth="2" />
                    <text x={textX} y={textY} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#6b7280">{i}</text>
                  </g>
                );
              })}
              {/* 외곽 원 */}
              <circle cx="200" cy="200" r="190" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              {/* 활동 세그먼트 */}
              {timelineData.map((segment, index) => (
                <path
                  key={index}
                  d={createSegmentPath(segment.startAngle, segment.endAngle, 120, 190)}
                  fill={segment.color}
                  opacity="0.8"
                  stroke="white"
                  strokeWidth="1"
                >
                  <title>{segment.activity} ({segment.startTime} - {segment.endTime})</title>
                </path>
              ))}
              {/* 중앙 텍스트 */}
              <text x="200" y="195" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1f2937">오늘</text>
              <text x="200" y="210" textAnchor="middle" fontSize="12" fill="#6b7280">{todayActivities.length}개 활동</text>
            </svg>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg mb-4">활동 범례</h3>
          <div className="gap-2" style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(CATEGORIES).map(([category, data]) => {
              const categoryActivities = todayActivities.filter(a => a.category === category);
              if (categoryActivities.length === 0) return null;
              return (
                <div key={category} className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: 16, height: 16, backgroundColor: data.color }} />
                  <span className="text-sm">{category} ({categoryActivities.length}개)</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <h4 className="text-bold mb-2">시간대별 활동</h4>
            <div className="gap-1" style={{ display: 'flex', flexDirection: 'column', maxHeight: '300px', overflowY: 'auto' }}>
              {todayActivities
                .filter(a => a.startTime && a.endTime)
                .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
                .map(activity => (
                  <div key={activity.id} className="flex items-center gap-2 p-2 bg-gray rounded">
                    <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: CATEGORIES[activity.category]?.color }} />
                    <span className="text-sm">{activity.startTime} - {activity.endTime}: {activity.activity}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView; 