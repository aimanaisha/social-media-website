import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../store/firebase";
import { getAuth } from "firebase/auth";
import classes from "./Notifications.module.css";

const Notifications = () => {
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  var current = new Date().toDateString()
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("post_user", "==", uid)
    );
    const snap = () => {
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setNotifications(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };

    snap();
  }, []);

  return (
    <div className={classes.container}>
        <h2 className={classes.head}>Notifications</h2>
      {notifications.map((data) => {
        return (
          <div className={classes.notific}>
            <img className={classes.dp} src={data.user_dp} alt="" />
            <div className={classes.middle}>
              <p className={classes.info}>
                {data.done_by} {data.type} your post.
              </p>
              <p className={classes.date}>
                {current}
              </p>
            <div className={classes.border}></div>

            </div>
            <img className={classes.post} src={data.posted_img} alt="" />
          </div>
        );
      })}
    </div>
  );
};
export default Notifications;
