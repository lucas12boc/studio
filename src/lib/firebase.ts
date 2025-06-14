
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// IMPORTANT: Replace with your actual Firebase project configuration
// These should be stored in your .env.local file (e.g., .env.local)
// Example .env.local content:
// NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
// NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abc123def456"

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log the config to help debug.
// Make sure to check your browser console after restarting the dev server.
if (typeof window !== 'undefined') { // Log only on the client-side
    console.log("Firebase Config Being Used:", firebaseConfig);

    if (!firebaseConfig.apiKey) {
        console.error("Firebase Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing or undefined. Please check your .env.local file and restart the development server.");
    }
}


// Initialize Firebase
let app;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("Error initializing Firebase App. Check your firebaseConfig object and .env.local variables.", e);
    // You might want to throw the error or handle it in a way that your app can gracefully degrade
    throw e;
  }
} else {
  app = getApp();
}

let authInstance = null;
try {
  authInstance = getAuth(app);
} catch (e) {
    console.error("Error getting Firebase Auth instance. This usually follows an app initialization error or if Firebase app is not correctly initialized.", e);
    // Depending on your app's needs, you might set authInstance to a specific error state
    // or allow it to be null and handle that in your AuthContext.
}

const auth = authInstance;

export { app, auth };
