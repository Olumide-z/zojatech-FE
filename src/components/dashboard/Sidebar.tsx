import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LogOut,
  X,
} from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const UserProfileCard: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-[#DDE2E4] overflow-hidden shrink-0">
          <img
            src="/assets/user-photo.png"
            alt="Theresa milly"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          className="w-10 h-10 flex items-center justify-center shadow-sm bg-[#FFF0E6] text-primary rounded-xl hover:bg-[#FFE5D3] transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[200px] relative mt-12 bg-white shadow-sm rounded-[24px] px-3 pb-3 pt-10 flex flex-col items-center shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
      {/* Avatar positioned overlapping the top edge */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-[3px] border-white overflow-hidden shadow-sm shrink-0">
        <img
          src="/assets/user-photo.png"
          alt="Theresa milly"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="text-center font-lexend">
        <h3 className="text-[18px] font-medium text-body-black">Theresa milly</h3>
        <p className="text-[13px] text-body-grey mt-0.5">Influencer</p>
      </div>

      {/* Logout Button */}
      <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[#FF860029] text-primary text-[14px] font-medium py-3 rounded-[16px] hover:bg-[#FFE5D3] transition-colors cursor-pointer select-none">
        <LogOut size={15} />
        Logout
      </button>
    </div>
  );
};


const SidebarContent: React.FC<{
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onMobileClose?: () => void;
  isMobile?: boolean;
}> = ({ collapsed, onToggleCollapse, onMobileClose, isMobile }) => (
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


const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:flex flex-col bg-white shrink-0
          transition-[width] duration-300 ease-in-out overflow-hidden
          ${collapsed ? 'w-[72px]' : 'w-[250px]'}
        `}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-white border-r border-[#DDE2E4]
          flex flex-col md:hidden
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent collapsed={false} onMobileClose={onMobileClose} isMobile />
      </aside>
    </>
  );
};

export default Sidebar;
