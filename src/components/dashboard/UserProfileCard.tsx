import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const UserProfileCard: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();

  // Get stored user
  const firstName = localStorage.getItem('first_name') || '';
  const lastName = localStorage.getItem('last_name') || '';

  const fullName = `${firstName} ${lastName}`.trim();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('email');

    // Redirect to login
    navigate('/login');
  };

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-[#DDE2E4] overflow-hidden shrink-0">
          <img
            src="/assets/user-photo.png"
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={handleLogout}
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
      {/* Avatar */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-[3px] border-white overflow-hidden shadow-sm shrink-0">
        <img
          src="/assets/user-photo.png"
          alt={fullName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="text-center font-lexend">
        <h3 className="text-[18px] font-medium text-body-black">
          {fullName || 'Theresa milly'}
        </h3>

        <p className="text-[13px] text-body-grey mt-0.5">
          influencer
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-[#FF860029] text-primary text-[14px] font-medium py-3 rounded-[16px] hover:bg-[#FFE5D3] transition-colors cursor-pointer select-none"
      >
        <LogOut size={15} />
        Logout
      </button>
    </div>
  );
};

export default UserProfileCard;
