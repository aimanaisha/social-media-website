import { useState } from "react"
import ImageUploader from 'react-images-upload';
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../store/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth} from "../store/AuthContext"
import classes from './Post.module.css'


const Post = () => {

    const currentUser = useAuth()
    var current = new Date();
    const btnstyles = {
        backgroundColor:'#CDB4DB',
        borderRadius: '0px',
        border: 'solid black 2px', 
        color: 'black',
        padding: '0.8rem 2rem',
        fontFamily: 'Mali, cursive',
        fontSize: '1.1rem',
        marginTop: '20px'
    }
    const stylesA = {
        backgroundColor: '#f7f7f8',
        padding: '1.5rem 1.9rem',
        boxShadow: 'none'
    }
    const stylesB = {
        backgroundColor: '#f7f7f8',
        margin: '0px',
        padding: '0px',
        boxShadow: 'none',
        width: '450px'
    }
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(false)
    const [text, setText] = useState('')

    const CaptionHandler = (e) => {
        setText(e.target.value.trim())
    }

    const selectFileHandler = (event) => {
        if(event[0]){
            setFile(event[0])
            setPreview(true)
        }
        else{
            alert('Nothing is selected')
        }
        // console.log(event[0])
    }

    const uploadFileHandler = async () => {
        if(file){
            setLoading(true)
            setPreview(false)
        const fileRef = ref(storage, `posts/${currentUser.uid}/${file.name}.png` )
        await uploadBytes(fileRef, file)
        const photoURL = await getDownloadURL(fileRef);

        console.log(photoURL)
        
        const collectionRef = collection(db, 'file_posts')
        const payload = {file_name: file.name, file_url: photoURL, posted_by: currentUser.displayName, user_dp: currentUser.photoURL, posted_on: current.toLocaleDateString(), posted_at: current.toLocaleTimeString(), caption: text}
        await addDoc(collectionRef, payload)       
        setLoading(false)
        setText('')
        }
        else{
            alert('choose a file')
        }        
    }

    const discardFileHandler = () => {
        setPreview(false)
        setFile(null)
    }

    return(
        <div className={classes.border}>
            <div className={classes.container}>
            <h1 className={classes.head}>Show Us What You've Got!</h1>

            <ImageUploader 
                withIcon={preview? false : true}
                buttonStyles={btnstyles}
                fileContainerStyle={preview? stylesB : stylesA}
                withPreview={preview}
                buttonText='Choose a Picture'
                withLabel={false}
                singleImage={true}
                onChange={selectFileHandler}/>

                {preview && <label htmlFor="caption" className={classes.caption}>Add a Caption</label>}
                {preview && <textarea id='caption' placeholder="What's On Your Mind?" className={classes.textarea} maxLength='500' rows='2' cols='45' onChange={CaptionHandler}/>}

            <div className={preview? classes.btns : classes.btnB}>
            {preview &&   <button className={classes.discard} onClick={discardFileHandler}>Discard</button>}                     
            {preview && <button onClick={uploadFileHandler} className={classes.upload}>Upload</button> }
            </div>
            
        </div> 
        </div>
        
             
    )
} 
export default Post