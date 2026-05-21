import React from 'react';
import { TrendingUp } from 'lucide-react';

const members = [
  { name: 'Wanda Parker', handle: '@ashking1234', growth: '10.3%', avatar: '/assets/1.svg' },
  { name: 'Terry Brown', handle: '@ashking1234', growth: '9.8%', avatar: '/assets/2.svg' },
  { name: 'Lucas Holmes', handle: '@ashking1234', growth: '6.5%', avatar: '/assets/3.svg' },
  { name: 'Janice Miller', handle: '@ashking1234', growth: '8.6%', avatar: '/assets/4.svg' },
  { name: 'Terry Brown', handle: '@ashking1234', growth: '9.8%', avatar: '/assets/5.svg' },
];

const PotentialMembers: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6">
      <h3 className="text-[18px] md:text-[20px] font-bold text-body-action mb-4">Potential Members</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none justify-between items-center">
        {members.map((member, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 min-w-[140px] cursor-pointer group border border-[#F1F1F1] rounded-xl p-3"
          >
            {/* Avatar */}
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover shrink-0 group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2 transition-all"
            />
            {/* Info */}
            <div className="text-center">
              <p className="text-[14px] font-semibold text-body-action leading-snug">{member.name}</p>
              <p className="text-[11px] text-body-light-grey">{member.handle}</p>
            </div>
            {/* Growth */}
            <div className="flex items-center gap-1 text-[12px] font-semibold">
              <TrendingUp size={13} className='text-emerald-500' />
              <p className="text-body-action text-base font-semibold">{member.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PotentialMembers;
