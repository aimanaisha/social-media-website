import { useState, useEffect, useRef} from "react"
import classes from './UserProfile.module.css'
import { useAuth, upload, username } from "../store/AuthContext"

const UserProfile = () => {

    const currentUser = useAuth()
    const usernameRef = useRef()
    
    const [photo, setPhoto] = useState(null)
    const [userName, setUserName] = useState('Add a username')
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
    
    }
    const test = ()=>{
      console.log(currentUser)
    }


    return(<div className={classes.container}>
              
        <img src={imageURL} alt='error'/>
        <label htmlFor="myfile">Select a file</label>
        <input type="file" accept="image/*" id='myfile' onChange={imageChangeHandler} className={classes.file}/>
        <button onClick={imageUploadHandler}>upload</button>

        <h1>{userName}</h1>

        <h2>Your Email</h2>
        <p>{currentUser?.email}</p>
             

        {form && <form onSubmit={infoChangeHandler}>
            <label htmlFor="uname">Enter Username</label>
            <input type='text' id='uname' ref={usernameRef}/>
            <button>Done</button>
        </form>}

       {!form && <button onClick={showFormHandler}>change</button>}

        <button onClick={test}>test</button>
       
        
        
        </div>
    )
}

export default UserProfile