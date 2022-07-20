import { Link } from "react-router-dom"
import classes from './ProfileSettings.module.css'
import profile from '../assets/profile.png'
import { useAuth, username } from "../store/AuthContext"
import { useRef, useState } from "react"
import ChangePasswd from "./ChangePasswd"

const ProfileSettings = () => {

    const currentUser = useAuth()         
    const usernameRef = useRef()   
    const bioRef = useRef()    
    const locationRef = useRef()    
    const phoneRef = useRef()    
    const [showModal, setShowModal] = useState(false)

    const showModalHandler = () => {
        setShowModal(true)
      }
    
    const hideModalHandler = () => {
      setShowModal(false)
    }

    const  infoChangeHandler = async (e) => {
        e.preventDefault()
        await username(usernameRef.current.value, currentUser)
    }
    return(
        <div>
            {showModal && <ChangePasswd onHideBox={hideModalHandler} />}
            <Link to='/profile' className={classes.settings}> <img className={classes.biosettings} alt='error' src={profile}/> </Link>

            <div className={classes.container}>
                <div className={classes.box}>
                    <label htmlFor="uname" className={classes.label}>Update Your Username</label>
                    <input type='text' id='uname' ref={usernameRef} className={classes.input}/>
                </div>
                <div className={classes.box}>
                    <label htmlFor="bio" className={classes.label}>Update Your Bio</label>
                    <input type='text' id='bio' ref={bioRef} className={classes.input}/>
                </div>
                <div className={classes.box}>
                    <label htmlFor="location" className={classes.label}>Update Your Location</label>
                    <input type='text' id='location' ref={locationRef} className={classes.input}/>
                </div>
                <div className={classes.box}>
                    <label htmlFor="phone" className={classes.label}>Update Your Phone Number</label>
                    <input type='tel' id='phone' ref={phoneRef} className={classes.input}/>
                </div>
                <div className={classes.btnbox}>
                    <button className={classes.discardbtn}>Discard</button>
                    <button className={classes.updatebtn}>Make Changes</button>                   
                </div>
                <div className={classes.box}>
                <button className={classes.password} onClick={showModalHandler}>Change Password</button>

                </div>
            </div>
        </div>
    )
}
 export default ProfileSettings