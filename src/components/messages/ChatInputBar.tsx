import React from 'react';
import { Mic, Paperclip, Camera, Smile, Send, X } from 'lucide-react';

interface ChatInputBarProps {
  inputText: string;
  onChangeText: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onToggleAttachment: () => void;
  onToggleEmojiPicker: () => void;
  showEmojiPicker: boolean;
  onEmojiClick: (emoji: string) => void;
  onSendMockPhoto?: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  inputText,
  onChangeText,
  onSubmit,
  isRecording,
  onToggleRecording,
  onToggleAttachment,
  onToggleEmojiPicker,
  showEmojiPicker,
  onEmojiClick,
  onSendMockPhoto
}) => {
  const QUICK_EMOJIS = ['👍', '❤️', '🔥', '🎉', '😀', '🙏', '💯', '🚀'];

  return (
    <div className="p-4 md:p-6 bg-white border-t border-[#E9E9EB]/80 shrink-0 relative font-lexend">

      {/* Quick Reply Toolbar (Emojis list) */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 right-4 md:left-6 md:right-6 p-2 bg-white border border-[#E9E9EB] rounded-2xl shadow-xl flex items-center gap-3 z-30 animate-slide-in justify-around">
          <span className="text-[11px] font-semibold text-body-grey font-sans tracking-wide uppercase px-2 select-none">Quick Reaction:</span>
          <div className="flex gap-2">
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onEmojiClick(emoji)}
                className="text-[20px] p-1.5 hover:bg-slate-50 hover:scale-125 transition-all rounded-xl cursor-pointer"
                type="button"
              >
                {emoji}
              </button>
            ))}
          </div>
          <button
            onClick={onToggleEmojiPicker}
            className="text-body-grey hover:text-body-black p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
            type="button"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3"
      >
        <div className="flex-1 bg-[#F4F6F8]/80 hover:bg-[#F4F6F8] border-0 rounded-[30px] flex items-center px-4 py-2 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.015)]">

          {/* Voice Record Toggle */}
          <button
            type="button"
            onClick={onToggleRecording}
            className={`p-1.5 rounded-full text-body-grey hover:text-primary transition-all duration-200 cursor-pointer mr-2 shrink-0 ${isRecording ? 'text-primary scale-125 bg-primary/10' : ''}`}
            title="Voice Message"
          >
            <Mic size={18} />
          </button>

          {/* Input Text Box */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Write Something..."
            className="flex-1 bg-transparent text-base text-body-black placeholder-[#818187] focus:outline-none py-1.5 font-sans"
            disabled={isRecording}
          />

          {/* Action tool attachments */}
          <div className="flex items-center gap-1 ml-2 shrink-0">
            <button
              type="button"
              onClick={onToggleAttachment}
              className="p-1.5 rounded-full text-body-grey hover:text-primary transition-colors cursor-pointer"
              title="Send Attachment"
            >
              <Paperclip size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 sm:block hidden rounded-full text-body-grey hover:text-primary transition-colors cursor-pointer"
              title="Send Photo"
              onClick={onSendMockPhoto}
            >
              <Camera size={16} />
            </button>
            <button
              type="button"
              onClick={onToggleEmojiPicker}
              className={`p-1.5 sm:block hidden rounded-full text-body-grey hover:text-primary transition-colors cursor-pointer ${showEmojiPicker ? 'text-primary' : ''}`}
              title="Emojis"
            >
              <Smile size={16} />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary hover:bg-[#E07600] active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-pointer shrink-0"
          title="Send Message"
        >
          <Send size={18} className="translate-x-[1px] -translate-y-[1px]" />
        </button>
      </form>
    </div>
  );
};
