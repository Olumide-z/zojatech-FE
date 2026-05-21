import React from 'react';
import FeatureList from './FeatureList';

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, maxWidth = '489px' }) => {
  return (
    <div className="w-full md:min-h-screen min-h-svh flex justify-center font-sans">
      <div className="w-full container-7xl flex flex-col md:flex-row bg-white font-sans">
        {/* Left Panel: Brand & Features (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-[#FFFFFF] flex-col gap-14 items-start p-12 lg:px-20 relative select-none">
          <div className="flex flex-col gap-16 lg:gap-24 max-w-[462px]">
            {/* Buddy Brand Logo */}
            <div className="">
              <img
                src="/assets/logo.svg"
                alt="Buddy Logo"
                className="h-[36px] w-[120px] object-contain"
                loading='lazy'
              />
            </div>

            {/* Core Feature List */}
            <FeatureList />
          </div>

          {/* Footer info at left bottom */}
          <div className="text-[#84919A] text-[13px]">
            © {new Date().getFullYear()} Revvex. All rights reserved
          </div>
        </div>

        {/* Right Panel: Interactive Form Card Area */}
        <div className="flex-1 flex flex-col justify-between bg-[#F8FAFC]  items-center p-6 md:p-12 relative min-h-screen">
          {/* Mobile Header Logo */}
          <div className="w-full md:hidden flex items-center gap-2 mb-8 mt-2">
            <img
              src="/assets/logo.svg"
              alt="Buddy Logo"
              className="h-[33px] w-[110px] object-contain"
              loading='lazy'
            />

          </div>

          {/* Central form card wrapper */}
          <div className="w-full my-auto flex flex-col justify-center" style={{ maxWidth }}>
            <div className="w-full bg-white border border-[#DDE2E4] rounded-lg shadow-[10px_50px_50px_rgba(0,0,0,0.06)] p-6 md:p-10 max-h-167.5 select-none">
              {children}
            </div>
          </div>

          {/* Brand Get Help Button */}
          <div className="w-fit flex justify-end md:absolute md:bottom-8 md:right-8 mt-8 shrink-0">
            <button className="flex items-center gap-2.5 bg-primary hover:bg-slate-900 text-white px-5 py-3 rounded-full text-sm transition-all duration-200 cursor-pointer active:scale-95 select-none hover:shadow-orange-500/35">
              <span>Get Help</span>
              <img
                src="/assets/message.svg"
                className="w-[18px] h-[18px] object-contain select-none pointer-events-none"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
