import Modal from "../../Layout/Modal";
import { useState, useEffect, useCallback } from "react";
import classes from "../settings/ChangePasswd.module.css";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../store/AuthContext";
import { db } from "../../store/firebase";
import cross from "../../assets/cross.png";

const Comments = (props) => {
  const currentUser = useAuth();
  var current = new Date();
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const collectionRef = collection(db, "comments");

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  //  POST COMMENT
  const submitHandler = async () => {
    if (comment.trim() !== "") {
      const payload = {
        post_id: props.postId,
        posted_by: currentUser.displayName,
        posted_by_id: currentUser.uid,
        user_dp: currentUser.photoURL,
        posted_on: current.toLocaleDateString(),
        posted_at: current.toLocaleTimeString(),
        comment: comment.trim(),
      };
      setComment("");
      await addDoc(collectionRef, payload);
      await addDoc(collection(db, "notifications"), {
        type: "commented on",
        done_by_id: currentUser.uid,
        done_by: currentUser.displayName,
        post_user: props.postUser,
        user_dp: props.postUserDp,
        posted_img: props.postedImg,
      });
    } else {
      alert("empty field");
    }
  };

  //  LOAD COMMENTS
  useEffect(() => {
    const q = query(collectionRef, where("post_id", "==", props.postId));
    const snap = () => {
      onSnapshot(q, (snapshot) => {
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    snap();
  }, []);

  //   DELETE COMMENTS
  const deleteCommentHandler = useCallback(
    (id) => async () => {
      await deleteDoc(doc(db, "comments", id));
    },
    []
  );

  return (
    <Modal onClose={props.onHideBox}>
      <h1 className={classes.head}>Comments</h1>
      <div className={classes.container}>
        <label>Got Something to Say?</label>
        <input
          className={classes.input}
          type="text"
          placeholder="Your Comment"
          onChange={commentHandler}
          value={comment}
        />
        <button className={classes.updatebtn} onClick={submitHandler}>
          Post
        </button>
      </div>
      <div className={classes.container}>
        {allComments.map((data) => {
          return (
            <div key={data.id} className={classes.commentbox}>
              <div className={classes.align}>
                <img className={classes.dp} src={data.user_dp} alt="" />
                <h3 className={classes.user}>{data.posted_by}</h3>
                <div className={classes.commentdiv}>
                  <p className={classes.comment}>{data.comment}</p>
                </div>
              </div>
              <img
                className={data.posted_by_id === currentUser.uid ? classes.delete : classes.hide_delete}
                src={cross}
                alt=""
                onClick={deleteCommentHandler(data.id)}
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
export default Comments;
