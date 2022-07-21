import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import styles from './Profile.module.css'
import defaultDp from '../assets/defaultDp.png'
import { useEffect, useState } from "react"
import classes from '../components/UserFeed.module.css'
import { useAuth} from "../store/AuthContext"
import { db } from "../store/firebase";
import { collection,getDocs } from "firebase/firestore";
import like from '../assets/like1.png'
import comment from '../assets/comment1.png'

const Profile = () => {

    const currentUser = useAuth()
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        setLoading(true)
        const getData = async () => {
            const data = await getDocs(collection(db, 'file_posts'));
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

            
            {userData.map((data)=>{ if(currentUser.uid === data.posted_by){
                return (<div className={classes.Userpost}>
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
                
            })}
            <button onClick={testdoc}>abc</button>
            
        </div>
        </>
        
    )
}

export default Profile