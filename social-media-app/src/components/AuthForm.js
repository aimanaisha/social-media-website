import { useState } from "react"

const AuthForm = () => {

    const [signIn, setSignIn] = useState(true)
    //    const [loggedIn, setLoggedIn] = useState(false)
    
        const loginToggleHandler = () => {
            setSignIn((prevState) => !prevState)
        }
    
        const submitHandler = (event) => {
            event.preventDefault()
        }
    
        return(
            <form onSubmit={submitHandler}>
              <h1>{signIn ? 'Login to Your Account' : 'Sign Up for a New Account!'}</h1>
                <section>
                    <label htmlFor="email" required>Your Email </label>
                    <input type='email' id='email'/>
                    <label htmlFor="password" required>Your Password </label>
                    <input type='password' id='password'/>
                </section>
                <section>
                    <button>{signIn ? 'Login In' : 'Sign Up'}</button>
                    <button type="button" onClick={loginToggleHandler}>{signIn ? 'Create a New Account' : 'Sign In to Yor Account'}</button>
                </section>
            </form>
        )
}

export default AuthForm