// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import Firestore functions
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiTLsjbj2Ba3kw8JBGKxxXw_NK6rU9m5k",
  authDomain: "studyzone-3b8dd.firebaseapp.com",
  projectId: "studyzone-3b8dd",
  storageBucket: "studyzone-3b8dd.firebasestorage.app",
  messagingSenderId: "166645360860",
  appId: "1:166645360860:web:c171244748ececdd37ec19",
  measurementId: "G-39MMQ038BM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
  const q = query(
    collection(db, "ratings"),
    where("collegeId", "==", collegeId),
    where("classCode", "==", classCode)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

export { auth, googleProvider, submitRating, getRatings };
export default app;

