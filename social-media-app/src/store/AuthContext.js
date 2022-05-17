import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app, storage } from "./firebase.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";



const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
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
    const fileRef = ref(storage, currentUser.uid + '.png' )
    await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {photoURL});
}

export function username(displayName, currentUser){
    updateProfile(currentUser, {displayName})
}

export function phoneNumber(phoneNumber, currentUser){
    console.log(phoneNumber, currentUser)
    updateProfile(currentUser, {phoneNumber})
}


