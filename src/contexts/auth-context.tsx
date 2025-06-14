
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
    // console.log("AuthContext: isFirebaseConfigured =", isFirebaseConfigured, "Auth instance:", auth);
    if (!isFirebaseConfigured || !auth) { 
      // console.warn("AuthContext: Firebase is not configured (auth instance is null). Authentication features will be disabled.");
      setLoading(false);
      setUser(null);
      return () => {}; 
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("AuthContext: onAuthStateChanged triggered. User:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isFirebaseConfigured]); 

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      // console.error("AuthContext: signInWithGoogle - Firebase is not configured.");
      setLoading(false); 
      throw new Error("Firebase no está configurado. Revisa tus variables de entorno (.env.local) y reinicia el servidor.");
    }
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      // Successful sign-in will trigger onAuthStateChanged, which updates user and loading state
    } catch (error) {
      // console.error("AuthContext: Error signing in with Google:", error);
      setLoading(false);
      throw error; 
    }
  };

  const signUpWithEmailPassword = async (email: string, pass: string): Promise<User | AuthError> => {
    if (!isFirebaseConfigured || !auth) {
      // console.error("AuthContext: signUpWithEmailPassword - Firebase is not configured.");
      setLoading(false);
      const authError: AuthError = { code: "auth/internal-error", message:"Firebase no está configurado.", name: "FirebaseError" };
      return authError;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      // Successful sign-up will trigger onAuthStateChanged
      return userCredential.user;
    } catch (error) {
      // console.error("AuthContext: Error signing up with email and password:", error);
      setLoading(false);
      return error as AuthError;
    }
  };

  const signInWithEmailPassword = async (email: string, pass: string): Promise<User | AuthError> => {
    if (!isFirebaseConfigured || !auth) {
      // console.error("AuthContext: signInWithEmailPassword - Firebase is not configured.");
      setLoading(false);
      const authError: AuthError = { code: "auth/internal-error", message:"Firebase no está configurado.", name: "FirebaseError" };
      return authError;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      // Successful sign-in will trigger onAuthStateChanged
      return userCredential.user;
    } catch (error) {
      // console.error("AuthContext: Error signing in with email and password:", error);
      setLoading(false);
      return error as AuthError;
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured || !auth) {
      // console.error("AuthContext: signOut - Firebase is not configured.");
      setUser(null); 
      setLoading(false);
      router.push('/auth/signin'); 
      return;
    }
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      // onAuthStateChanged will set user to null
      router.push('/auth/signin');
    } catch (error) {
      // console.error("AuthContext: Error signing out:", error);
      setLoading(false); 
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
