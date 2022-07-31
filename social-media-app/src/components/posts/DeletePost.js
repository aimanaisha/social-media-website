import Modal from "../../Layout/Modal";
import { doc, deleteDoc, query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../store/firebase";
import classes from "../settings/ChangePasswd.module.css";


const DeletePost = (props) => {

  const deletePostHandler = async () => {
    await deleteDoc(doc(db, "file_posts", props.postId));
    props.onHideBox();
    const querY = query(
      collection(db, "comments"),
      where("post_id", "==", props.postId)
    );
    const comments = await getDocs(querY);
    comments.docs.map(async (post) => {
      await deleteDoc(doc(db, "comments", post.id));
    });

    const q = query(
      collection(db, "likes"),
      where("postId", "==", props.postId)
    );
    const likes = await getDocs(q);
        likes.docs.map(async (post) => {
      await deleteDoc(doc(db, "likes", post.id));
    });
  };

  return (
    <Modal onClose={props.onHideBox}>
      <h1 className={classes.head}>Are You Sure You Want to Delete this Post?</h1>
      <div>
        <button className={classes.updatebtn} onClick={props.onHideBox}>No</button>
        <button className={classes.loadbtn} onClick={deletePostHandler}>Yes</button>
      </div>
    </Modal>
  );
};
export default DeletePost;
