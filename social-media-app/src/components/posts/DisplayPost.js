import { useState } from "react";
import classes from "./UserFeed.module.css";
import comment from "../../assets/comment1.png";
import defaultDp from "../../assets/defaultDp.png";
import deleteBtn from "../../assets/delete.png";
import Comments from "./Comments";
import Likes from "./Likes";
import DeletePost from "./DeletePost";
import { getAuth } from "firebase/auth";


const DisplayPost = (props) => {
  const auth = getAuth();
  const [data, setData] = useState();
  const [datA, setDatA] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


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
      {showModal && <Comments onHideBox={hideModalHandler} postId={data.id} postUser={props.data.uid} postUserDp={props.data.user_dp} postedImg={props.data.file_url}/>}
      {showDeleteModal && <DeletePost onHideBox={hideDeleteModalHandler} postId={datA.id}/>}
     
      <div className={classes.top}>
      <div className={classes.user}>
        <img
          className={classes.dp}
          alt="error"
          src={props.data.user_dp ? props.data.user_dp : defaultDp}
        />
        <h1 className={classes.username}>{props.data.posted_by}</h1>
      </div>

      <button onClick={showDeleteModalHandler} className={props.data.uid===auth.currentUser.uid ? classes.btn : classes.hidebtn}>
          <img className={ classes.deletebtn } src={deleteBtn} alt="" />
        </button>
      </div>

      <p className={classes.text}>{props.data.caption}</p>
      <img className={classes.postedimg} src={props.data.file_url} alt="" />
      <div className={classes.bottom}>
        <div className={classes.like_comment}>
          <Likes postId={props.data.id} postUser={props.data.uid} postUserDp={props.data.user_dp} postedImg={props.data.file_url}/>
          <button className={classes.button} onClick={showModalHandler}>
            <img className={classes.imgbtn} src={comment} alt="" />
          </button>
        </div>
        <div className={classes.timestamp}>
          <h2 className={classes.date}>{props.data.posted_on}</h2>
          <h2 className={classes.date}>{props.data.posted_at}</h2>
        </div>
      </div>
    </div>
  );
};
export default DisplayPost;
