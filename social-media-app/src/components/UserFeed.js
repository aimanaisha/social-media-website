import { useEffect, useState } from "react"
import classes from './UserFeed.module.css'
import { useAuth} from "../store/AuthContext"
import { db } from "../store/firebase";
import { collection,onSnapshot } from "firebase/firestore";
import like from '../assets/like1.png'
import comment from '../assets/comment1.png'


const UserFeed = () => {

    const currentUser = useAuth()
    //const textInputRef = useRef()
    const [loading, setLoading] = useState(false)
    // const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState([])
    //const [status, setStatus] = useState([])

    // const selectFileHandler = (event) => {
    //     if(event.target.files[0]){
    //         setFile(event.target.files[0])
    //         console.log(file)
    //     }
    //     else{
    //         alert('Nothing is selected')
    //     }
    // }

    // const uploadFileHandler = async () => {
    //     if(file){
    //         setLoading(true)
    //     console.log(file)
    //     const fileRef = ref(storage, `posts/${currentUser.uid}/${file.name}.png` )
    //     await uploadBytes(fileRef, file)
    //     const photoURL = await getDownloadURL(fileRef);

    //     console.log(photoURL)

    //     const collectionRef = collection(db, 'file_posts')
    //     const payload = {file_name: file.name, file_url: photoURL, posted_by: currentUser.uid}
    //     await addDoc(collectionRef, payload)       
    //     setLoading(false)
    //     }
    //     else{
    //         alert('choose a file')
    //     }        
    // }

    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(collection(db, 'file_posts'), (snapshot)=>{
            setPhotoURL(snapshot.docs.map(doc => doc.data().file_url))
            console.log(photoURL)
            setLoading(false)
        })
        return unsub
    },[])

    // const uploadTextHandler = async () => {
    //     const text = textInputRef.current.value.trim()
    //     if(text.length !== 0){
    //         setLoading(true)
    //         const collectionRef = collection(db, 'text_posts')
    //         const payload = {posted_by: currentUser.uid, text_content: text}
    //         await addDoc(collectionRef, payload)
    //         setLoading(false)

    //     }
    //     else{
    //         alert("Empty Field!")
    //     }
    // }

    // useEffect(() => {
    //     setLoading(true)
    //     const unsub = onSnapshot(collection(db, 'text_posts'), (snapshot)=>{
    //         setStatus(snapshot.docs.map(doc => doc.data().text_content))
    //         console.log(status)
    //         setLoading(false)
    //     })
    //     return unsub
    // },[])

    return(
        <div className={classes.feed}>

            {/* <label htmlFor='text-upload'>What's on Your Mind?</label>
            <input id='text-upload' type='text' ref={textInputRef}/>
            <button onClick={uploadTextHandler}>Post</button> */}

            <p>{loading && 'loading...'}</p>
        
            
            {photoURL.map((url)=>{
                return (<div className={classes.post}>
                            <div className={classes.user}>
                                <img className={classes.dp} alt='error' src='https://images.news18.com/ibnlive/uploads/2022/01/oldest-woman.png'/>
                                <h1 className={classes.username}>Aiman Aisha</h1>
                            </div>
                            <p className={classes.text}>Emblazoned with light-catching crystals, the draped crystal dress is designed to leave a lasting impression. </p>
                            <img className={classes.postedimg} src={url} alt=''/>
                            <div className={classes.bottom}>
                                <div>
                                <button className={classes.button}><img className={classes.imgbtn} src={like} alt='' /></button>
                                <button className={classes.button}><img className={classes.imgbtn} src={comment} alt=''/></button>
                                </div>
                                <h2 className={classes.date}>5:37 pm</h2>
                            </div>
                            
                        </div>)
            })}

            {/* {status.map((text)=>{
                return <p>{text}</p>
            })} */}
            
        </div>
    )
}

export default UserFeed





// import { useState, useRef, useEffect } from "react"
// import './CreatePosts.css'
// import DisplayPost from "./DisplayPost";
// import { useAuth} from "../store/AuthContext"
// import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
// import { storage, db } from "../store/firebase";
// import { addDoc, collection, onSnapshot } from "firebase/firestore";

// const CreatePost = () => {

//   const currentUser = useAuth();
//   const textInputRef = useRef();
//   const [file, setFile] = useState(null);
//   const [remove, setRemove] = useState(false);

//   const selectFileHandler = (event) => {
//     if (event.target.files[0]) {
//       setFile(event.target.files[0]);
//       setRemove(true);
//     }
//   };
//   let allData = [{text: 'hello', file: 'https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-11-23/986145a0-2d74-11eb-9dcd-8b2ef5358591.jpg'}]

//   useEffect(()=>{
   
//         const unsub = onSnapshot(collection(db, 'posts'), (snapshot)=>{
//         snapshot.docs.map((doc) =>{
//            const tempData = {
//                     "text": doc.data()['text'],
//                     "file": doc.data()['file_url']
//                 }
//                 allData.push(tempData)
//             });                    
//         })
//         allData.map((data) => {
//             return(<div>
//                 <p>{data.text}</p>
//                 <img src={data.file}/>
//             </div>)
//         })
    
//         console.log(allData)
      

//   }, [allData])
// //   const saveData = async ()=>{
// //     const unsub = onSnapshot(collection(db, 'posts'), (snapshot)=>{
// //     snapshot.docs.map((doc) =>{
// //        const tempData = {
// //                 "text": doc.data()['text'],
// //                 "file": doc.data()['file_url']
// //             }
// //             allData.push(tempData)
// //         });                    
// //     })
// //     console.log(allData)
// //   }

//   const formSubmitHandler = async (e) => {
//     e.preventDefault();

//     const text = textInputRef.current.value.trim();

//     let textPost;
//     if (text === "") {
//       textPost = null;
//     } else {
//       textPost = text;
//     }

   
//     if (file) {
//       const fileRef = ref(storage, `posts/${currentUser.uid}/${file.name}.png`);
//       await uploadBytes(fileRef, file);
//       const photoURL = await getDownloadURL(fileRef);

//       const collectionRef = collection(db, "posts");
//       const payload = {
//         file_url: photoURL,
//         text: textPost,
//         posted_by: currentUser.uid,
//       };
//       await addDoc(collectionRef, payload);
//     } else {
//       const collectionRef = collection(db, "posts");
//       const payload = {
//         file_url: null,
//         text: textPost,
//         posted_by: currentUser.uid,
//       };
//       await addDoc(collectionRef, payload);
//     }

//     // saveData()
//   };

//   const removeFileHandler = () => {
//     setFile(null);
//     setRemove(false);
//   };

//   return (<>
//     <form onSubmit={formSubmitHandler}>
//       <input type="file" onChange={selectFileHandler} />

//       {remove && (
//         <button onClick={removeFileHandler} type="button">
//           remove
//         </button>
//       )}

//       <textarea rows="4" cols="50" ref={textInputRef}></textarea>
//       <button>Post</button>
//     </form>
    
//     {/* {allData.map((data) => {
//         return(<div>
//             <p>{data.text}</p>
//             <img src={data.file}/>
//         </div>)
//     })} */}
//     </>
//   );
// };
// export default CreatePost;


// const CreatePost = () => {


//     const currentUser = useAuth()
//     const textInputRef = useRef()
//     const [loading, setLoading] = useState(false)
//     const [file, setFile] = useState(null)
//     // const [photoURL, setPhotoURL] = useState()
//     const [remove, setRemove] = useState(false)
//     // const [status, setStatus] = useState([])
//     const [post, setPost] = useState([])


//     const [URL, setURL] = useState([])
//     const [show, setShow] = useState([])
    


//     const selectFileHandler = (event) => {
//         if(event.target.files[0]){
//             setFile(event.target.files[0])
//             setRemove(true)
//         }
//     }


//     const formSubmitHandler = async (e) => {
//         e.preventDefault()
//         setRemove(false)
//         setFile(null)

//         const text = textInputRef.current.value.trim()

//         let textPost 
//         if(text === ''){
//             textPost = null
//         }else{
//             textPost = text
//         }

//         console.log(file)
//         console.log(text)

//         setLoading(true)

//         if(file){
//             const fileRef = ref(storage, `posts/${currentUser.uid}/${file.name}.png` )
//             await uploadBytes(fileRef, file)
//             const photoURL = await getDownloadURL(fileRef);

//             const collectionRef = collection(db, 'posts')
//             const payload = { file_url: photoURL, text: textPost, posted_by: currentUser.uid }
//             await addDoc(collectionRef, payload)
        
//         }
//         else{
//             const collectionRef = collection(db, 'posts')
//             const payload = { file_url: null, text: textPost, posted_by: currentUser.uid }
//             await addDoc(collectionRef, payload)
//         }
            
//         setFile(null)        
//     }

//     const allData = []

//     useEffect(() => {
//         setLoading(true)
//         const unsub = onSnapshot(collection(db, 'posts'), (snapshot)=>{
//             // console.log(snapshot.docs[0].data()['text'])
//             // console.log(snapshot.docs[0].data()['file_url'])
//             // const allData = [{
//             //     "text": snapshot.docs[0].data()['text']
//             // }]

//          snapshot.docs.map((doc) =>{
//                 const tempData = {
//                     "text": doc.data()['text'],
//                     "file": doc.data()['file_url']
//                 }

//           allData.push(tempData)
//             });                    

            
//             setLoading(false)
//         })
//         return unsub
//         },[file])
//     console.log(allData)

//     const removeFileHandler = () => {
//         setFile(null)
//         setRemove(false)
//     }

//     return(
//         <form onSubmit={formSubmitHandler}>
//             <input type='file' onChange={selectFileHandler}/>
            
//             { remove && <button onClick={removeFileHandler} type='button'>remove</button>}
                                                                                                  

//             <textarea rows="4" cols="50" ref={textInputRef}></textarea>
//             <button>Post</button>

//         </form>)
// }
// export default CreatePost
