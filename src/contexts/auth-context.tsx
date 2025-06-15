
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type AuthError,
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; // auth can be null if Firebase isn't configured
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmailPassword: (email: string, pass: string) => Promise<User | AuthError>;
  signInWithEmailPassword: (email: string, pass: string) => Promise<User | AuthError>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      setUser(null);
      // console.log("AuthProvider: Firebase not configured on mount, auth disabled.");
      return () => {};
    }

    // console.log("AuthProvider: Setting up onAuthStateChanged listener.");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("AuthProvider: onAuthStateChanged triggered. New user:", currentUser ? currentUser.uid : null);
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      // console.error("AuthProvider: Error in onAuthStateChanged listener:", error);
      setUser(null);
      setLoading(false);
    });
    return () => {
      // console.log("AuthProvider: Cleaning up onAuthStateChanged listener.");
      unsubscribe();
    }
  }, [isFirebaseConfigured]);

  const signInWithGoogle = async () => {
    if (typeof window !== 'undefined') {
      console.log("AuthContext: Attempting Google Sign-In from hostname:", window.location.hostname);
    }
    if (!isFirebaseConfigured || !auth) {
      console.error("AuthContext: signInWithGoogle - Firebase is not configured.");
      setLoading(false); // Ensure loading is false if we bail early
      throw new Error("Firebase no está configurado. Revisa tus variables de entorno y la configuración del proyecto.");
    }
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      // Successful sign-in will trigger onAuthStateChanged
      // setLoading(false); // onAuthStateChanged will handle this
    } catch (error) {
      console.error("AuthContext: Full error during signInWithPopup:", error); // Log the full error object
      setLoading(false);
      throw error; // Rethrow the error so the component can catch it
    }
  };

  const signUpWithEmailPassword = async (email: string, pass: string): Promise<User | AuthError> => {
    if (!isFirebaseConfigured || !auth) {
      console.error("AuthContext: signUpWithEmailPassword - Firebase is not configured.");
      setLoading(false);
      const authError: AuthError = { code: "auth/internal-error", message:"Firebase no está configurado.", name: "FirebaseError" };
      return authError;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      // setLoading(false); // onAuthStateChanged will handle this
      return userCredential.user;
    } catch (error) {
      console.error("AuthContext: Error during signUpWithEmailPassword:", error);
      setLoading(false);
      return error as AuthError;
    }
  };

  const signInWithEmailPassword = async (email: string, pass: string): Promise<User | AuthError> => {
    if (!isFirebaseConfigured || !auth) {
      console.error("AuthContext: signInWithEmailPassword - Firebase is not configured.");
      setLoading(false);
      const authError: AuthError = { code: "auth/internal-error", message:"Firebase no está configurado.", name: "FirebaseError" };
      return authError;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      // setLoading(false); // onAuthStateChanged will handle this
      return userCredential.user;
    } catch (error) {
      console.error("AuthContext: Error during signInWithEmailPassword:", error);
      setLoading(false);
      return error as AuthError;
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured || !auth) {
      // console.log("AuthContext: signOut - Firebase not configured. Clearing user locally.");
      setUser(null);
      setLoading(false); // Ensure loading state is updated
      router.push('/auth/signin'); // Redirect to sign-in
      return;
    }
    try {
      setLoading(true);
      // console.log("AuthContext: Signing out from Firebase...");
      await firebaseSignOut(auth);
      // setUser(null); // onAuthStateChanged will handle this
      // setLoading(false); // onAuthStateChanged will handle this
      router.push('/auth/signin'); // Redirect after successful Firebase sign-out
    } catch (error) {
      console.error("AuthContext: Error during signOut:", error);
      setLoading(false); // Ensure loading state is updated on error
      // Optionally, still try to clear local user state and redirect
      setUser(null);
      router.push('/auth/signin');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, isFirebaseConfigured, signUpWithEmailPassword, signInWithEmailPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
