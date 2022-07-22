import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import styles from './Profile.module.css'
import { useEffect, useState } from "react"
import classes from '../components/UserFeed.module.css'
import { db } from "../store/firebase";
import { collection,getDocs, query, where } from "firebase/firestore";
import DisplayPost from "../components/DisplayPost";
import { getAuth } from "firebase/auth";

const Profile = () => {

    const auth = getAuth(); 

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        setLoading(true)
        const getData = async () => {
            if(auth.currentUser){
                let uid = auth.currentUser.uid;
                const q = query(collection(db, 'file_posts'), where("uid", "==", uid));
                const data = await getDocs(q);
                setUserData(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
                setLoading(false)
            }else{
                console.log('error')
            }            
        }
        getData()
    }, [auth])

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
            
        </div>
        </>
        
    )
}

export default Profile