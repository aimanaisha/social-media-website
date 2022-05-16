import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";

const AuthContext = React.createContext({
    //token: '',
    useAuth: () => {},
    login: (email, password) => {},
    signup: (email, password) => {},
    logout: () => {},
    // username: '',
    // email: ''
}) 
export default AuthContext

export const AuthContextProvider = (props) => {

    const auth = getAuth();

    // const initialToken = localStorage.getItem('token')

    // const [token, setToken] = useState(initialToken)
    // const [email, setEmail] = useState(null)
    // const [userName, setUserName] = useState(null)

    const useAuthHandler = () => {
        const [ currentUser, setCurrentUser ] = useState();
      
        useEffect(() => {
          const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
          return unsub;
        }, [])
      
        return currentUser;
      }


    // const loginHandler = (token, email, username) => {
    //     setToken(token)
    //     setEmail(email)
    //     setUserName(username)
    //     localStorage.setItem('token', token)
    // }

    const signupHandler = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      }


    const loginHandler = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
  }

    // const logoutHandler = () => {
    //     setToken(null)
    //     localStorage.removeItem('token')
    // }

    const logoutHandler = () => {
        return signOut(auth);
      }

    const contextValue = {
        //token: token,
        useAuth: useAuthHandler,
        login: loginHandler,
        signup: signupHandler,
        logout: logoutHandler,
        // email: email,
        // username: userName
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
} 