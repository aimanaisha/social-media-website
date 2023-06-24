import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import classes from "../components/posts/UserFeed.module.css";
import { db } from "../store/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DisplayPost from "../components/posts/DisplayPost";
import { getAuth } from "firebase/auth";
import loader from "../assets/loader.svg";

const Profile = () => {
  const auth = getAuth();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, "file_posts"),
      where("uid", "==", auth.currentUser.uid)
    );
    const snap = () => {
      onSnapshot(q, (snapshot) => {
        setUserData(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false)
      });
    };
    snap();
  }, [auth.currentUser.uid]);

  return (
    <>
      <Navbar />
      <div className={styles.profile}>
        <UserProfile />
      </div>
      {userData.length ===0 && <h1 className={styles.heading}>No Posts to Show</h1>}
      <div className={classes.userfeed}>
        <p>{loading && <img src={loader} alt=""/>}</p>
        {userData.map((data) => {
          return <DisplayPost data={data} key={data.id} />;
        })}
      </div>
    </>
  );
};

export default Profile;
