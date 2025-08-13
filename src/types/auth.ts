import { User } from 'firebase/auth';

export interface AuthUser extends User {
  role?: 'admin' | 'client';
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'client';
  createdAt: Date;
  updatedAt: Date;
  preferences?: {
    priceRange?: {
      min: number;
      max: number;
    };
    locations?: string[];
    propertyTypes?: string[];
    amenities?: string[];
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role?: 'admin' | 'client') => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  role: 'admin' | 'client';
}
