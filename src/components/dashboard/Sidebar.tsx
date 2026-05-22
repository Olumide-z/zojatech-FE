import React from 'react';
import SidebarContent from './SidebarContent';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

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
