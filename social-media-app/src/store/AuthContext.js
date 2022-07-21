import { useState, useEffect } from "react";
import { getAuth, updatePassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { storage } from "./firebase.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";



const auth = getAuth();

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
  return signOut(auth);
}

export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}

export async function upload(file, currentUser) {
    const fileRef = ref(storage, `profile-pictures/${currentUser.uid}.png` )
    await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, {photoURL});
}

export async function username(displayName, currentUser){
  await  updateProfile(currentUser, {displayName})
}

export async function ChangePassword(newPassword, currentUser){
  await updatePassword(currentUser, newPassword)
}

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }






