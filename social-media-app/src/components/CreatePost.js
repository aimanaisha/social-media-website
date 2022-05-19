import { useEffect, useState } from "react"
import './CreatePosts.css'
import { useAuth} from "../store/AuthContext"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../store/firebase";
import { addDoc, collection,onSnapshot } from "firebase/firestore";

const CreatePost = () => {

    const currentUser = useAuth()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState([])

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
        const unsub = onSnapshot(collection(db, 'file_posts'), (snapshot)=>{
            setPhotoURL(snapshot.docs.map(doc => doc.data().file_url))
            console.log(photoURL)
        })
        return unsub
    },[])

    return(
        <div>
            <label htmlFor='file-upload'>Upload file</label>
            <input id='file-upload' type='file' onChange={selectFileHandler}/>
            <button onClick={uploadFileHandler}>Post</button>
            <p>{loading && 'loading...'}</p>
            
            {photoURL.map((url)=>{
                return <img src={url} alt=''/>
            })}
            
        </div>
    )
}

export default CreatePost