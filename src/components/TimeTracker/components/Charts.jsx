import React from 'react';
import { PieChart, BarChart, Bar, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { formatTime } from '../utils';

const Charts = ({ stats }) => {
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

  return (
    <div className="grid-2 gap-6">
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
  );
};

export default Charts; 