import React, { useState, useRef, useEffect } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import Button from '@/components/common/Button';
import SuccessState from '@/components/common/SuccessState';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/common/Toast';
import type { ToastProps } from '@/components/common/Toast';
import { useVerifyOtp, useResendToken } from '@/hooks/useAuth';

const Verify: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { verifyOtp, isLoading: isVerifying } = useVerifyOtp();
  const { resendToken, isLoading: isResending } = useResendToken();
  // Toasts
  type ToastItem = Omit<ToastProps, 'onClose'>;
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [verified, setVerified] = useState(false);
  // Input refs for automatic focus shifting
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } 
  }, []);

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Capture only the last digit typed
    const digit = cleanValue[cleanValue.length - 1];

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move focus back if current field is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs[index - 1].current?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const numbersOnly = pastedData.replace(/[^0-9]/g, '');

    if (numbersOnly.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        if (i < numbersOnly.length) {
          newOtp[i] = numbersOnly[i];
        }
      }
      setOtp(newOtp);

      // Focus the last filled box
      const focusIndex = Math.min(numbersOnly.length - 1, 3);
      inputRefs[focusIndex].current?.focus();
    }
  };

  const isFormValid = otp.every((val) => val.trim().length === 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const fullCode = otp.join('');

    (async () => {
      const res = await verifyOtp({ otp: fullCode });

      if (res.success) {
        localStorage.setItem('auth_verified', 'true');
        addToast({ type: 'success', title: 'Verification successful', description: res.message });
        setVerified(true);
      } else {
        addToast({ type: 'error', title: 'Verification failed', description: res.message });
      }
    })();
  };

  const handleResend = () => {
    (async () => {
      const res = await resendToken({ email });

      if (res.success) {
        addToast({ type: 'success', title: 'OTP resent', description: res.message });
      } else {
        addToast({ type: 'error', title: 'Resend failed', description: res.message });
      }
    })();
  };

  return (
    <AuthLayout maxWidth="445px">
      {/* Toast stack – fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 font-sans animate-fade-in">
        <div className="mb-4">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-body-action">
            Verify your email
          </h2>
          <p className="text-[13px] text-body-light-grey mt-1">
            A four digit OTP code has been sent to your email
          </p>
          <p className="text-[13px] text-primary font-medium hover:underline mt-0.5 cursor-pointer inline-block select-text" onClick={handleResend}>
            {email}
          </p>
        </div>

        {/* 4 Digit OTP Inputs */}
        <div className="flex gap-4 mt-4 select-none justify-start">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-center text-[24px] font-bold text-[#5B6871] rounded-[10px] border-[2px] border-[#FF8600]/40 hover:border-[#FF8600]/70 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
            />
          ))}
        </div>

        {/* Submit Confirm Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isVerifying}
          isLoading={isVerifying}
          className="mt-6 w-fit! px-12 py-3.5"
        >
          Confirm code
        </Button>

        {/* Resend Footer */}
        <div className="mt-8 text-[14px]">
          <span className="text-body-light-grey">Didn't get the mail? </span>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-primary font-medium hover:underline cursor-pointer focus:outline-none"
          >
            Resend
          </button>
        </div>

      </form>

      {verified && (
        <SuccessState
          title="Email verified !"
          description="The verified email address will be associated with your account. Click on the button below to continue"
          imageSrc="/assets/verify-success.svg"
          onClickEvent={() => navigate('/portfolio')}
        />
      )}
    </AuthLayout>
  );
};

export default Verify;
