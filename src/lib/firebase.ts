
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
let authInstance: Auth | null = null; // Use Auth type from firebase/auth

if (typeof window !== 'undefined') {
  // This block runs only on the client-side
  console.log("Firebase Config Being Used (client-side):", {
    apiKey: firebaseConfig.apiKey ? '********' : undefined, // Don't log actual key
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
  });

  if (!firebaseConfig.apiKey) {
    console.error("CRITICAL Firebase Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing or undefined. Firebase will not be initialized. Please check your .env.local file in the project root and ensure it's correctly formatted and that you've restarted the development server.");
  } else {
    // Proceed with initialization only if API key is present
    if (!getApps().length) {
      try {
        app = initializeApp(firebaseConfig);
        console.log("Firebase App initialized successfully.");
      } catch (e) {
        console.error("Error initializing Firebase App:", e);
        // app will remain undefined
      }
    } else {
      app = getApp();
      console.log("Firebase App instance retrieved.");
    }

    if (app) {
      try {
        authInstance = getAuth(app);
        console.log("Firebase Auth instance retrieved successfully.");
      } catch (e) {
        console.error("Error getting Firebase Auth instance:", e);
        // authInstance will remain null
      }
    } else {
      console.error("Firebase App was not initialized (likely due to missing API key or other config issue), so Firebase Auth cannot be initialized.");
    }
  }
}

const auth = authInstance; 

export { app, auth };
