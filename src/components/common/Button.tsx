import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  disabled,
  ...props
}) => {
  const hasCustomBg = className.split(' ').some(cls => cls.startsWith('bg-'));
  const hasCustomText = className.split(' ').some(cls => cls.startsWith('text-'));
  const hasCustomPadding = className.split(' ').some(cls => cls.startsWith('py-') || cls.startsWith('p-'));

  const defaultBg = hasCustomBg
    ? ''
    : disabled
      ? 'bg-[#ECEDED] text-slate-400 shadow-none'
      : 'bg-primary';

  const defaultText = hasCustomText ? '' : (disabled ? 'text-slate-400' : 'text-white');
  const defaultPadding = hasCustomPadding ? '' : 'py-3.5';

  return (
    <button
      disabled={disabled}
      className={`
        relative overflow-hidden group font-sans select-none transition-all duration-300
        w-full rounded-lg font-medium text-sm text-center flex items-center justify-center gap-2
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.985]'}
        ${defaultBg}
        ${defaultText}
        ${defaultPadding}
        ${className}
      `}
      {...props}
    >
      {/* Moving Glass Shine Hover Animation */}
      {!disabled && (
        <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-25 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
