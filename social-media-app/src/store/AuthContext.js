import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    //isLoggedIn: false,
    login: (token) => {},
    username: '',
    email: ''
}) 
export default AuthContext

export const AuthContextProvider = (props) => {

    const [token, setToken] = useState(null)
    const [email, setEmail] = useState(null)
    const [userName, setUserName] = useState(null)


    const loginHandler = (token, email, username) => {
        setToken(token)
        setEmail(email)
        setUserName(username)
    }

    const contextValue = {
        token: token,
        login: loginHandler,
        email: email,
        username: userName

    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
} 