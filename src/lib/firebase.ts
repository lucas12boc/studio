
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth'; // Explicitly import Auth type

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: ReturnType<typeof initializeApp> | undefined = undefined;
let authInstance: Auth | null = null;

if (typeof window !== 'undefined') {
  // This block runs only on the client-side
  if (!firebaseConfig.apiKey) {
    console.error("CRITICAL Firebase Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing or undefined. Firebase will not be initialized. Please check your .env.local file in the project root and ensure it's correctly formatted and that you've restarted the development server.");
  } else if (!firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    // Check for other essential Firebase config values
    console.error("CRITICAL Firebase Error: One or more essential Firebase config values (authDomain, projectId, appId) are missing or undefined. Firebase will not be initialized correctly. Please check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set.");
  } else {
    // Proceed with initialization only if essential keys are present
    if (!getApps().length) {
      try {
        app = initializeApp(firebaseConfig);
      } catch (e) {
        console.error("Error initializing Firebase App:", e);
        app = undefined; // Ensure app is undefined on error
      }
    } else {
      app = getApp();
    }

    if (app) {
      try {
        authInstance = getAuth(app);
      } catch (e) {
        console.error("Error getting Firebase Auth instance:", e);
        authInstance = null; // Ensure authInstance is null on error
      }
    }
  }
}

const auth = authInstance;

export { app, auth };
