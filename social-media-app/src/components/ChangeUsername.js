import Modal from "../Layout/Modal"
import classes from './ChangePasswd.module.css'
import { username, useAuth } from "../store/AuthContext"
import { useState } from "react"


const ChangeUsername = (props) => {

    const currentUser = useAuth()
    const [userName, setUserName] = useState('')

    const usernameHandler = (e) => {
        setUserName(e.target.value.trim())
    }

    const submitHandler = async () => {
        if(userName === ''){
            alert('Please set a Username')
        }
        else{
            await username(userName, currentUser)
            props.onHideBox() 
            setUserName('')            
        } 
    }
    return(
        <Modal onClose={props.onHideBox}>
            <h1 className={classes.head}>Change Username</h1>
            <div className={classes.container}>
                <input className={classes.input} type='text' placeholder="Your Username" onChange={usernameHandler} value={userName}/>
                <button className={classes.updatebtn} onClick={submitHandler}>Change</button>
            </div>
        </Modal>
    )
}
export default ChangeUsername