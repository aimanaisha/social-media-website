import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import classes from "../components/posts/UserFeed.module.css";
import { db } from "../store/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import DisplayPost from "../components/posts/DisplayPost";
import { getAuth } from "firebase/auth";
import loader from "../assets/loader.svg";

const Profile = () => {
  const auth = getAuth();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (auth.currentUser) {
        let uid = auth.currentUser.uid;
        const q = query(collection(db, "file_posts"), where("uid", "==", uid));
        const data = await getDocs(q);
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } else {
        alert("error");
      }
    };
    getData();
  }, [auth]);

  return (
    <>
      <Navbar />
      <div className={styles.profile}>
        <UserProfile />
      </div>

      <div className={classes.userfeed}>
        <h1 className={styles.heading}>Posts</h1>
        <p>{loading && <img src={loader} />}</p>
        {userData.map((data) => {
          return <DisplayPost data={data} key={data.id} />;
        })}
      </div>
    </>
  );
};

export default Profile;
