import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseReady = Object.values(firebaseConfig).every(Boolean);

const app = firebaseReady
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export function watchAuth(callback) {
  return auth ? onAuthStateChanged(auth, callback) : () => {};
}

export async function registerUser({ name, email, password, role }) {
  if (!auth || !db) throw new Error("Firebase is not configured yet.");
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(credential.user, { displayName: name });
  await setDoc(doc(db, "profiles", credential.user.uid), {
    name,
    email,
    role,
    createdAt: serverTimestamp(),
  });
  return { ...credential.user, displayName: name, role };
}

export async function loginUser(email, password) {
  if (!auth) throw new Error("Firebase is not configured yet.");
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return hydrateUser(credential.user);
}

export async function hydrateUser(firebaseUser) {
  if (!firebaseUser) return null;
  const snapshot = db
    ? await getDoc(doc(db, "profiles", firebaseUser.uid))
    : null;
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || "SkillSwap member",
    email: firebaseUser.email,
    role: snapshot?.exists() ? snapshot.data().role : "Client",
  };
}

export function logoutUser() {
  return auth ? signOut(auth) : Promise.resolve();
}
