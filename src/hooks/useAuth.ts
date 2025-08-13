import { useState } from 'react';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { SignInFormData, SignUpFormData } from '@/types/auth';

export const useAuth = () => {
  return useAuthContext();
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthContext();

  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn: handleSignIn,
    loading,
  };
};

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthContext();

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data.displayName, data.role);
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp: handleSignUp,
    loading,
  };
};

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuthContext();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle: handleGoogleSignIn,
    loading,
  };
};

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuthContext();

  const handlePasswordReset = async (email: string) => {
    setLoading(true);
    try {
      await resetPassword(email);
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPassword: handlePasswordReset,
    loading,
  };
};
