import { useState, useRef} from "react"

import { useHistory } from "react-router-dom"
import classes from './AuthForm.module.css'
import { signup, login } from "../store/AuthContext"
import { useAuth } from "../store/AuthContext"

const AuthForm = () => {
      

    const [signIn, setSignIn] = useState(true)   
    const history = useHistory()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const currentUser = useAuth()

        const loginToggleHandler = () => {
            setSignIn((prevState) => !prevState)
        }
            
        const submitHandler = (event) => {

            event.preventDefault()
            console.log(currentUser)

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
    
                if(!signIn){
                 
                    try{
                        signup(enteredEmail, enteredPassword);
                        history.replace('/profile')
                    }
                    catch(error){
                        alert(error)
                    }
                    
                }
                else{
                
                    try{
                        login(enteredEmail, enteredPassword);
                        history.replace('/home')
                    }
                    catch(error){
                        alert(error)
                    }
                    
                }
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