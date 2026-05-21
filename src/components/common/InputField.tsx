import React, { useState } from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  isValid?: boolean;
  info?: string;
  placeholder?: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  leftIcon,
  rightIcon,
  error,
  isValid,
  info,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  value,
  containerClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const hasValue = value !== undefined && value !== null && value !== '';

  const hasCustomMargin = containerClassName.split(' ').some(cls => cls.startsWith('mt-'));
  const marginClass = hasCustomMargin ? '' : (isFocused || hasValue ? 'mt-8' : 'mt-5');

  return (
    <div className={`relative flex flex-col w-full transition-all duration-200 ease-out ${marginClass} ${containerClassName}`}>
      {/* Top Floating Label Wrapper */}
      <div className="relative w-full">
        {/* Label displaying and animating */}
        <label
          className={`absolute pointer-events-none transition-all duration-200 flex items-center gap-1.5 font-sans select-none
            ${isFocused || hasValue
              ? '-top-6 left-0 text-[13px] font-semibold text-slate-500 scale-100 opacity-100'
              : 'top-[14px] left-10 text-[15px] font-medium text-slate-400 scale-100 opacity-100'
            }
          `}
        >
          {label}
          {info && (isFocused || hasValue) && (
            <span className="group relative inline-flex items-center text-slate-400 cursor-help">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {/* Tooltip */}
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-[#1E293B] text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-md whitespace-nowrap z-50">
                {info}
              </span>
            </span>
          )}
        </label>

        {/* Input container */}
        <div className="relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={`absolute left-3.5 transition-colors duration-200 flex items-center justify-center pointer-events-none
                ${error ? 'text-red-400' : isFocused ? 'text-orange-500' : 'text-slate-400'}
              `}
            >
              {leftIcon}
            </div>
          )}

          {/* Input element */}
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={`w-full h-[40px] py-2 rounded-lg border text-[16px] placeholder:text-sm text-[#5B6871] bg-white transition-all duration-200 focus:outline-none focus:ring-0
              ${leftIcon ? 'pl-[42px]' : 'pl-4'}
              ${rightIcon || isValid ? 'pr-11' : 'pr-4'}
              ${error
                ? 'border-red-500 shadow-sm shadow-red-100'
                : isFocused
                  ? 'border-orange-500 ring-1.5 ring-orange-500'
                  : 'border-[#DDE2E4] hover:border-[#94A3B8]'
              }
            `}
            {...props}
          />

          {/* Validation/Right Icons */}
          {(isValid || rightIcon) && (
            <div className="absolute right-3.5 flex items-center justify-center">
              {isValid && !error ? (
                <div className="text-emerald-500 animate-fade-in flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className={`${error ? 'text-red-400' : 'text-slate-400'}`}>
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Helper Error Message */}
      {error && (
        <span className="text-xs text-red-500 font-semibold mt-1.5 pl-1.5 animate-slide-down">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
