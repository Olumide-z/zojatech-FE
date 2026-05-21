import React from 'react';
import { CheckCheck, FileText, Download } from 'lucide-react';
import type { Message } from './types';

interface MessageBubbleProps {
  msg: Message;
  isMe: boolean;
  contactAvatar: string;
  contactName: string;
  currentUserAvatar: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  msg,
  isMe,
  contactAvatar,
  contactName,
  currentUserAvatar
}) => {
  return (
    <div className={`flex items-start gap-3 ${isMe ? 'justify-end' : 'justify-start'} animate-slide-in`}>

      {/* Bot Avatar on the Left (for incoming) */}
      {!isMe && (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-100 bg-slate-100 shadow-sm">
          <img src={contactAvatar} alt={contactName} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-[70%] flex flex-col">

        {/* Message Text Bubble */}
        {msg.text && (
          <div className={`
            px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm font-sans
            ${isMe
              ? 'bg-[#F1F1F1] text-primary rounded-tr-none font-medium'
              : 'bg-[#F1F1F1] text-[#2E2E2E] rounded-tl-none font-normal'
            }
          `}>
            {msg.text}
          </div>
        )}

        {/* Message PDF Attachment */}
        {msg.attachment && (
          <div className={`
            flex items-center justify-between gap-4 p-3 rounded-2xl border bg-white shadow-sm min-w-[220px] md:min-w-[280px]
            ${isMe ? 'border-[#FF8600]/25 rounded-tr-none' : 'border-[#E9E9EB] rounded-tl-none'}
          `}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                <FileText size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-body-black truncate">{msg.attachment.name}</p>
                <p className="text-[11px] text-body-grey font-sans mt-0.5">{msg.attachment.size}</p>
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-body-grey hover:text-body-black transition-colors cursor-pointer shrink-0"
              type="button"
            >
              <Download size={14} />
            </button>
          </div>
        )}

        {/* Time & Read Status */}
        <div className={`flex items-center gap-1.5 mt-1.5 text-[10px] text-body-grey font-sans ${isMe ? 'justify-end' : 'justify-start'}`}>
          <span>{msg.timestamp}</span>
          {isMe && (
            <span className="text-primary/75">
              <CheckCheck size={12} />
            </span>
          )}
        </div>
      </div>

      {isMe && (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-100 bg-slate-100 shadow-sm">
          <img
            src={currentUserAvatar}
            alt="David"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
            }}
          />
        </div>
      )}

    </div>
  );
};
