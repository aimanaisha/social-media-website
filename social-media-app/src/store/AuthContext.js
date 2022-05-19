import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
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
    updateProfile(currentUser, {photoURL});
}

export async function username(displayName, currentUser){
    updateProfile(currentUser, {displayName})
}






