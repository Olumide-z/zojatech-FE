import React from 'react';
import { FileText, Camera } from 'lucide-react';

interface AttachmentDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAttachment?: (fileName: string, type: 'pdf' | 'image' | 'doc', size: string) => void;
}

export const AttachmentDropdown: React.FC<AttachmentDropdownProps> = ({
  isOpen,
  onClose,
  onSelectAttachment
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-20 left-4 md:left-6 p-4 bg-white border border-[#E9E9EB] rounded-2xl shadow-xl flex flex-col gap-2 z-30 animate-slide-in min-w-[200px]">
      <h5 className="text-[12px] font-semibold text-body-grey uppercase tracking-wide border-b pb-1">Upload Simulated File</h5>
      <button
        onClick={() => onSelectAttachment?.('q4_status_report.pdf', 'pdf', '1.8 MB')}
        className="w-full text-left px-2.5 py-2 hover:bg-slate-50 rounded-lg text-[13px] text-body-black flex items-center gap-2 cursor-pointer font-sans"
        type="button"
      >
        <FileText size={15} className="text-red-500" />
        q4_status_report.pdf (1.8MB)
      </button>
      <button
        onClick={() => onSelectAttachment?.('dashboard_wireframes.zip', 'doc', '14.2 MB')}
        className="w-full text-left px-2.5 py-2 hover:bg-slate-50 rounded-lg text-[13px] text-body-black flex items-center gap-2 cursor-pointer font-sans"
        type="button"
      >
        <FileText size={15} className="text-amber-500" />
        dashboard_wireframes.zip (14MB)
      </button>
      <button
        onClick={() => onSelectAttachment?.('screenshot_landing.png', 'image', '850 KB')}
        className="w-full text-left px-2.5 py-2 hover:bg-slate-50 rounded-lg text-[13px] text-body-black flex items-center gap-2 cursor-pointer font-sans"
        type="button"
      >
        <Camera size={15} className="text-blue-500" />
        screenshot_landing.png (850KB)
      </button>
      <div className="border-t pt-1 flex justify-end">
        <button
          onClick={onClose}
          className="text-[11px] text-body-grey hover:text-body-black px-2 py-1 font-semibold"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
