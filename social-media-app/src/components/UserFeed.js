import { useEffect, useState } from "react"
import classes from './UserFeed.module.css'
import { db } from "../store/firebase";
import { collection,getDocs } from "firebase/firestore";
import DisplayPost from "./DisplayPost";


const UserFeed = () => {

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
    
    
    return(
        <div className={classes.feed}>
            <p>{loading && 'loading...'}</p>
        {userData.map((data)=>{
            return(
                <div key={data.id}>
                <DisplayPost data={data} />
                </div>
            )                        
        })}
        </div>
        
    )
}

export default UserFeed