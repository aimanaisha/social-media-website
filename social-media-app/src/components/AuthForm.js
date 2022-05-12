import { useState, useRef } from "react"
import axios from 'axios'

const AuthForm = () => {

    const [signIn, setSignIn] = useState(true)
    //    const [loggedIn, setLoggedIn] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    
        const loginToggleHandler = () => {
            setSignIn((prevState) => !prevState)
        }
    
        const submitHandler = (event) => {
            event.preventDefault()
            const enteredEmail = emailRef.current.value
            const enteredPassword = passwordRef.current.value

            let url 
            if(!signIn){
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq19FoMR1Ye5OzHJfSFQVlewqGm-GPbSc'
            }
            else{
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq19FoMR1Ye5OzHJfSFQVlewqGm-GPbSc'
            }
            // fetch(url, {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         email: enteredEmail,
            //         password: enteredPassword,
            //         returnSecureToken: true
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            axios({
                method: 'post',
                url: url,
                data: {                    
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true                    
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            .then((response) => {
                console.log(response)
            })
        }
    
        return(
            <form onSubmit={submitHandler}>
              <h1>{signIn ? 'Login to Your Account' : 'Sign Up for a New Account!'}</h1>
                <section>
                    <label htmlFor="email" required>Your Email </label>
                    <input type='email' id='email' ref={emailRef}/>
                    <label htmlFor="password" required>Your Password </label>
                    <input type='password' id='password' ref={passwordRef}/>
                </section>
                <section>
                    <button>{signIn ? 'Login In' : 'Sign Up'}</button>
                    <button type="button" onClick={loginToggleHandler}>{signIn ? 'Create a New Account' : 'Sign In to Yor Account'}</button>
                </section>
            </form>
        )
}

export default AuthForm