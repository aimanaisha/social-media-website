import { useState, useEffect } from "react";
import classes from "./UserFeed.module.css";
import commentBtn from "../../assets/comment1.png";
import defaultDp from "../../assets/defaultDp.png";
import deleteBtn from "../../assets/cross.png";
import send from "../../assets/send.png";
import Comments from "./Comments";
import Likes from "./Likes";
import DeletePost from "./DeletePost";
import {orderBy,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../store/firebase";
import { getAuth } from "firebase/auth";

const DisplayPost = (props) => {
  const auth = getAuth();
  const [data, setData] = useState();
  const [datA, setDatA] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  var current = new Date();
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const collectionRef = collection(db, "comments");
  const [state, setState] = useState(false);

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  //  POST COMMENT
  const submitHandler = async () => {
    if (comment.trim() !== "") {
      const payload = {
        post_id: props.data.id,
        posted_by: auth.currentUser.displayName,
        posted_by_id: auth.currentUser.uid,
        user_dp: auth.currentUser.photoURL,
        posted_on: current.toLocaleDateString(),
        posted_at: current.toLocaleTimeString(),
        timestamp: current,
        comment: comment.trim(),
      };
      setComment("");
      await addDoc(collectionRef, payload);
      await addDoc(collection(db, "notifications"), {
        type: "commented on",
        done_by_id: auth.currentUser.uid,
        done_by: auth.currentUser.displayName,
        post_user: props.data.uid,
        user_dp: auth.currentUser.photoURL,
        posted_img: props.data.file_url,
        timestamp: current,
      });
    } else {
      alert("empty field");
    }
  };

  //  LOAD COMMENTS
  useEffect(() => {
    const q = query(
      collectionRef,
      where("post_id", "==", props.data.id),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const snap = () => {
      onSnapshot(q, (snapshot) => {
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    snap();
  }, []);

  const showModalHandler = () => {
    setData(props.data);
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  const showDeleteModalHandler = () => {
    setDatA(props.data);
    setShowDeleteModal(true);
  };
  const hideDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={classes.post} key={props.data.id}>
      {showModal && (
        <Comments
          onHideBox={hideModalHandler}
          postId={data.id}
          postUser={props.data.uid}
          postUserDp={props.data.user_dp}
          postedImg={props.data.file_url}
        />
      )}
      {showDeleteModal && (
        <DeletePost onHideBox={hideDeleteModalHandler} postId={datA.id} />
      )}

      <div className={classes.top}>
        <div className={classes.user}>
          <img
            className={classes.dp}
            alt="error"
            src={props.data.user_dp ? props.data.user_dp : defaultDp}
          />
          <h1 className={classes.username}>{props.data.posted_by}</h1>
        </div>

        <button
          onClick={showDeleteModalHandler}
          className={
            props.data.uid === auth.currentUser.uid
              ? classes.btn
              : classes.hidebtn
          }
        >
          <img className={classes.deletebtn} src={deleteBtn} alt="" />
        </button>
      </div>
      {props.data.caption !== "" && (
        <p className={classes.text}>{props.data.caption}</p>
      )}

      <img className={classes.postedimg} src={props.data.file_url} alt="" />
      <div className={classes.bottom}>
        <div className={classes.like_comment}>
          <Likes
            postId={props.data.id}
            postUser={props.data.uid}
            postUserDp={props.data.user_dp}
            postedImg={props.data.file_url}
          />
          <button className={classes.button} onClick={showModalHandler}>
            <img className={classes.imgbtn} src={commentBtn} alt="" />
          </button>
        </div>
        <div className={classes.timestamp}>
          <h2 className={classes.date}>{props.data.posted_on}</h2>
          <h2 className={classes.date}>{props.data.posted_at}</h2>
        </div>
      </div>
      <div className={classes.comment_section}>
        <input
          className={classes.input}
          type="text"
          placeholder="Add a Comment....."
          onChange={commentHandler}
          value={comment}
        />
        <img src={send} className={classes.post_btn} onClick={submitHandler}/>
      </div>
      {allComments.map((data) => {
        return (
          <div key={data.id} className={classes.comment_div}>
            <div className={classes.comment_user}>
              <img src={data.user_dp} className={classes.comment_dp} alt="" />
              <h4 className={classes.comment_username}>{data.posted_by}</h4>
            </div>
            <p className={classes.comment_text}>{data.comment}</p>
          </div>
        );
      })}
    </div>
  );
};
export default DisplayPost;
