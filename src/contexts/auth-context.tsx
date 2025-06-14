
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // This might be null if Firebase isn't configured
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isFirebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.warn("AuthContext: Firebase is not configured. Authentication features will be disabled.");
      setLoading(false);
      setUser(null);
      return;
    }

    // Only set up onAuthStateChanged if auth is available
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isFirebaseConfigured]);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      console.error("signInWithGoogle: Firebase is not configured. Cannot sign in.");
      // Optionally, show a toast to the user
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Successful sign-in will trigger onAuthStateChanged
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Consider showing a toast message to the user
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured || !auth) {
      console.error("signOut: Firebase is not configured. Cannot sign out.");
      // Optionally, show a toast to the user
      return;
    }
    try {
      await firebaseSignOut(auth);
      router.push('/auth/signin'); 
    } catch (error) {
      console.error("Error signing out:", error);
      // Consider showing a toast message to the user
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, isFirebaseConfigured }}>
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
