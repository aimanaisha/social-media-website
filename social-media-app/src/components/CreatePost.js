import { useEffect, useState, useRef } from "react"
import './CreatePosts.css'
import { useAuth} from "../store/AuthContext"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../store/firebase";
import { addDoc, collection,onSnapshot } from "firebase/firestore";

const CreatePost = () => {

    const currentUser = useAuth()
    const textInputRef = useRef()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState([])
    const [status, setStatus] = useState([])

    const selectFileHandler = (event) => {
        if(event.target.files[0]){
            setFile(event.target.files[0])
        }
        else{
            alert('Nothing is selected')
        }
    }

    const uploadFileHandler = async () => {
        if(file){
            setLoading(true)
        console.log(file)
        const fileRef = ref(storage, `posts/${currentUser.uid}/${file.name}.png` )
        await uploadBytes(fileRef, file)
        const photoURL = await getDownloadURL(fileRef);

        console.log(photoURL)

        const collectionRef = collection(db, 'file_posts')
        const payload = {file_name: `${file.name}.png`, file_url: photoURL, posted_by: currentUser.uid}
        await addDoc(collectionRef, payload)       
        setLoading(false)
        }
        else{
            alert('choose a file')
        }        
    }

    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(collection(db, 'file_posts'), (snapshot)=>{
            setPhotoURL(snapshot.docs.map(doc => doc.data().file_url))
            console.log(photoURL)
            setLoading(false)
        })
        return unsub
    },[])

    const uploadTextHandler = async () => {
        const text = textInputRef.current.value.trim()
        if(text.length !== 0){
            setLoading(true)
            const collectionRef = collection(db, 'text_posts')
            const payload = {posted_by: currentUser.uid, text_content: text}
            await addDoc(collectionRef, payload)
            setLoading(false)

        }
        else{
            alert("Empty Field!")
        }
    }

    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(collection(db, 'text_posts'), (snapshot)=>{
            setStatus(snapshot.docs.map(doc => doc.data().text_content))
            console.log(status)
            setLoading(false)
        })
        return unsub
    },[])

    return(
        <div>
            <label htmlFor='file-upload'>Upload file</label>
            <input id='file-upload' type='file' onChange={selectFileHandler}/>
            <button onClick={uploadFileHandler}>Post</button>

            <label htmlFor='text-upload'>What's on Your Mind?</label>
            <input id='text-upload' type='text' ref={textInputRef}/>
            <button onClick={uploadTextHandler}>Post</button>

            <p>{loading && 'loading...'}</p>
            
            {photoURL.map((url)=>{
                return <img src={url} alt=''/>
            })}

            {status.map((text)=>{
                return <p>{text}</p>
            })}
            
        </div>
    )
}

export default CreatePost