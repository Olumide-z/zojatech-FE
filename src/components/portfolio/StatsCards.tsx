import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, iconBg }) => (
  <div className="bg-white rounded-xl p-4 md:p-5 flex items-center justify-between flex-1 min-w-0">
    <div>
      <p className="text-[20px] md:text-[24px] font-bold text-body-action leading-tight">{value}</p>
      <p className="text-[13px] text-[#818187] mt-0.5">{label}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
      <img src={icon} alt={label} className='w-[16px] h-[18px] object-contain' />
    </div>
  </div>
);

const StatsCards: React.FC = () => {
  return (
    <div className="flex gap-3 md:gap-4 flex-col sm:flex-row">
      <StatCard
        value="51"
        label="Total Channels"
        iconBg="bg-[#E0FAF5]"
        icon='/assets/circle layer.svg'
      />
      <StatCard
        value="125"
        label="New Members"
        iconBg="bg-[#EFF2FE]"
        icon='/assets/person-stats.svg'
      />
      <StatCard
        value="789"
        label="All Impressions"
        iconBg="bg-[#FFF0E0]"
        icon='/assets/impression.svg'
      />
    </div>
  );
};

export default StatsCards;
