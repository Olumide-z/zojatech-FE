import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../common/InputField';
import PasswordInput from '../common/PasswordInput';
import Button from '../common/Button';
import Toast from '../common/Toast';
import { useRegister } from '../../hooks/useAuth';
import type { ToastProps } from '../common/Toast';


type ToastItem = Omit<ToastProps, 'onClose'>;


const SignupStep2: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useRegister();

  // Form fields state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Focus states to align First Name & Last Name dynamic margins
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);

  // Form error state
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  // Toast state
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Input icons (using assets folder images)
  const userIcon = (
    <img
      src="/assets/user.svg"
      className="w-[16px] h-[18px] object-contain select-none pointer-events-none"
      alt=""
    />
  );

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

  // Validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    isEmailValid &&
    isPasswordValid;

  const isFirstNameActive = isFirstNameFocused || firstName.trim() !== '';
  const isLastNameActive = isLastNameFocused || lastName.trim() !== '';
  const isAnyNameActive = isFirstNameActive || isLastNameActive;
  const nameMarginClass = isAnyNameActive ? 'mt-8' : 'mt-5';

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const newErrors: typeof errors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!isEmailValid) newErrors.email = 'Please enter a valid email address';
    if (!isPasswordValid)
      newErrors.password =
        'Password must be at least 8 characters and contain both letters and numbers';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Call the register API
    const result = await register({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
    });

    if (result.success) {
      // Store email for the verify page
      localStorage.setItem('auth_user', JSON.stringify({ email: email.trim() }));
      addToast({
        type: 'success',
        title: 'Account created!',
        description: result.message,
      });
      // Navigate to verify page after a short delay so toast is visible
      setTimeout(() => navigate('/verify'), 1200);
    } else {
      addToast({
        type: 'error',
        title: 'Registration failed',
        description: result.message,
      });
    }
  };

  return (
    <>
      {/* Toast stack – fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>

      <form onSubmit={handleSignupSubmit} className="flex flex-col gap-1.5 animate-slide-in">
        <div className="mb-1.5">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-body-action">
            Register your account
          </h2>
          <p className="text-[13px] text-body-light-grey mt-1">
            Proceed to create account and setup your organization
          </p>
        </div>

        {/* First Name & Last Name in responsive row grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
            }}
            onFocus={() => setIsFirstNameFocused(true)}
            onBlur={() => setIsFirstNameFocused(false)}
            error={errors.firstName}
            leftIcon={userIcon}
            placeholder="First Name"
            autoComplete="given-name"
            containerClassName={nameMarginClass}
          />
          <InputField
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
            }}
            onFocus={() => setIsLastNameFocused(true)}
            onBlur={() => setIsLastNameFocused(false)}
            error={errors.lastName}
            leftIcon={userIcon}
            placeholder="Last Name"
            autoComplete="family-name"
            containerClassName={nameMarginClass}
          />
        </div>

        {/* Work email */}
        <InputField
          label="Work email"
          type="email"
          value={email}
          onChange={(e) => {
            const val = e.target.value;
            setEmail(val);
            if (errors.email && (!val || emailRegex.test(val))) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          onBlur={() => {
            if (email && !isEmailValid) {
              setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
            }
          }}
          error={errors.email}
          isValid={isEmailValid}
          leftIcon={emailIcon}
          info="Use your work email for easier organization setup."
          placeholder="Work Email"
          autoComplete="email"
        />

        {/* Password input */}
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            setPassword(val);
            const isValid =
              val.length >= 8 && /[a-zA-Z]/.test(val) && /[0-9]/.test(val);
            if (errors.password && (!val || isValid)) {
              setErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
          onBlur={() => {
            if (password && !isPasswordValid) {
              setErrors((prev) => ({
                ...prev,
                password:
                  'Password must be at least 8 characters and contain both letters and numbers',
              }));
            }
          }}
          error={errors.password}
          leftIcon={lockIcon}
          placeholder="Password"
          autoComplete="new-password"
        />

        {/* Submit Register Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="mt-8"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>

        {/* Terms policy */}
        <p className="text-[13px] text-[#84919A] leading-relaxed mt-6 max-w-[367px] select-text">
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
      </form>
    </>
  );
};

export default SignupStep2;
