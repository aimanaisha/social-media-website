import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    //isLoggedIn: false,
    login: (token) => {}
}) 
export default AuthContext

export const AuthContextProvider = (props) => {

    const [token, setToken] = useState(null)

    const loginHandler = (token) => {
        setToken(token)
    }

    const contextValue = {
        token: token,
        login: loginHandler

    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
} 