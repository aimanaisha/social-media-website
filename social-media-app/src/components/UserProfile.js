import { useState, useEffect, useRef} from "react"
import classes from './UserProfile.module.css'
import { useAuth, username } from "../store/AuthContext"
import call from '../assets/call.png'
import mail from '../assets/mail.png'
import location from '../assets/location.png'
import quotel from '../assets/quotel.png'
import quoter from '../assets/quoter.png'
import settings from '../assets/settings.png'
import DpSettings from "./DpSettings"
import { Link } from "react-router-dom"
// import ProfileSettings from "./ProfileSettings"

const UserProfile = () => {
        
    const currentUser = useAuth()         
    const [userName, setUserName] = useState('Add a username')
    const [dp, setDp] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      if (currentUser?.photoURL) {
        setDp(currentUser.photoURL)
      }
    }, [currentUser])

  const showModalHandler = () => {
    setShowModal(true)
  }

  const hideModalHandler = () => {
    setShowModal(false)
  }
      useEffect(() => {
        if (currentUser?.displayName) {
          setUserName(currentUser.displayName)
        }
      }, [currentUser])

    const test = ()=>{
      console.log(currentUser)
    }


    return(
      <>
            {showModal && <DpSettings onHideBox={hideModalHandler} />}

      <div className={classes.container}>
      <div className={classes.dpbg}>
      <img className={classes.dp} src={dp} alt='error'/>
      </div>
      <img className={classes.dpsettings} src={settings} alt='' onClick={showModalHandler}/>     
        <h1 className={classes.username}>{userName}</h1>
        <p className={classes.bio}>
          <img className={classes.quote} src={quotel} alt='error'/>Passionate about my work. In love with food. Dedicated to spreading happiness.<img className={classes.quote} alt='error' src={quoter}/>
        </p>
        <div className={classes.aboutborder}>
        <div className={classes.about}>
            <div className={classes.infodiv}><img className={classes.infoimg} alt='error' src={location}/><h2 className={classes.info}>Lives in Hyderabad</h2></div>
            <div className={classes.infodiv}><img className={classes.infoimg} alt='error' src={call}/><h2 className={classes.info}>Give a call at +1234567890</h2></div>
            <div className={classes.infodiv}><img className={classes.infoimg} alt='error' src={mail}/><h2 className={classes.info}>Drop a mail at {currentUser?.email}</h2></div>
        </div>
        </div>
      {/* <img className={classes.biosettings} alt='error' src={settings}/>         */}
             
        {/* {form && <form onSubmit={infoChangeHandler}>
            <label htmlFor="uname">Enter Username</label>
            <input type='text' id='uname' ref={usernameRef}/>
            <button>Done</button>
        </form>} */}

       {/* {!form && <button onClick={showFormHandler}>change</button>} */}
      <br/>
       {/* <button className={classes.settings} onClick={test}></button> */}

       <Link to='/settings' className={classes.settings}> <img className={classes.biosettings} alt='error' src={settings}/> </Link>
        
        </div>
      </>
    
    )
}

export default UserProfile