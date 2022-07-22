import Modal from "../../Layout/Modal"
import { useState } from "react"
import classes from '../settings/ChangePasswd.module.css'
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAuth} from "../../store/AuthContext"
import { db } from "../../store/firebase";


const Comments = (props) => {

    const currentUser = useAuth()
    var current = new Date();
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const collectionRef = collection(db, 'comments')


    const commentHandler = (e) => {
        setComment(e.target.value)
    }
    const submitHandler = async () => {
        if(comment.trim() !== ''){            
            const payload = {post_id: props.postId, posted_by: currentUser.displayName, user_dp: currentUser.photoURL, posted_on: current.toLocaleDateString(), posted_at: current.toLocaleTimeString(), comment: comment.trim()}
            setComment('')
            await addDoc(collectionRef, payload)       
        }
        else{
            alert('empty field')
        }
    }

    const loadCommentsHandler = async () => {
            const q = query(collectionRef, where("post_id", "==", props.postId));
            const data = await getDocs(q);
            setAllComments(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    

    return(
        <Modal onClose={props.onHideBox}>
            
            <h1 className={classes.head}>Comments</h1>
            <div className={classes.container}>
                <label>Got Something to Say?</label>
                <input className={classes.input} type='text' placeholder="Your Comment" onChange={commentHandler} value={comment}/>
                <button className={classes.updatebtn} onClick={submitHandler}>Post</button>
            </div>
            <button className={classes.loadbtn} onClick={loadCommentsHandler}>Load Comments</button>
            <div className={classes.container}>
            {allComments.map((data)=>{
                return(
                <div key={data.id} className={classes.commentbox}>            
                        <img className={classes.dp} src={data.user_dp} alt=''/>
                        <h3 className={classes.user}>{data.posted_by}</h3>
                        <div className={classes.commentdiv}>
                        <p className={classes.comment}>{data.comment}</p>                    
                        </div>
                    
                </div>)
            })}
            </div>
            
        </Modal>
    )
}
export default Comments