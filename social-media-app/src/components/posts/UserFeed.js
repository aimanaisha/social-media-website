import { useEffect, useState } from "react";
import classes from "./UserFeed.module.css";
import { db } from "../../store/firebase";
import { collection, getDocs } from "firebase/firestore";
import DisplayPost from "./DisplayPost";
import { getAuth } from "firebase/auth";
import loader from "../../assets/loader.svg";


const UserFeed = () => {
  const auth = getAuth();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(db, "file_posts");

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (auth.currentUser) {
        const data = await getDocs(collectionRef);
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } else {
        alert("error");
      }
    };
    getData();
  }, [auth]);


  return (
    <div className={classes.feed}>
      <p>{loading && <img src={loader} />}</p>
      {userData.map((data) => {
        return <DisplayPost data={data} key={data.id} />;
      })}
    </div>
  );
};

export default UserFeed;
