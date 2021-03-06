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
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .map((like) => {
          if (like.uid === auth.currentUser.uid) {
            setLikeState(true);
          }
        });
    };
    getLikes();
  }, [likeState]);

  useEffect(() => {
    const getLikes = async () => {
      const q = query(collectionRef, where("postId", "==", props.postId));
      const data = await getDocs(q);
      setAllLikes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLikes();
  }, [likeState]);

  const test = async () => {
    if (userLike.length !== 0) {
      setLikeState(false);
      await deleteDoc(doc(db, "Likes", userLike[0].id));
      console.log("already liked, unlike", userLike);
    } else {
      setLikeState(true);
      const payload = { uid: auth.currentUser.uid, postId: props.postId };
      await addDoc(collectionRef, payload);
      console.log("not liked, like", userLike);
    }
  };
  return (
    <>
      <button className={classes.button} onClick={test}>
        <img
          className={classes.imgbtn}
          src={likeState === true ? like : unlike1}
        />
        <p className={classes.likes}>{allLikes.length} Likes</p>
      </button>
    </>
  );
};
export default Likes;
