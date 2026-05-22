import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';
import UserProfileCard from './UserProfileCard';

const SidebarContent: React.FC<{
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onMobileClose?: () => void;
  isMobile?: boolean;
}> = ({ collapsed, onMobileClose, isMobile }) => (
  <div className="h-full flex flex-col font-lexend">
    {/* Logo + close / collapse controls */}
    <div className={`flex items-center h-16 px-4 shrink-0 ${!isMobile ? 'justify-between pl-[2.5rem]' : 'justify-between'}`}>
      {(!collapsed || isMobile) && (
        <img
          src="/assets/logo.svg"
          alt="Buddy"
          className="h-[30px] w-[96px] object-contain select-none"
          loading="lazy"
        />
      )}
      {isMobile ? (
        <button
          onClick={onMobileClose}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-body-light-grey transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      ) : (
        <></>
      )}
    </div>

    {/* Nav Items */}
    <nav className="flex-1 py-4 space-y-3 overflow-y-auto flex flex-col items-center">
      {NAV_ITEMS.map(({ to, icon, activeIcon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/portfolio'}
          className={({ isActive }) =>
            `flex items-center justify-start gap-3 w-[200px] px-4 py-3 rounded-2xl text-[14px] transition-all duration-150 select-none group relative
            ${isActive
              ? 'text-primary bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] before:content-[\'\'] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-[6px] before:h-6 before:bg-primary before:rounded-full'
              : 'text-body-light-grey hover:bg-slate-100 hover:text-body-action'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive && activeIcon ? activeIcon : icon}
                alt=""
                className={`w-[18px] h-[18px] object-contain shrink-0 transition-all duration-150 ${isActive ? '' : 'opacity-70 group-hover:opacity-100'
                  }`}
              />
              {(!collapsed || isMobile) && <span className="truncate">{label}</span>}
              {collapsed && !isMobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-body-action text-white text-[12px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                  {label}
                </div>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* User profile + Logout Card */}
    <div className="shrink-0 w-full flex justify-center pb-6">
      <UserProfileCard collapsed={collapsed && !isMobile} />
    </div>
  </div>
);

export default SidebarContent;
