import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
// Import Firestore functions
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log("FIREBASE KEY:", process.env.REACT_APP_FIREBASE_API_KEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics but we don't use it directly
getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

// Submit a new rating
const submitRating = async (collegeId, classCode, userId, rating, comment) => {
  const ratingRef = doc(collection(db, "ratings"));
  await setDoc(ratingRef, {
    collegeId,
    classCode,
    userId,
    rating,
    comment,
    timestamp: new Date()
  });
};

// Get all ratings for a class
const getRatings = async (collegeId, classCode) => {
  const baseQuery = [
    where("collegeId", "==", collegeId)
  ];

  if (classCode) {
    baseQuery.push(where("classCode", "==", classCode));
  }

  const q = query(collection(db, "ratings"), ...baseQuery);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
export { auth, googleProvider, submitRating, getRatings };
export default app;

