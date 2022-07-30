import { useAuth, upload } from "../../store/AuthContext";
import { useState } from "react";
import Modal from "../../Layout/Modal";
import classes from "./DpSettings.module.css";
import ImageUploader from "react-images-upload";
import { updateDoc, collection, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../../store/firebase";

const DpSettings = (props) => {
  const btnstyles = {
    backgroundColor: "#CDB4DB",
    borderRadius: "0px",
    border: "solid black 2px",
    color: "black",
    padding: "0.8rem 2rem",
    fontFamily: "Mali, cursive",
    fontSize: "1.1rem",
    marginTop: "20px",
  };
  const stylesA = {
    backgroundColor: "white",
    padding: "1.5rem 1.9rem",
    boxShadow: "none",
  };

  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(false);

  const imageChangeHandler = (event) => {
    if (event[0]) {
      setPhoto(event[0]);
      setPreview(true);
    } else {
      alert("nothing is selected");
    }
  };
  const imageUploadHandler = async () => {
    props.onHideBox();
    alert("Your Display Picture Will be Changed");

    await upload(photo, currentUser);
    setPhoto(null);

    const q = query(
      collection(db, "file_posts"),
      where("uid", "==", currentUser.uid)
    );
    const data = await getDocs(q);
    data.docs.map(async (post) => {
      await updateDoc(doc(db, "file_posts", post.id), {
        user_dp: currentUser.photoURL,
      });
    });

    const query = query(
      collection(db, "notifications"),
      where("done_by_id", "==", currentUser.uid)
    );
    const notifications = await getDocs(q);
    notifications.docs.map(async (post) => {
      await updateDoc(doc(db, "notifications", post.id), {
        user_dp: currentUser.photoURL,
      });
    });
    const qry = query(
      collection(db, "comments"),
      where("uid", "==", currentUser.uid)
    );
    const comments = await getDocs(qry);
    comments.docs.map(async (post) => {
      await updateDoc(doc(db, "comments", post.id), {
        user_dp: currentUser.photoURL,
      });
    });
  };

  return (
    <Modal onClose={props.onHideBox}>
      <h1 className={classes.head}>Change Display Picture</h1>
      <div>
        <ImageUploader
          withIcon={preview ? false : true}
          buttonStyles={btnstyles}
          fileContainerStyle={stylesA}
          withPreview={preview}
          buttonText="Choose a Picture"
          withLabel={false}
          singleImage={true}
          onChange={imageChangeHandler}
        />

        {preview && (
          <button onClick={imageUploadHandler} className={classes.upload}>
            upload
          </button>
        )}
      </div>
    </Modal>
  );
};
export default DpSettings;
