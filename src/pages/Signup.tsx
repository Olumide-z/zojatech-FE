import React, { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignupStep1 from '../components/auth/SignupStep1';
import SignupStep2 from '../components/auth/SignupStep2';

const Signup: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <AuthLayout>
      {step === 1 ? (
        <SignupStep1 onNext={() => setStep(2)} />
      ) : (
        <SignupStep2 />
      )}
    </AuthLayout>
  );
};

export default Signup;
