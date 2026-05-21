import React from 'react';
import { ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown } from 'lucide-react';

interface WatchlistItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  sparklineData: number[];
}

const watchlistItems: WatchlistItem[] = [
  {
    symbol: 'AAPL',
    price: '$142.90',
    change: '+0.47%',
    isPositive: true,
    sparklineData: [40, 45, 42, 50, 48, 55, 52, 60]
  },
  {
    symbol: 'BPL',
    price: '$142.90',
    change: '-0.78%',
    isPositive: false,
    sparklineData: [50, 48, 45, 40, 42, 38, 41, 35]
  }
];

const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const width = 100;
  const height = 30;
  const padding = 2;

  const minX = 0;
  const maxX = data.length - 1;
  const minY = Math.min(...data);
  const maxY = Math.max(...data);

  const points = data.map((val, index) => {
    const x = ((index - minX) / (maxX - minX)) * (width - padding * 2) + padding;
    const y = height - (((val - minY) / (maxY - minY)) * (height - padding * 2) + padding);
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = '#F59E0B'; // warm orange/yellow sparkline

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {/* End point dot */}
      {data.length > 0 && (
        <circle
          cx={((data.length - 1 - minX) / (maxX - minX)) * (width - padding * 2) + padding}
          cy={height - (((data[data.length - 1] - minY) / (maxY - minY)) * (height - padding * 2) + padding)}
          r="3"
          fill={strokeColor}
        />
      )}
    </svg>
  );
};

const Watchlist: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] md:text-[20px] font-bold text-body-action">Watchlist</h3>
        <button className="text-[12px] font-bold text-primary hover:underline cursor-pointer">
          VIEW ALL
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {watchlistItems.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between p-3.5 bg-[#F6F6F6] rounded-xl transition-all duration-200"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-5">
                <span className="md:text-[18px] text-[16px] font-bold text-body-action">{item.symbol}</span>
                {item.isPositive ? (
                  <ArrowUp size={14} className="text-emerald-500" />
                ) : (
                  <ArrowDown size={14} className="text-rose-500" />
                )}
              </div>
              <span className="md:text-[15px] text-[13px] font-semibold text-[#A3A3A6]">{item.price}</span>
              <span className={`md:text-[12px] text-[10px] font-bold ${item.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {item.change}
              </span>
            </div>

            <div className="shrink-0">
              <Sparkline data={item.sparklineData} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
