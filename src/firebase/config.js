import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
// For development, you can use these test values or replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCiuvmF25_b95J0H-CP7676nmpooQ74CU",
  authDomain: "sanjeevani-rural-med.firebaseapp.com",
  projectId: "sanjeevani-rural-med",
  storageBucket: "sanjeevani-rural-med.firebasestorage.app",
  messagingSenderId: "297855578859",
  appId: "1:297855578859:web:78eca8cb6e7801721bc4ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 