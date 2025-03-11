
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA4KBmS0x9O5HU6RniSWG5r-HN7YsxecBI",
  authDomain: "students-90cc0.firebaseapp.com",
  projectId: "students-90cc0",
  storageBucket: "students-90cc0.firebasestorage.app",
  messagingSenderId: "932727114698",
  appId: "1:932727114698:web:0e2456f1f9720b4c9e1d33",
  measurementId: "G-6LB5MWJKB5"
};

// Initialize Firebase only once
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If an instance already exists, use that one
  console.log("Firebase already initialized");
}

const auth = getAuth();

// Add admin emails to this list
export const isUserAdmin = (email: string) => {
  const adminEmails = ['admin@eventdekho.com', 'aadarshgolucky@gmail.com'];
  console.log("Checking if user is admin:", email, "Result:", adminEmails.includes(email.toLowerCase()));
  return adminEmails.includes(email.toLowerCase());
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const signIn = (email: string, password: string) => {
  console.log("Attempting to sign in with:", email);
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email: string, password: string) => {
  console.log("Attempting to sign up with:", email);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export { auth };
