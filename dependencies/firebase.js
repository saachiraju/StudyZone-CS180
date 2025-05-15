import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

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

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();



const db = getFirestore(app);

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
  console.log(collegeId)
  console.log(classCode)
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


export { auth, googleProvider, submitRating, getRatings};


