import React from 'react';
import { Clock } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, selectedDate, setSelectedDate }) => {
  return (
    <nav className="navbar">
      <div className="nav-title">
        <Clock style={{ color: '#3B82F6', width: 32, height: 32 }} />
        TimeWise
      </div>
      <div className="flex items-center gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`btn${currentPage === 'dashboard' ? '' : ' btn-secondary'}`}
          >
            대시보드
          </button>
          <button
            onClick={() => setCurrentPage('analytics')}
            className={`btn${currentPage === 'analytics' ? '' : ' btn-secondary'}`}
          >
            분석
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 