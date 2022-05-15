import { useState, useRef, useContext } from "react"
import axios from 'axios'
import AuthContext from "../store/AuthContext"
import { useHistory } from "react-router-dom"
import classes from './AuthForm.module.css'



const AuthForm = () => {
      

    const [signIn, setSignIn] = useState(true)
   
    const history = useHistory()

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const usernameRef = useRef()


    const ctx = useContext(AuthContext)

    
        const loginToggleHandler = () => {
            setSignIn((prevState) => !prevState)
        }

        
    
        const submitHandler = (event) => {
            event.preventDefault()

            const enteredEmail = emailRef.current.value
            const enteredPassword = passwordRef.current.value
            let confirmPassword
            if(signIn){
                confirmPassword = enteredPassword
            }
            else{
                confirmPassword = confirmPasswordRef.current.value
            }
            
            if(enteredPassword === confirmPassword){
                let enteredUsername
                if(!signIn){
                    enteredUsername = usernameRef.current.value
                }
                else{
                    enteredUsername = ''
                }
    
                let url 
                if(!signIn){
                    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq19FoMR1Ye5OzHJfSFQVlewqGm-GPbSc'
                }
                else{
                    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq19FoMR1Ye5OzHJfSFQVlewqGm-GPbSc'
                }
            
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
                    
                    ctx.login(response.data.idToken, enteredEmail, enteredUsername)
                    if(signIn){
                        history.replace('/home')
                    }
                    else{
                        history.replace('/profile')
                    }                
                })
                .catch((error) => {
                    alert(error.response.data.error.message)
                    
                })
            }
            else{
                alert('Passwords do Not Match')
            }

          
        }
    
        return(
        
            <form onSubmit={submitHandler} className={classes.container}>
              <h1 className={classes.h1}>{signIn ? 'Sign in to Your Account' : "Let's get started!"}</h1>
                <section>
                    <label htmlFor="email" required className={classes.label}>Your Email </label>
                    <input type='email' id='email' ref={emailRef} className={classes.input}/>

                    {!signIn && <label htmlFor="username" required className={classes.label}>Your Username</label>}
                    {!signIn && <input type='text' id='username' ref={usernameRef} className={classes.input}/>}

                    <label htmlFor="password" required className={classes.label}>Your Password </label>
                    <input type='password' id='password' ref={passwordRef} className={classes.input}/>

                    {!signIn && <><label htmlFor="confirmPassword" required className={classes.label}>Confirm Password </label>
                    <input type='password' id='confirmPassword' ref={confirmPasswordRef} className={classes.input}/></>}

                </section>
                <section>
                    <button className={classes.button}>{signIn ? 'Login In' : 'Sign Up'}</button>
                    <button className={classes.link} type="button" onClick={loginToggleHandler}>{signIn ? "Don't have an account? Create a New one!" : 'Already have an account? Log In'}</button>
                </section>
                
            </form>
            
        )
}

export default AuthForm