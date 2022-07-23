import profile from '../assets/profile.png'
import classes from './settings/ProfileSettings.module.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { username } from '../store/AuthContext'
import { useAuth } from '../store/AuthContext'
import { useHistory } from "react-router-dom"


const AccInfo = () => {

    const [userName, setUserName] = useState('')
    const currentUser = useAuth()
    const history = useHistory()


    const usernameHandler = (e) => {
        setUserName(e.target.value)
    }

    const  submitHandler = async (e) => {
        e.preventDefault()
        if(userName.trim() === ''){
            alert('Please set a Username')
        }
        else{
            await username(userName.trim(), currentUser)
            setUserName('')
            history.replace('/Profile')            
        }
    }

    return(
        <div>
            <Link to='/profile' className={classes.settings}> <img className={classes.biosettings} alt='error' src={profile}/> </Link>

            <div className={classes.container}>
                <div className={classes.box}>
                    <label htmlFor="username" className={classes.label}>Set Username</label>
                    <input type='text' id='username' className={classes.input} value={userName} onChange={usernameHandler}/>
                </div>
                <div className={classes.btnbox}>
                    <button className={classes.updatebtn} onClick={submitHandler}>Let's Go!</button>                   
                </div>
            </div>
            

        </div>
    )
}
export default AccInfo