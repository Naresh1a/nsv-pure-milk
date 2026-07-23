import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

// Firebase Configuration from Environment Variables (or fallback config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCyFSepebbaFjV7_vhrOccerIgCL9CEWYA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "nsv-pure-milk.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "nsv-pure-milk",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "nsv-pure-milk.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "6111881731",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:6111881731:web:8721e0b8e78ba17260fc36",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5317FN6Y8G",
};

// Initialize Firebase App (Singleton Pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

/**
 * Setup reCAPTCHA Verifier for Firebase Phone Authentication
 */
export function setupRecaptcha(containerId: string): RecaptchaVerifier | null {
  if (typeof window === "undefined") return null;

  try {
    // Clear existing container content if any
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = "";
    }

    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved automatically
      },
      "expired-callback": () => {
        console.warn("reCAPTCHA expired, please try again.");
      },
    });

    return recaptchaVerifier;
  } catch (err) {
    console.error("Error setting up Firebase reCAPTCHA:", err);
    return null;
  }
}

/**
 * Send Phone OTP via Firebase Auth
 */
export async function sendFirebasePhoneOtp(
  phoneNumberFormatted: string, // e.g. "+919876543210"
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult | null> {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumberFormatted,
      recaptchaVerifier
    );
    return confirmationResult;
  } catch (error: any) {
    console.warn("Firebase Phone Auth Notice:", error?.message || error);
    return null;
  }
}
