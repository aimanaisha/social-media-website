import { useContext, useState, useRef } from "react"
import AuthContext from "../store/AuthContext"
import axios from "axios"
import classes from './UserProfile.module.css'

const UserProfile = () => {


    const ctx = useContext(AuthContext)
    const currentUser = ctx.useAuth()

    const [newPass, setNewPass] = useState(false)

    const newPasswordRef = useRef()
    const confirmNewPasswordRef = useRef()

    const submitHandler = (e) => {
        e.preventDefault()
        const enteredNewPassword = newPasswordRef.current.value
        const confirmNewPassword = confirmNewPasswordRef.current.value

        if(enteredNewPassword === confirmNewPassword){
            axios({
                method: 'post',
                url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCq19FoMR1Ye5OzHJfSFQVlewqGm-GPbSc',
                data: {                    
                        idToken: ctx.token,
                        password: enteredNewPassword,
                        returnSecureToken: true                    
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(()=>{
                alert('Password Changed!')
                newPasswordRef.current.value = ''
                confirmNewPasswordRef.current.value = ''
            })
            .catch((error)=>{
                alert(error)
                console.log(error)
            })
        }
        else{
            alert('Passwords do Not Match')
        }       
    }
    const showFormHandler = () => {
        setNewPass(true)
    }

    return(<div className={classes.container}>
        <h1>Welcome to Your Profile!</h1> 
        <h2>Your Email</h2>
        <p>{currentUser.email}</p>
        {!newPass && <button onClick={showFormHandler} className={classes.button}>Set New Password</button>}
        {newPass && <form onSubmit={submitHandler}>
            <label htmlFor='new-password'>New Password</label>
            <input required id='new-password' type='password' ref={newPasswordRef} minLength='7' className={classes.input}/>
            <label htmlFor='confirm-new-password'>Confirm New Password</label>
            <input required id='confirm-new-password' type='password' ref={confirmNewPasswordRef} minLength='7' className={classes.input}/>
            <button className={classes.button}>Change Password</button>
        </form>}        
        </div>
    )
}

export default UserProfile