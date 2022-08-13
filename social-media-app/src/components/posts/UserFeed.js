import { useEffect, useState } from "react";
import classes from "./UserFeed.module.css";
import { db } from "../../store/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import DisplayPost from "./DisplayPost";

import loader from "../../assets/loader.svg";


const UserFeed = () => {
  // const auth = getAuth();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(db, "file_posts");

  useEffect(
    () =>{
    setLoading(true)
    const snap = () => {onSnapshot( collectionRef, (snapshot) => {
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setLoading(false)
    })}
    snap();
} 
, [])

  return (
    <div className={classes.feed}>
      <p className={classes.loader}>{loading && <img src={loader} alt=''/>}</p>
      {userData.map((data) => {
        return <DisplayPost data={data} key={data.id} />;
      })}
    </div>
  );
};

export default UserFeed;
