import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import InputField from '../components/common/InputField';
import PasswordInput from '../components/common/PasswordInput';
import Button from '../components/common/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const emailIcon = (
    <img
      src="/assets/Mail.svg"
      className="w-[20px] h-[20px] object-contain select-none pointer-events-none"
      alt=""
    />
  );

  const lockIcon = (
    <img
      src="/assets/Password.svg"
      className="w-[20px] h-[20px] object-contain select-none pointer-events-none"
      alt=""
    />
  );

  const isEmailValid = email.includes('@') && email.includes('.');
  const isFormValid = isEmailValid && password.length >= 6;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!isEmailValid) newErrors.email = 'Please enter a valid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Logging in with ${email}...`);
      // Update local storage to simulate logging in
      localStorage.setItem('auth_token', 'dummy_secure_token');
      localStorage.setItem('auth_user', JSON.stringify({ email, name: email.split('@')[0] }));
      window.location.href = '/dashboard';
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-1.5 font-sans">
        <div className="mb-4">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-body-action tracking-tight">
            Login to your account
          </h2>
          <p className="text-[13px] text-body-light-grey mt-1 select-text">
            Securely log into your Buddy portal
          </p>
        </div>

        {/* Email */}
        <InputField
          label="Work email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          isValid={isEmailValid}
          leftIcon={emailIcon}
          placeholder=""
          autoComplete="email"
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          leftIcon={lockIcon}
          showCounter={false}
          placeholder=""
          autoComplete="current-password"
        />

        {/* Remember & Forgot Password Link */}
        <div className="flex justify-end mt-4 select-none">
          <a href="#" className="text-xs text-primary font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Login Button */}
        <Button
          type="submit"
          disabled={!isFormValid}
          className="mt-4"
        >
          Login
        </Button>

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

        {/* Links to Signup */}
        <div className="text-left md:mt-12 mt-8">
          <span className="text-[14px] text-[#84919A]">Don&apos;t have an account? </span>
          <Link to="/signup" className="text-[14px] text-primary hover:underline select-none">
            Sign Up
          </Link>
        </div>
      </form>
    </AuthLayout >
  );
};

export default Login;
