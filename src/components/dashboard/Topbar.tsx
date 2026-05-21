import React, { useState } from 'react';
import { Plus, Bell, Menu, Search, X } from 'lucide-react';
import { SearchInput } from '../common/SearchInput';

interface TopbarProps {
  title: string;
  onMobileMenuOpen: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  title,
  onMobileMenuOpen,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Mobile Search Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-3 shadow-sm transition-all duration-300 ease-in-out ${showMobileSearch
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchInput />
          </div>

          <button
            onClick={() => setShowMobileSearch(false)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <header className="h-16 bg-[#fafafa] flex justify-between items-center px-4 md:px-6 gap-4 shrink-0 z-20 font-lexend">
        {/* Left section */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile hamburger */}
          <button
            onClick={onMobileMenuOpen}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-body-light-grey transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </button>

          {/* Page title */}
          <h1 className="text-[18px] md:text-[20px] font-bold text-body-action">
            {title}
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-2 shrink-0">
          {/* Desktop Search */}
          <div className="hidden md:block">
            <SearchInput />
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-body-light-grey transition-colors cursor-pointer"
          >
            <Search size={16} />
          </button>

          {/* Add button */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-body-light-grey transition-colors cursor-pointer">
            <Plus size={16} />
          </button>

          {/* Notification button */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-body-light-grey transition-colors cursor-pointer relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Topbar;