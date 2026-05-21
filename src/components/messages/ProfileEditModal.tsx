import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Profile } from './types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: Profile;
  onSave: (updated: Profile) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSave
}) => {
  const [name, setName] = useState(currentUser.name);
  const [title, setTitle] = useState(currentUser.title);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  // Sync state with props when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setTitle(currentUser.title);
      setAvatar(currentUser.avatar);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || currentUser.name,
      title: title.trim() || currentUser.title,
      avatar: avatar.trim() || currentUser.avatar
    });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs font-lexend p-4 animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative border border-[#E9E9EB] animate-slide-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-xl hover:bg-slate-100 text-body-grey transition-colors cursor-pointer"
          type="button"
        >
          <X size={18} />
        </button>

        <h3 className="text-[18px] font-bold text-body-action mb-6">Edit Chat Profile</h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Profile Name */}
          <div className="flex flex-col text-left">
            <label className="text-[12px] font-semibold text-body-grey uppercase tracking-wider mb-2">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F4F6F8] pl-4 pr-4 py-2.5 rounded-[12px] text-[13.5px] text-body-black border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-slate-100"
              required
            />
          </div>

          {/* Profile Title */}
          <div className="flex flex-col text-left">
            <label className="text-[12px] font-semibold text-body-grey uppercase tracking-wider mb-2">Job Title / Tag</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F4F6F8] pl-4 pr-4 py-2.5 rounded-[12px] text-[13.5px] text-body-black border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-slate-100"
              required
            />
          </div>

          {/* Quick Preset Avatars */}
          <div className="text-left">
            <label className="text-[11px] font-semibold text-body-grey uppercase tracking-wider mb-2 block">Quick Presets</label>
            <div className="flex gap-3 mt-2">
              {[
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
              ].map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatar(url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${avatar === url ? 'border-primary scale-110 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#E9E9EB]/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-body-grey text-[13px] font-semibold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-[#E07600] text-white text-[13px] font-semibold rounded-xl cursor-pointer shadow-md"
            >
              Save Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
