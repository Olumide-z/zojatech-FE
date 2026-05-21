import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const chartData = [
  { month: 'JAN', bar1: 650, bar2: 720, bar3: 480 },
  { month: 'FEB', bar1: 350, bar2: 400, bar3: 300 },
  { month: 'MAR', bar1: 570, bar2: 480, bar3: 550 },
  { month: 'APR', bar1: 360, bar2: 540, bar3: 580 },
  { month: 'MAY', bar1: 500, bar2: 560, bar3: 580 },
  { month: 'JUN', bar1: 650, bar2: 870, bar3: 500 },
  { month: 'JUL', bar1: 570, bar2: 700, bar3: 520 },
  { month: 'AUG', bar1: 620, bar2: 650, bar3: 480 },
  { month: 'SEP', bar1: 350, bar2: 400, bar3: 340 },
  { month: 'OCT', bar1: 500, bar2: 700, bar3: 420 },
  { month: 'NOV', bar1: 300, bar2: 350, bar3: 280 },
  { month: 'DEC', bar1: 600, bar2: 620, bar3: 580 },
];

const filters = ['Robbin Hood', 'Ameritrade', 'Fidelity', 'Charles'];

const OverviewChart: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Robbin Hood');

  // Determine which bar key is "active" based on the filter index
  const activeBarKey = `bar${filters.indexOf(activeFilter) % 3 + 1}`;

  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h3 className="text-[18px] md:text-[20px] font-bold text-body-action">Overview</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer select-none border
                ${activeFilter === f
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'text-[#818187] border-[#E8E8E8] hover:bg-slate-50'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: 245 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barCategoryGap="20%"
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E8E8E8"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#A3A3A6', fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#A3A3A6', fontWeight: 500 }}
              domain={[0, 1000]}
              ticks={[0, 200, 400, 600, 800, 1000]}
              dx={-4}
              width={36}
            />
            <Bar dataKey="bar1" radius={[3, 3, 0, 0]} maxBarSize={14}>
              {chartData.map((_, index) => (
                <Cell
                  key={`bar1-${index}`}
                  fill={activeBarKey === 'bar1' ? '#F5A623' : '#E8E8E8'}
                />
              ))}
            </Bar>
            <Bar dataKey="bar2" radius={[3, 3, 0, 0]} maxBarSize={14}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`bar2-${index}`}
                  fill={
                    activeBarKey === 'bar2'
                      ? entry.month === 'JUN'
                        ? '#F5A623'
                        : '#F5A623'
                      : entry.month === 'JUN'
                        ? '#F5A623'
                        : '#D4D4D4'
                  }
                />
              ))}
            </Bar>
            <Bar dataKey="bar3" radius={[3, 3, 0, 0]} maxBarSize={14}>
              {chartData.map((_, index) => (
                <Cell
                  key={`bar3-${index}`}
                  fill={activeBarKey === 'bar3' ? '#F5A623' : '#E8E8E8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;
