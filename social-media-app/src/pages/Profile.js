import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import styles from './Profile.module.css'
import { useEffect, useState } from "react"
import classes from '../components/UserFeed.module.css'
import { useAuth} from "../store/AuthContext"
import { db } from "../store/firebase";
import { collection,getDocs, query, where } from "firebase/firestore";
import DisplayPost from "../components/DisplayPost";

const Profile = () => {
 
    const currentUser = useAuth()
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const [uid, setUid] = useState('')

    useEffect(()=> {
        setLoading(true)
        const getData = async () => {
            const q = query(collection(db, 'file_posts'), where("uid", "==", uid));
            const data = await getDocs(q);
            setUserData(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
            setLoading(false)
        }
        getData()
    }, [])
    const testdoc = () => {
        console.log(currentUser)
    }

    return (
        <>
        <Navbar/>
        <div className={styles.profile}>
        <UserProfile/>
        </div>

        <div className={classes.userfeed}>
            <p>{loading && 'loading...'}</p> 

      <h1 className={styles.heading}>Posts</h1>
      {userData.map((data)=>{
            return(
                <div key={data.id}>
                <DisplayPost data={data} />
                </div>
            )                        
        })}

            
            {/* {userData.map((data)=>{ if(currentUser.uid === data.posted_by){
                return (<div className={classes.Userpost} key={data.id}>
                    <div className={classes.user}>
                        <img className={classes.dp} alt='error' src={data.user_dp ? data.user_dp : defaultDp}/>
                        <h1 className={classes.username}>{data.posted_by}</h1>
                    </div>
                    <p className={classes.text}>{data.caption}</p>
                    <img className={classes.postedimg} src={data.file_url} alt=''/>
                    <div className={classes.bottom}>
                        <div>
                            <button className={classes.button}><img className={classes.imgbtn} src={like} alt='' /></button>
                            <button className={classes.button}><img className={classes.imgbtn} src={comment} alt=''/></button>
                        </div>
                        <div className={classes.timestamp}>
                        <h2 className={classes.date}>{data.posted_on}</h2>
                        <h2 className={classes.date}>{data.posted_at}</h2>
                        </div>
                    </div>
                    
                </div>)
            }
                
            })} */}
            <button onClick={testdoc}>abc</button>
            
        </div>
        </>
        
    )
}

export default Profile