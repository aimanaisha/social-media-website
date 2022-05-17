import { useState, useEffect} from "react"
import classes from './UserProfile.module.css'
import { useAuth, upload } from "../store/AuthContext"

const UserProfile = () => {

    const currentUser = useAuth()
    
    const [photo, setPhoto] = useState(null)
    const [imageURL, setimageURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")

    const test= () => {
        console.log(currentUser)
    }

    const imageChangeHandler = (event) => {
        if(event.target.files[0]){
            setPhoto(event.target.files[0])
            console.log('file chosen')
        }
    }
    const imageUploadHandler = () => {
        
            upload(photo, currentUser)
            console.log('upload fun called')
        
    }

    useEffect(() => {
        if (currentUser?.photoURL) {
          setimageURL(currentUser.photoURL)
        }
      }, [currentUser])


    return(<div className={classes.container}>


        <img src={imageURL} alt='error'/>
        <label htmlFor="myfile">Select a file</label>
        <input type="file" accept="image/*" id='myfile' onChange={imageChangeHandler} className={classes.file}/>
        <button onClick={imageUploadHandler}>upload</button>


        <button onClick={test}>test</button>
        <h1>Welcome to Your Profile!</h1> 
        <h2>Your Email</h2>
        <p>{currentUser?.email}</p>
        
        
        </div>
    )
}

export default UserProfile