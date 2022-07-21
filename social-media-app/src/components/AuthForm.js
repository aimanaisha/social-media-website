import { useState, useRef} from "react"
import { useHistory } from "react-router-dom"
import classes from './AuthForm.module.css'
import { signup, login, signInWithGoogle, useAuth } from "../store/AuthContext"
import google from '../assets/google.png'

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
        const googleLogin = () => {
            signInWithGoogle()
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
    
                if(!signIn){                 
                    try{
                        signup(enteredEmail, enteredPassword);
                        history.replace('/AccInfo')
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
        
            <form onSubmit={submitHandler}>

                <div className={classes.container}>

                    <div className={classes.leftbox}>

                        <h1 className={classes.h1}>{signIn ? 'Sign in' : "Create New Account"}</h1>
                        
                    <input type='email' id='email' ref={emailRef} className={classes.input} placeholder="Your Email"/>

                    
                    <input type='password' id='password' ref={passwordRef} className={classes.input} placeholder="Your Password"/>

                    {!signIn &&
                    <input type='password' id='confirmPassword' ref={confirmPasswordRef} className={classes.input} placeholder='Confirm Password'/>}
                
                    
                        

                        <button className={classes.loginbutton}>{signIn ? 'Login In' : 'Sign Up'}</button>
                        <p>OR</p>
                        <button className={classes.googlebutton} onClick={googleLogin}><img className={classes.google} src={google} alt=''/><span>Login With Google</span></button>
                        {signIn && <p className={classes.password}>Forgot Password?</p>}
                    
                    
                    </div>

                    <div className={classes.rightbox}>
                    <h1 className={classes.adventure}>“Adventure, without it,</h1>   <h1 className={classes.adventure}>why live?”</h1>                 
                        <h2 className={classes.started}>LET'S GET STARTED!</h2>
                        
                        <h3 className={classes.noaccount} onClick={loginToggleHandler}>{signIn ? "Don't have an account?" : 'Already a Member?'}</h3>
                        <button className={classes.signupbutton} type="button" onClick={loginToggleHandler}>{signIn ? "Start for Free" : 'Log In'}</button>

                    </div>

                </div>

        
                
            </form>
            
        )
}

export default AuthForm