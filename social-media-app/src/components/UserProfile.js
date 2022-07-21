import { useState, useEffect, useRef} from "react"
import classes from './UserProfile.module.css'
import { useAuth} from "../store/AuthContext"
import call from '../assets/call.png'
import mail from '../assets/mail.png'
import location from '../assets/location.png'
import quotel from '../assets/quotel.png'
import quoter from '../assets/quoter.png'
import settings from '../assets/settings.png'
import DpSettings from "./DpSettings"
import { Link } from "react-router-dom"
import defaultDp from '../assets/defaultDp.png'
import { db } from "../store/firebase";
import { collection,getDocs } from "firebase/firestore";

const UserProfile = () => { 
        
    const currentUser = useAuth()         
    const [userName, setUserName] = useState('Add a username')
    const [dp, setDp] = useState(defaultDp)
    const [showModal, setShowModal] = useState(false)
    const [userinfo, setUserinfo] = useState([])

    useEffect(() => {
      if (currentUser?.photoURL) {
        setDp(currentUser.photoURL)
      }
    }, [currentUser])

    useEffect(()=> {      
      const getData = async () => {
          const data = await getDocs(collection(db, 'user_info'));
            setUserinfo(data.docs.map((doc) => ({...doc.data()})))

      }
      getData()
  }, [])

  const showModalHandler = () => { setShowModal(true) }

  const hideModalHandler = () => { setShowModal(false) }
      useEffect(() => {
        if (currentUser?.displayName) {
          setUserName(currentUser.displayName)
        }
      }, [currentUser])

    const test = ()=>{
      console.log(userinfo)
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
        {userinfo.map((data)=>{
          if(data.uid === currentUser.uid){
          return(
            <>
            <p className={classes.bio}>
          <img className={classes.quote} src={quotel} alt='error'/>{data.bio}<img className={classes.quote} alt='error' src={quoter}/>
        </p>
        <div className={classes.aboutborder}>
        <div className={classes.about}>
            <div className={classes.infodiv}><img className={classes.infoimg} alt='error' src={location}/><h2 className={classes.info}>Lives in {data.location}</h2></div>
            <div className={classes.infodiv}><img className={classes.infoimg} alt='error' src={call}/><h2 className={classes.info}>Give a call at {data.phone}</h2></div>
            <div className={classes.infodiv}><img className={classes.infoimg} alt='error' src={mail}/><h2 className={classes.info}>Drop a mail at {currentUser?.email}</h2></div>
        </div>
        </div>
            </>
          )}
        })}
      <br/>
       <button className={classes.settings} onClick={test}></button>

       <Link to='/settings' className={classes.settings}> <img className={classes.biosettings} alt='error' src={settings}/> </Link>
        
        </div>
      </>
    
    )
}

export default UserProfile