import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import InputField from './InputField';
import type { InputFieldProps } from './InputField';

interface PasswordInputProps extends Omit<InputFieldProps, 'type' | 'rightIcon'> {
  showCounter?: boolean;
  maxLength?: number;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  showCounter = true,
  maxLength = 15,
  onChange,
  value = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const currentLength = typeof value === 'string' ? value.length : 0;

  const toggleButton = (
    <button
      type="button"
      onClick={toggleVisibility}
      className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none p-1 cursor-pointer rounded-full flex items-center justify-center"
    >
      {showPassword ? (
        <FaEye size={20} className="w-[20px] h-[20px] shrink-0" />
      ) : (
        <img
          src="/assets/Password eye.svg"
          className="w-[20px] h-[20px] object-contain shrink-0"
          alt="hide password"
        />
      )}
    </button>
  );

  return (
    <div className="relative w-full">
      <InputField
        type={showPassword ? 'text' : 'password'}
        rightIcon={toggleButton}
        onChange={handleTextChange}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      
      {showCounter && (
        <div className="absolute right-1 -bottom-4 text-[11px] font-semibold text-slate-400 select-none">
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
