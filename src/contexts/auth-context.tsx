
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
  const isFirebaseConfigured = !!auth; // Check if auth object itself is non-null

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.warn("AuthContext: Firebase is not configured (auth instance is null). Authentication features will be disabled.");
      setLoading(false);
      setUser(null); // Explicitly set user to null
      return;
    }

    // Only set up onAuthStateChanged if auth is available (isFirebaseConfigured is true)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isFirebaseConfigured]); // Depend on isFirebaseConfigured

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) { // Double check auth here
      console.error("signInWithGoogle: Firebase is not configured. Cannot sign in.");
      // Optionally, show a toast to the user
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true); // Indicate loading state during sign-in attempt
      await signInWithPopup(auth, provider);
      // Successful sign-in will trigger onAuthStateChanged, which updates user and loading
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false); // Reset loading on error
      // Consider showing a toast message to the user
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured || !auth) { // Double check auth here
      console.error("signOut: Firebase is not configured. Cannot sign out.");
      // Optionally, show a toast to the user
      return;
    }
    try {
      setLoading(true); // Indicate loading state
      await firebaseSignOut(auth);
      // onAuthStateChanged will set user to null.
      // Explicit redirect here ensures user is taken to sign-in page.
      router.push('/auth/signin');
    } catch (error) {
      console.error("Error signing out:", error);
      // Consider showing a toast message to the user
    } finally {
      // setLoading(false) will be handled by onAuthStateChanged setting user to null and loading to false
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
