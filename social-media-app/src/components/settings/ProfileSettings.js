import { Link } from "react-router-dom";
import classes from "./ProfileSettings.module.css";
import profile from "../../assets/profile.png";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../store/firebase";

const ProfileSettings = () => {
  const auth = getAuth();
  const [userinfo, setUserinfo] = useState();
  const [info, setInfo] = useState({
    dob: "",
    bio: "",
    location: "",
    phone: "",
  });
  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "user_info"),
        where("uid", "==", auth.currentUser.uid)
      );
      const data = await getDocs(q);
      setUserinfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  const dobHandler = (e) => {
    setInfo({ ...info, dob: e.target.value });
  };
  const bioHandler = (e) => {
    setInfo({ ...info, bio: e.target.value });
  };
  const locationHandler = (e) => {
    setInfo({ ...info, location: e.target.value });
  };
  const phoneHandler = (e) => {
    setInfo({ ...info, phone: e.target.value });
  };

  const updateInfoHandler = async () => {
    if (
      info.dob.trim() === "" &&
      info.bio.trim() === "" &&
      info.location.trim() === "" &&
      info.phone.trim() === ""
    ) {
      alert("All Fields are empty");
    } else {
      const dobUpdated =
        info.dob.trim() === "" ? userinfo[0].dob : info.dob.trim();
      const bioUpdated =
        info.bio.trim() === "" ? userinfo[0].bio : info.bio.trim();
      const locationUpdated =
        info.location.trim() === ""
          ? userinfo[0].location
          : info.location.trim();
      const phoneUpdated =
        info.phone.trim() === "" ? userinfo[0].phone : info.phone.trim();
      if (userinfo.length === 0) {
        console.log("add");
        const collectionRef = collection(db, "user_info");
        const payload = {
          dob: dobUpdated,
          bio: bioUpdated,
          location: locationUpdated,
          phone: phoneUpdated,
          uid: auth.currentUser.uid,
        };
        setInfo({
          dob: "",
          bio: "",
          location: "",
          phone: "",
        });
        await addDoc(collectionRef, payload);
      } else {
        console.log(userinfo[0].id);
        const docRef = doc(db, "user_info", userinfo[0].id);
        const payload = {
          dob: dobUpdated,
          bio: bioUpdated,
          location: locationUpdated,
          phone: phoneUpdated,
          uid: auth.currentUser.uid,
        };
        setInfo({
          dob: "",
          bio: "",
          location: "",
          phone: "",
        });
        await updateDoc(docRef, payload);
        alert("Changes were made");
      }
    }
  };

  return (
    <div>
      {/* {showModal && <ChangePasswd onHideBox={hideModalHandler} />} */}
      <Link to="/profile" className={classes.settings}>
        {" "}
        <img className={classes.biosettings} alt="error" src={profile} />{" "}
      </Link>

      <div className={classes.container}>
        <div className={classes.box}>
          <label htmlFor="dob" className={classes.label}>
            Update Your Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className={classes.input}
            onChange={dobHandler}
            value={info.dob}
          />
        </div>
        <div className={classes.box}>
          <label htmlFor="bio" className={classes.label}>
            Update Your Bio
          </label>
          <input
            type="text"
            id="bio"
            className={classes.input}
            onChange={bioHandler}
            value={info.bio}
          />
        </div>
        <div className={classes.box}>
          <label htmlFor="location" className={classes.label}>
            Update Your Location
          </label>
          <input
            type="text"
            id="location"
            className={classes.input}
            onChange={locationHandler}
            value={info.location}
          />
        </div>
        <div className={classes.box}>
          <label htmlFor="phone" className={classes.label}>
            Update Your Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className={classes.input}
            onChange={phoneHandler}
            value={info.phone}
          />
        </div>
        <div className={classes.btnbox}>
          <button className={classes.discardbtn}>Discard</button>
          <button className={classes.updatebtn} onClick={updateInfoHandler}>
            Make Changes
          </button>
        </div>
        {/* <div className={classes.box}>
                <button className={classes.password} onClick={showModalHandler}>Change Password</button>
                </div> */}
      </div>
    </div>
  );
};
export default ProfileSettings;
