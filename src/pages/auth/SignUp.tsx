import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';

import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, useGoogleSignIn } from '@/hooks/useAuth';
import { SignUpFormData } from '@/types/auth';

const signUpSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['client', 'admin'], {
    required_error: 'Please select your account type',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { signInWithGoogle, loading: googleLoading } = useGoogleSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'client',
    },
  });

  const watchedRole = watch('role');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      await signUp(data.email, data.password, data.displayName, data.role);
      navigate('/dashboard/' + data.role);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard/client'); // Default to client dashboard for Google sign-in
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <AuthLayout
      title="Join LuxeView Elite"
      subtitle="Create your account to access exclusive properties"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-text-primary font-body">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/50 w-4 h-4" />
            <Input
              id="displayName"
              type="text"
              placeholder="Enter your full name"
              className="pl-10 bg-primary/50 border-accent/30 text-text-primary placeholder:text-text-primary/50 focus:border-accent"
              {...register('displayName')}
            />
          </div>
          {errors.displayName && (
            <p className="text-destructive text-sm font-body">
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-text-primary font-body">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/50 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 bg-primary/50 border-accent/30 text-text-primary placeholder:text-text-primary/50 focus:border-accent"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm font-body">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Account Type */}
        <div className="space-y-3">
          <Label className="text-text-primary font-body">Account Type</Label>
          <RadioGroup
            value={watchedRole}
            onValueChange={(value) => setValue('role', value as 'client' | 'admin')}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 border border-accent/30 rounded-lg p-3 hover:border-accent/50 transition-colors">
              <RadioGroupItem value="client" id="client" className="border-accent text-accent" />
              <Label htmlFor="client" className="text-text-primary font-body cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Client</p>
                  <p className="text-xs text-text-primary/70">Browse and inquire about properties</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-accent/30 rounded-lg p-3 hover:border-accent/50 transition-colors">
              <RadioGroupItem value="admin" id="admin" className="border-accent text-accent" />
              <Label htmlFor="admin" className="text-text-primary font-body cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Agent</p>
                  <p className="text-xs text-text-primary/70">Manage properties and clients</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          {errors.role && (
            <p className="text-destructive text-sm font-body">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-text-primary font-body">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/50 w-4 h-4" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="pl-10 pr-10 bg-primary/50 border-accent/30 text-text-primary placeholder:text-text-primary/50 focus:border-accent"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-primary/50 hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm font-body">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-text-primary font-body">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/50 w-4 h-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="pl-10 pr-10 bg-primary/50 border-accent/30 text-text-primary placeholder:text-text-primary/50 focus:border-accent"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-primary/50 hover:text-text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-sm font-body">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-primary font-body tracking-wide"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <Separator className="bg-accent/20" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary px-3 text-text-primary/50 text-sm font-body">
            or
          </span>
        </div>

        {/* Google Sign Up */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full border-accent/30 text-text-primary hover:bg-accent/10 font-body tracking-wide"
        >
          {googleLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing Up...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-text-primary/70 text-sm font-body">
            Already have an account?{' '}
            <Link
              to="/auth/signin"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
