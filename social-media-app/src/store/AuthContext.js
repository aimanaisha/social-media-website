import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    username: '',
    email: ''
}) 
export default AuthContext

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token')

    const [token, setToken] = useState(initialToken)
    const [email, setEmail] = useState(null)
    const [userName, setUserName] = useState(null)

    const userIsLoggedIn = !!token


    const loginHandler = (token, email, username) => {
        setToken(token)
        setEmail(email)
        setUserName(username)
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        email: email,
        username: userName
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
} 