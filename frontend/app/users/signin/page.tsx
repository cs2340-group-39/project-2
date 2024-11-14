// pages/auth/signin.tsx

import React from 'react';
import AuthForm from '../../../components/AuthForm';

const SignInPage = () => {
  const handleSignIn = (formData: { email: string; password: string }) => {
    console.log('Sign In Data:', formData);
    
  };

  return <AuthForm type="signin" onSubmit={handleSignIn} />;
};

export default SignInPage;
