import { Link } from "react-router-dom"
import classes from './ProfileSettings.module.css'
import profile from '../assets/profile.png'
import { useAuth } from "../store/AuthContext"
import { useState } from "react"
import ChangePasswd from "./ChangePasswd"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../store/firebase";


const ProfileSettings = () => {

    const currentUser = useAuth()          
    const [showModal, setShowModal] = useState(false)
    const [info, setInfo] =useState({
        dob: '',
        bio: '',
        location: '',
        phone: ''
    })
    const dobHandler = (e) => {
        setInfo({...info, dob: e.target.value.trim()})
    }
    const bioHandler = (e) => {
        setInfo({...info, bio: e.target.value.trim()})
    }
    const locationHandler = (e) => {
        setInfo({...info, location: e.target.value.trim()})
    }
    const phoneHandler = (e) => {
        setInfo({...info, phone: e.target.value.trim()})
    }
    // const showModalHandler = () => {
    //     setShowModal(true)
    //   }
    
    // const hideModalHandler = () => {
    //   setShowModal(false)
    // }
    const updateInfoHandler = async () => {

        const collectionRef = collection(db, 'user_info')
        const payload = {dob: info.dob, bio: info.bio, location: info.location, phone: info.phone, uid: currentUser.uid}
        await addDoc(collectionRef, payload) 
    }
    

    return(
        <div>
            {/* {showModal && <ChangePasswd onHideBox={hideModalHandler} />} */}
            <Link to='/profile' className={classes.settings}> <img className={classes.biosettings} alt='error' src={profile}/> </Link>

            <div className={classes.container}>
                <div className={classes.box}>
                    <label htmlFor="dob" className={classes.label}>Update Your Date of Birth</label>
                    <input type='date' id='dob' className={classes.input} onChange={dobHandler}/>
                </div>
                <div className={classes.box}>
                    <label htmlFor="bio" className={classes.label}>Update Your Bio</label>
                    <input type='text' id='bio' className={classes.input} onChange={bioHandler}/>
                </div>
                <div className={classes.box}>
                    <label htmlFor="location" className={classes.label}>Update Your Location</label>
                    <input type='text' id='location' className={classes.input} onChange={locationHandler}/>
                </div>
                <div className={classes.box}>
                    <label htmlFor="phone" className={classes.label}>Update Your Phone Number</label>
                    <input type='tel' id='phone' className={classes.input} onChange={phoneHandler}/>
                </div>
                <div className={classes.btnbox}>
                    <button className={classes.discardbtn}>Discard</button>
                    <button className={classes.updatebtn} onClick={updateInfoHandler}>Make Changes</button>                   
                </div>
                {/* <div className={classes.box}>
                <button className={classes.password} onClick={showModalHandler}>Change Password</button>
                </div> */}
            </div>
        </div>
    )
}
 export default ProfileSettings