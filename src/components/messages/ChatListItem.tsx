import React from 'react';
import { CheckCheck } from 'lucide-react';
import type { Contact } from './types';

interface ChatListItemProps {
  contact: Contact;
  isSelected: boolean;
  previewText: string;
  onSelect: (contactId: string) => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  contact,
  isSelected,
  previewText,
  onSelect
}) => {
  return (
    <button
      onClick={() => onSelect(contact.id)}
      className={`
        w-full text-left px-3 py-3.5 my-1 rounded-xl flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer border border-transparent
        ${isSelected 
          ? 'bg-slate-50 border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.015)]' 
          : 'hover:bg-[#F4F6F8]/40'
        }
      `}
      type="button"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar with Status indicator */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          {contact.status === 'online' && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-white rounded-full" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            <h5 className={`text-[14px] font-medium leading-none ${isSelected ? 'text-primary' : 'text-body-black'}`}>
              {contact.name}
            </h5>
            {contact.status === 'online' && (
              <span className="text-[10px] text-[#4CAF50] font-normal font-sans">online</span>
            )}
          </div>
          <p className="text-[12px] text-body-grey truncate mt-1 leading-none font-sans font-normal max-w-[170px]">
            {previewText}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-[10px] text-body-grey font-sans">
          {contact.lastMessageTime}
        </span>
        {contact.unreadCount > 0 ? (
          <span className="bg-primary text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center font-sans">
            {contact.unreadCount}
          </span>
        ) : (
          previewText && previewText !== 'No messages yet' && !previewText.startsWith('📁') && (
            <span className="text-primary/75">
              <CheckCheck size={13} />
            </span>
          )
        )}
      </div>
    </button>
  );
};
