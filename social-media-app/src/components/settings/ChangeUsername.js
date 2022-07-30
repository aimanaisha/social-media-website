import Modal from "../../Layout/Modal";
import classes from "./ChangePasswd.module.css";
import { username, useAuth } from "../../store/AuthContext";
import { useState } from "react";
import {
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../store/firebase";

const ChangeUsername = (props) => {
  const currentUser = useAuth();
  const [userName, setUserName] = useState("");

  const usernameHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = async () => {
    if (userName.trim() === "") {
      alert("Please set a Username");
    } else {
      props.onHideBox();
      alert("Your Username Will be Changed");

      await username(userName.trim(), currentUser);
      setUserName("");

      const q = query(
        collection(db, "file_posts"),
        where("uid", "==", currentUser.uid)
      );
      const data = await getDocs(q);
      data.docs.map(async (post) => {
        await updateDoc(doc(db, "file_posts", post.id), {
          posted_by: currentUser.displayName,
        });
      });
      const query = query(
        collection(db, "notifications"),
        where("done_by_id", "==", currentUser.uid)
      );
      const notifications = await getDocs(q);
      notifications.docs.map(async (post) => {
        await updateDoc(doc(db, "notifications", post.id), {
          done_by: currentUser.displayName,
        });
      });
      const qry = query(
        collection(db, "comments"),
        where("uid", "==", currentUser.uid)
      );
      const comments = await getDocs(qry);
      comments.docs.map(async (post) => {
        await updateDoc(doc(db, "comments", post.id), {
          posted_by: currentUser.displayName,
        });
      });
    }
  };
  return (
    <Modal onClose={props.onHideBox}>
      <h1 className={classes.head}>Change Username</h1>
      <div className={classes.container}>
        <input
          className={classes.input}
          type="text"
          placeholder="Your Username"
          onChange={usernameHandler}
          value={userName}
        />
        <button className={classes.updatebtn} onClick={submitHandler}>
          Change
        </button>
      </div>
    </Modal>
  );
};
export default ChangeUsername;
