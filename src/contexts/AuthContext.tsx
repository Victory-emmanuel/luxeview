import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  signUpWithEmailAndPassword,
  signInWithEmail,
  signInWithGoogle as googleSignIn,
  signOut as authSignOut,
  resetPassword as authResetPassword,
  getUserProfile,
  updateUserProfile,
} from "@/lib/auth";
import { AuthContextType, AuthUser, UserProfile } from "@/types/auth";
import { toast } from "@/components/ui/sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);

        const authUser: AuthUser = {
          ...firebaseUser,
          role: profile?.role || "client",
        };

        setUser(authUser);
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign in with email:", email);
      console.log("Firebase config:", {
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        emulatorEnabled: import.meta.env.VITE_USE_FIREBASE_EMULATOR,
      });
      await signInWithEmail(email, password);
      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error("Sign in error:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
      });

      // Provide more user-friendly error messages
      let errorMessage = "Failed to sign in";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage =
          "Network error. Make sure you're not using Firebase emulators.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage =
          "Email/password authentication is not enabled in Firebase Console.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    role: "admin" | "client" = "client"
  ) => {
    try {
      setLoading(true);
      console.log(
        "Attempting to create account for:",
        email,
        "with role:",
        role
      );
      await signUpWithEmailAndPassword(email, password, displayName, role);
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.error("Sign up error:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
      });

      // Provide more user-friendly error messages
      let errorMessage = "Failed to create account";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use at least 6 characters";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage =
          "Network error. Make sure you're not using Firebase emulators.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Account creation is not enabled in Firebase Console.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      toast.success("Successfully signed in with Google!");
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authSignOut();
      toast.success("Successfully signed out!");
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error(error.message || "Failed to sign out");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authResetPassword(email);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Failed to send password reset email");
      throw error;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error("No user logged in");

    try {
      await updateUserProfile(user.uid, data);

      // Update local state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...data });
      }

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
