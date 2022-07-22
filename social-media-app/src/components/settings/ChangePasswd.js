import Modal from "../../Layout/Modal"
import classes from './ChangePasswd.module.css'
import { useState } from "react"
import { useAuth, ChangePassword } from "../../store/AuthContext"

const ChangePasswd = (props) => {

    const currentUser = useAuth()
    const [newPasswd, setNewPasswd] = useState('')
    const [confirmPasswd, setConfirmPasswd] = useState('')


    const passwdChangeHandler = (e) => {
        setNewPasswd(e.target.value.trim())
    }
    const confirmPasswdHandler = (e) => {
        setConfirmPasswd(e.target.value.trim())
    }

    const submitHandler = async () => {
        if(newPasswd !== confirmPasswd){
            alert('Your Passwords Do not Match')
        }
        else{

            await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=[key]', {
                method: 'POST',
                body: JSON.stringify({
                  idToken: currentUser.uid,
                  password: confirmPasswd,
                  returnSecureToken: false
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              
              .then( () => {
                alert('Your password was changed')
                props.onHideBox() 
                setNewPasswd('')   
                setConfirmPasswd('')} 
            )
            .catch(error => alert(error))
                     
        } 
    }
    return(
        <Modal onClose={props.onHideBox}>
            <h1 className={classes.head}>Change Password</h1>
            <div className={classes.container}>
                <input className={classes.input} type='password' placeholder="New Password" onChange={passwdChangeHandler}/>
                <input className={classes.input} type='password' placeholder="Confirm Password" onChange={confirmPasswdHandler}/>
                <button className={classes.updatebtn} onClick={submitHandler}>Change</button>
            </div>
        </Modal>
    )
}
export default ChangePasswd