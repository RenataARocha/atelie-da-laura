import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCkv0VV005zTYtnkigOjB3PACY2v8WujJM",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "atelie-da-laura.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "atelie-da-laura",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "atelie-da-laura.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "81969951358",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:81969951358:web:53ab72bfeb658dc6aede2f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;