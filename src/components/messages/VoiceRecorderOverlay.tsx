import React from 'react';
import { Volume2 } from 'lucide-react';

interface VoiceRecorderOverlayProps {
  isRecording: boolean;
  recordingSeconds: number;
  onCancel: () => void;
  onSend: () => void;
}

export const VoiceRecorderOverlay: React.FC<VoiceRecorderOverlayProps> = ({
  isRecording,
  recordingSeconds,
  onCancel,
  onSend
}) => {
  if (!isRecording) return null;

  const formatRecordingTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="absolute bottom-20 left-4 right-4 md:left-6 md:right-6 p-3 bg-primary text-white rounded-2xl shadow-xl flex items-center justify-between z-30 animate-slide-in">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shrink-0" />
        <span className="text-[13px] font-medium font-sans">Recording Audio...</span>
        <span className="text-[13px] bg-white/20 px-2 py-0.5 rounded-lg font-sans font-semibold">
          {formatRecordingTime(recordingSeconds)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {/* Simulated Wave */}
        <span className="w-[3px] h-3 bg-white rounded-full animate-pulse" />
        <span className="w-[3px] h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
        <span className="w-[3px] h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
        <span className="w-[3px] h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        <span className="w-[3px] h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onCancel} 
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-3 py-1.5 text-[12px] font-semibold cursor-pointer"
          type="button"
        >
          Cancel
        </button>
        <button 
          onClick={onSend}
          className="bg-white text-primary rounded-xl px-4 py-1.5 text-[12px] font-semibold hover:bg-orange-50 cursor-pointer shadow-md flex items-center gap-1.5"
          type="button"
        >
          <Volume2 size={13} />
          Send Voice
        </button>
      </div>
    </div>
  );
};
