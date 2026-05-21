import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { IoMdMail } from 'react-icons/io';

interface SignupStep1Props {
  onNext: () => void;
}

const SignupStep1: React.FC<SignupStep1Props> = ({ onNext }) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <h2 className="text-[20px] sm:text-[24px] font-semibold text-body-action">
        Register your account
      </h2>

      {/* Email Signup Option */}
      <Button
        onClick={onNext}
        className="border border-[#DDE2E4] hover:border-[#DDE2E4] hover:bg-slate-50/60 text-body-light-grey text-sm font-normal bg-white"
      >
        <IoMdMail />

        <span>Sign up with email</span>
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 select-none">
        <div className="h-[1px] bg-[#DDE2E4] flex-1"></div>
        <span className="text-[14px] font-medium text-[#5B6871] tracking-wider">or</span>
        <div className="h-[1px] bg-[#DDE2E4] flex-1"></div>
      </div>

      {/* Google Signup */}
      <Button
        onClick={() => alert('Social Google Sign-up Triggered!')}
        className="border border-[#DDE2E4] hover:border-slate-300 hover:bg-slate-50/60 text-body-light-grey font-normal text-sm bg-white"
      >
        <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
        <span>Sign up with Google</span>
      </Button>

      {/* Terms policy */}
      <p className="text-[13px] text-[#84919A] leading-relaxed mt-6 max-w-[367px]">
        By clicking the button above, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      {/* Back to login link */}
      <div className="mt-6">
        <span className="text-[14px] text-[#84919A]">Already have an account? </span>
        <Link to="/login" className="text-[14px] text-primary hover:underline select-none">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupStep1;
