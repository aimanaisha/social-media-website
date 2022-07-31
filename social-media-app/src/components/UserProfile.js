import { useState, useEffect } from "react";
import classes from "./UserProfile.module.css";
import { getAuth } from "firebase/auth";
import call from "../assets/call.png";
import mail from "../assets/mail.png";
import location from "../assets/location.png";
import quotel from "../assets/quotel.png";
import quoter from "../assets/quoter.png";
import birthday from "../assets/birthday.png";
import settings from "../assets/settings.png";
import DpSettings from "./settings/DpSettings";
import { Link } from "react-router-dom";
import defaultDp from "../assets/defaultDp.png";
import { db } from "../store/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ChangeUsername from "./settings/ChangeUsername";

const UserProfile = () => {
  const auth = getAuth();
  const [userName, setUserName] = useState("Username");
  const [dp, setDp] = useState(defaultDp);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [userinfo, setUserinfo] = useState([]);
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  const showModalAHandler = () => {
    setShowModalA(true);
  };
  const hideModalAHandler = () => {
    setShowModalA(false);
  };

  useEffect(() => {
    if (auth.currentUser?.photoURL) {
      setDp(auth.currentUser.photoURL);
    }
  }, [auth, showModal]);

  useEffect(() => {
    if (auth.currentUser?.displayName) {
      setUserName(auth.currentUser.displayName);
    }
  }, [auth, showModal]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const q = query(
  //       collection(db, "user_info"),
  //       where("uid", "==", auth.currentUser.uid)
  //     );
  //     const data = await getDocs(q);
  //     setUserinfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getData();
  // }, []);

  useEffect(() => {
    const q = query(
      collection(db, "user_info"),
      where("uid", "==", auth.currentUser.uid)
    );
    const snap = () => {
      onSnapshot(q, (snapshot) => {
        setUserinfo(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    snap();
  }, []);

  return (
    <>
      {showModal && <DpSettings onHideBox={hideModalHandler} />}
      {showModalA && <ChangeUsername onHideBox={hideModalAHandler} />}

      <div className={classes.container}>
        <div className={classes.dpbg}>
          <img className={classes.dp} src={dp} alt="error" />
        </div>
        <img
          className={classes.dpsettings}
          src={settings}
          alt=""
          onClick={showModalHandler}
        />
        <div className={classes.namediv}>
          <h1 className={classes.username}>{userName}</h1>
          <img
            className={classes.unameupdate}
            src={settings}
            alt=""
            onClick={showModalAHandler}
          />
        </div>

        {userinfo.map((data) => {
          return (
            <div key={data.id}>
              <p className={classes.bio}>
                <img className={classes.quote} src={quotel} alt="error" />
                {data.bio}
                <img className={classes.quote} alt="error" src={quoter} />
              </p>
              <div className={classes.aboutborder}>
                <div className={classes.about}>
                  <div className={classes.infodiv}>
                    <img
                      className={classes.infoimg}
                      alt="error"
                      src={location}
                    />
                    <h2 className={classes.info}>Lives in {data.location}</h2>
                  </div>
                  <div className={classes.infodiv}>
                    <img className={classes.infoimg} alt="error" src={call} />
                    <h2 className={classes.info}>
                      Give a call at {data.phone}
                    </h2>
                  </div>
                  <div className={classes.infodiv}>
                    <img
                      className={classes.infoimg}
                      alt="error"
                      src={birthday}
                    />
                    <h2 className={classes.info}>Born on {data.dob}</h2>
                  </div>
                  <div className={classes.infodiv}>
                    <img className={classes.infoimg} alt="error" src={mail} />
                    <h2 className={classes.info}>
                      Drop a mail at {auth.currentUser?.email}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <br />
        <Link to="/settings" className={classes.settings}>
          {" "}
          <img
            className={classes.biosettings}
            alt="error"
            src={settings}
          />{" "}
        </Link>
      </div>
    </>
  );
};

export default UserProfile;
