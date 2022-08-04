import { useState } from "react";
import ImageUploader from "react-images-upload";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../store/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../store/AuthContext";
import classes from "./Post.module.css";
import Modal from '../../Layout/Modal'

const Post = (props) => {
  const currentUser = useAuth();
  var current = new Date()

  const btnstyles = {
    backgroundColor: "#CDB4DB",
    borderRadius: "12px",
    border: "solid black 2px",
    color: "black",
    padding: "0.8rem 2rem",
    fontFamily: "Mali, cursive",
    fontSize: "1.1rem",
    marginTop: "20px",
  };
  const styles = {
    background: 'none',
    boxShadow: "none",
  };
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [text, setText] = useState("");

  const CaptionHandler = (e) => {
    setText(e.target.value.trim());
  };

  const selectFileHandler = (event) => {
    if (event[0]) {
      setFile(event[0]);
      setPreview(true);
    } else {
      alert("Nothing is selected");
    }
  };

  const uploadFileHandler = async () => {
    if (file) {
      props.onHideBox()
      setPreview(false);
      const fileRef = ref(storage, `posts/${currentUser.uid}/${file.name}.png`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      const collectionRef = collection(db, "file_posts");
      const payload = {
        file_name: file.name,
        file_url: photoURL,
        posted_by: currentUser.displayName,
        user_dp: currentUser.photoURL,
        posted_on: current.toDateString(),
        posted_at: current.toLocaleTimeString(),
        caption: text,
        uid: currentUser.uid,
      };
      await addDoc(collectionRef, payload);
      setText("");
    } else {
      alert("choose a file");
    }
  };

  const discardFileHandler = () => {
    setPreview(false);
    setFile(null);
  };

  return (
    <Modal onClose={props.onHideBox}>
    <div className={classes.border}>
      <div className={classes.container}>
        <h1 className={classes.head}>Show Us What You've Got!</h1>

        <ImageUploader
          withIcon={preview ? false : true}
          buttonStyles={btnstyles}
          fileContainerStyle={styles}
          withPreview={preview}
          buttonText="Choose a Picture"
          withLabel={false}
          singleImage={true}
          onChange={selectFileHandler}
          onDelete={discardFileHandler}
        />
        {preview && (
          <textarea
            id="caption"
            placeholder="What's on Your Mind?"
            className={classes.textarea}
            maxLength="500"
            rows="2"
            cols="45"
            onChange={CaptionHandler}
          />
        )}

        <div className={preview ? classes.btns : classes.btnB}>
          {preview && (
            <button className={classes.discard} onClick={discardFileHandler}>
              Discard
            </button>
          )}
          {preview && (
            <button onClick={uploadFileHandler} className={classes.upload}>
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
    </Modal>
  );
};
export default Post;
