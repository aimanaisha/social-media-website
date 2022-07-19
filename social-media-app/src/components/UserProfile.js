import { useState, useEffect, useRef} from "react"
import classes from './UserProfile.module.css'
import { useAuth, upload, username } from "../store/AuthContext"
import call from '../assets/call.png'
import mail from '../assets/mail.png'
import location from '../assets/location.png'
import quotel from '../assets/quotel.png'
import quoter from '../assets/quoter.png'


const UserProfile = () => {

    const currentUser = useAuth()
    const usernameRef = useRef()
    
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [userName, setUserName] = useState('Add a username')
    const [imageURL, setimageURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
    const [form, setForm] = useState(false)


    const imageChangeHandler = (event) => {
        if(event.target.files[0]){
            setPhoto(event.target.files[0])
        }
        else{
          alert('nothing is selected')
        }
    }
    const imageUploadHandler = async () => { 
      setLoading(true)       
      if(photo){
        await  upload(photo, currentUser)
        setLoading(false)
      }
      else{
        alert('nothing is selected')
      }
          
    }

    useEffect(() => {
        if (currentUser?.photoURL) {
          setimageURL(currentUser.photoURL)
        }
      }, [currentUser])  

      useEffect(() => {
        if (currentUser?.displayName) {
          setUserName(currentUser.displayName)
        }
      }, [currentUser])

      const showFormHandler = () => {
        setForm(true)
      }

    const  infoChangeHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        setForm(false)
        await username(usernameRef.current.value, currentUser)
        setLoading(false)
    }
    const test = ()=>{
      console.log(currentUser)
    }


    return(<div className={classes.container}>
      <div className={classes.dpbg}>
      <img className={classes.dp} src={imageURL} alt='error'/>
      </div>
              
        {/* <label htmlFor="myfile">Select a file</label>
        <input type="file" accept="image/*" id='myfile' onChange={imageChangeHandler} className={classes.file}/>
        <button onClick={imageUploadHandler}>upload</button> */}

        <h1 className={classes.username}>{userName}</h1>

        <p className={classes.bio}>
          <img className={classes.quote} src={quotel}/>Passionate about my work. In love with food. Dedicated to spreading happiness.<img className={classes.quote} src={quoter}/>
        </p>
        <div className={classes.aboutborder}>
        <div className={classes.about}>
            <div className={classes.infodiv}><img className={classes.infoimg} src={location}/><h2 className={classes.info}>Lives in Hyderabad</h2></div>
            <div className={classes.infodiv}><img className={classes.infoimg} src={call}/><h2 className={classes.info}>Give a call at +1234567890</h2></div>
            <div className={classes.infodiv}><img className={classes.infoimg} src={mail}/><h2 className={classes.info}>Drop a mail at {currentUser?.email}</h2></div>
        </div>
        </div>
        
        
             

        {form && <form onSubmit={infoChangeHandler}>
            <label htmlFor="uname">Enter Username</label>
            <input type='text' id='uname' ref={usernameRef}/>
            <button>Done</button>
        </form>}

       {/* {!form && <button onClick={showFormHandler}>change</button>} */}

       
       {loading && <p>loading...</p>} 
        
        </div>
    )
}

export default UserProfile