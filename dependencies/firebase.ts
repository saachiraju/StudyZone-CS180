import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";

// Define the type for a rating
export type RatingEntry = {
  collegeId: string;
  classCode: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp?: any;
};

const firebaseConfig = {
  apiKey: "AIzaSyBiTLsjbj2Ba3kw8JBGKxxXw_NK6rU9m5k",
  authDomain: "studyzone-3b8dd.firebaseapp.com",
  projectId: "studyzone-3b8dd",
  storageBucket: "studyzone-3b8dd.firebasestorage.app",
  messagingSenderId: "166645360860",
  appId: "1:166645360860:web:c171244748ececdd37ec19",
  measurementId: "G-39MMQ038BM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Submit a new rating
const submitRating = async (
  collegeId: string,
  classCode: string,
  userId: string,
  rating: number,
  comment: string
): Promise<void> => {
  const ratingRef = doc(collection(db, "ratings"));
  await setDoc(ratingRef, {
    collegeId,
    classCode,
    userId,
    rating,
    comment,
    timestamp: serverTimestamp(),
  });
};

// Get all ratings for a class
const getRatings = async (
  collegeId: string,
  classCode?: string // Make classCode optional
): Promise<RatingEntry[]> => {
  if (!collegeId) throw new Error("collegeId is required");

  const baseQuery = [where("collegeId", "==", collegeId)];
  if (classCode !== undefined) {
    baseQuery.push(where("classCode", "==", classCode));
  }

  const q = query(collection(db, "ratings"), ...baseQuery);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as RatingEntry);
};


export { auth, googleProvider, submitRating, getRatings };
export default app;
