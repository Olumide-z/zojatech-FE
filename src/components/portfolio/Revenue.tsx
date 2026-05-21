import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

interface RevenueItem {
  amount: string;
  source: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const revenueItems: RevenueItem[] = [
  {
    amount: '$4,000',
    source: 'Recently Added Pages',
    icon: <FaFacebookF size={16} />,
    iconBg: 'bg-[#E8F0FE]',
    iconColor: 'text-[#1877F2]'
  },
  {
    amount: '$2,120',
    source: 'Video Monetization',
    icon: <FaInstagram size={16} />,
    iconBg: 'bg-[#FDF0F5]',
    iconColor: 'text-[#E1306C]'
  },
  {
    amount: '$1,752',
    source: 'Community Buildup',
    icon: <FaLinkedin size={16} />,
    iconBg: 'bg-[#E4F4FA]',
    iconColor: 'text-[#0077B5]'
  }
];

const Revenue: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6">
      <h3 className="text-[18px] md:text-[20px] font-bold text-body-action mb-4">Revenue</h3>

      <div className="flex flex-col gap-3.5">
        {revenueItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3.5 border border-[#F1F1F1] rounded-xl hover:border-primary/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[16px] md:text-[18px] font-bold text-body-action">{item.amount}</span>
              <span className="text-[12px] md:text-[12px] text-[#818187]">{item.source}</span>
            </div>

            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revenue;
