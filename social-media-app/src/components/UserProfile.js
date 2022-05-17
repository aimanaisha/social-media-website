import { useState, useEffect, useRef} from "react"
import classes from './UserProfile.module.css'
import { useAuth, upload, username, phoneNumber } from "../store/AuthContext"

const UserProfile = () => {

    const currentUser = useAuth()
    const usernameRef = useRef()
    const phoneNumberRef = useRef()
    
    const [photo, setPhoto] = useState(null)
    const [userName, setUserName] = useState('Add a username')
    const [number, setNumber] = useState(null)
    const [imageURL, setimageURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
    const [form, setForm] = useState(false)


    const imageChangeHandler = (event) => {
        if(event.target.files[0]){
            setPhoto(event.target.files[0])
        }
    }
    const imageUploadHandler = () => {        
            upload(photo, currentUser)
    }

    useEffect(() => {
        if (currentUser?.photoURL) {
          setimageURL(currentUser.photoURL)
        }
      }, [currentUser])  

      useEffect(() => {
        
          setNumber(currentUser.phoneNumber)
        
      }, [currentUser])  


      useEffect(() => {
        if (currentUser?.displayName) {
          setUserName(currentUser.displayName)
        }
      }, [currentUser])

      const showFormHandler = () => {
        setForm(true)
      }

    const  infoChangeHandler = (e) => {
        e.preventDefault()
        setForm(false)
        username(usernameRef.current.value, currentUser)
        phoneNumber(phoneNumberRef.current.value, currentUser)
        

    }


    return(<div className={classes.container}>

        <img src={imageURL} alt='error'/>
        <label htmlFor="myfile">Select a file</label>
        <input type="file" accept="image/*" id='myfile' onChange={imageChangeHandler} className={classes.file}/>
        <button onClick={imageUploadHandler}>upload</button>

        <h1>{userName}</h1>

        <h3>Your Email</h3>
        <p>{currentUser?.email}</p>
             
        <h3>Phone Number</h3>
        <p>{number}</p>

        {form && <form onSubmit={infoChangeHandler}>
            <label htmlFor="uname">Enter Username</label>
            <input type='text' id='uname' ref={usernameRef}/>
            <label htmlFor="ph-no">Enter Phone Number</label>
            <input type='tel' id='ph-no' ref={phoneNumberRef}/>
            <button>Done</button>
        </form>}

       {!form && <button onClick={showFormHandler}>change</button>}

        {/* <button onClick={test}>test</button> */}
       
        
        
        </div>
    )
}

export default UserProfile