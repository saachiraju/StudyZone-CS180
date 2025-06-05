import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export type RatingEntry = {
  id?: string;
  collegeId: string;
  classCode: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp?: any;
};
// Test commit
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
const storage = getStorage(app);

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

const deletePost = async (postId: string): Promise<void> => {
  await deleteDoc(doc(db, "posts", postId));
};

const deleteComment = async (postId: string, commentId: string): Promise<void> => {
  await deleteDoc(doc(db, `posts/${postId}/comments/${commentId}`));
};

const getRatings = async (
  collegeId: string,
  classCode?: string
): Promise<RatingEntry[]> => {
  if (!collegeId) throw new Error("collegeId is required");

  const baseQuery = [where("collegeId", "==", collegeId)];
  if (classCode !== undefined) {
    baseQuery.push(where("classCode", "==", classCode));
  }

  const q = query(collection(db, "ratings"), ...baseQuery);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as RatingEntry));
};

const deleteRating = async (ratingId: string): Promise<void> => {
  const ratingRef = doc(db, "ratings", ratingId);
  await deleteDoc(ratingRef);
};

const addPost = async (
  title: string,
  body: string,
  uid: string,
  displayName: string,
  anonymous: boolean,
  classCode?: string // optional
) => {
  await addDoc(collection(db, "posts"), {
    title,
    body,
    author: uid,
    authorName: anonymous ? 'Anonymous' : displayName,
    anonymous,
    classCode: classCode || null, // allow null if not provided
    createdAt: Timestamp.now()
  });
};

const getPosts = async () => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getPostById = async (id: string) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

const addComment = async (postId: string, body: string, uid: string) => {
  await addDoc(collection(db, `posts/${postId}/comments`), {
    body,
    author: uid,
    createdAt: Timestamp.now()
  });
};

const getComments = async (postId: string) => {
  const q = query(collection(db, `posts/${postId}/comments`), orderBy("createdAt"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export {
  auth,
  googleProvider,
  submitRating,
  getRatings,
  deleteRating,
  storage,
  addPost,
  getPosts,
  getPostById,
  addComment,
  getComments,
  deletePost,
  deleteComment
};

export default app;