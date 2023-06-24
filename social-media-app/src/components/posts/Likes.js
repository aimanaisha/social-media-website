import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../store/firebase";
import { getAuth } from "firebase/auth";
import unlike1 from "../../assets/unlike1.png";
import like from "../../assets/like1.png";
import classes from "./UserFeed.module.css";

const Likes = (props) => {
  const auth = getAuth();
  const [allLikes, setAllLikes] = useState([]);
  const collectionRef = collection(db, "Likes");
  const [userLike, setUserLike] = useState([]);
  const [likeState, setLikeState] = useState(false);
  var current = new Date();

  useEffect(() => {
    const getLikes = async () => {
      const q = query(collectionRef, where("postId", "==", props.postId));
      const data = await getDocs(q);
      setUserLike(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((like) => {
            return like.uid === auth.currentUser.uid;
          })
      );
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map((like) => {
          if (like.uid === auth.currentUser.uid) {
            setLikeState(true);
          }
        });
    };
    getLikes();
  }, [likeState, auth.currentUser.uid, collectionRef, props.postId]);

  useEffect(() => {
    const getLikes = async () => {
      const q = query(collectionRef, where("postId", "==", props.postId));
      const data = await getDocs(q);
      setAllLikes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLikes();
  }, [likeState, props.postId, collectionRef]);

  const test = async () => {
    if (userLike.length !== 0) {
      setLikeState(false);
      await deleteDoc(doc(db, "Likes", userLike[0].id));
    } else {
      setLikeState(true);
      const payload = { uid: auth.currentUser.uid, postId: props.postId };
      await addDoc(collectionRef, payload);
      await addDoc(collection(db, "notifications"), {
        type: "liked",
        done_by_id: auth.currentUser.uid,
        done_by: auth.currentUser.displayName,
        post_user: props.postUser,
        user_dp: auth.currentUser.photoURL,
        posted_img: props.postedImg,
        timestamp: current,
      });
    }
  };
  return (
    <>
      <button className={classes.button} onClick={test}>
        <img
          alt=""
          className={classes.imgbtn}
          src={likeState === true ? like : unlike1}
        />
        <p className={classes.likes}>{allLikes.length} Likes</p>
      </button>
    </>
  );
};
export default Likes;
