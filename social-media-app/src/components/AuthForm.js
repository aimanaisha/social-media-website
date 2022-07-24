import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { signup, login, signInWithGoogle } from "../store/AuthContext";
import google from "../assets/google.png";
import Modal from "../Layout/Modal";

const AuthForm = () => {
  const [errorMessage, setErrorMessage] = useState("none");
  const [signIn, setSignIn] = useState(true);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  const loginToggleHandler = () => {
    setSignIn((prevState) => !prevState);
  };
  const googleLogin = () => {
    signInWithGoogle();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value.trim();
    const enteredPassword = passwordRef.current.value;

    let confirmPassword;

    if (signIn) {
      confirmPassword = enteredPassword;
    } else {
      confirmPassword = confirmPasswordRef.current.value;
    }
    if (enteredPassword === confirmPassword) {
      if (!signIn) {
        signup(enteredEmail, enteredPassword)
          .then(() => history.replace("/AccInfo"))
          .catch((error) => {
            console.log(error.message);
            if (error.code === "auth/weak-password") {
              setErrorMessage("Password Should be atleast 6 Characters!");
            } else if (error.code === "auth/email-already-in-use") {
              setErrorMessage("Oops! Email is already in use");
            } else {
              setErrorMessage(error.code);
            }
            showModalHandler();
          });
      } else {
        login(enteredEmail, enteredPassword)
          .then(() => history.replace("/home"))
          .catch((error) => {
            console.log(error.code);
            if (error.code === "auth/wrong-password") {
              setErrorMessage("Oops! Wrong Password");
            } else if (error.code === "auth/user-not-found") {
              setErrorMessage("Oops! Email Not Found");
            } else {
              setErrorMessage(error.code);
            }
            showModalHandler();
          });
      }
    } else {
      alert("Passwords do Not Match");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {showModal && <Modal onClose={hideModalHandler}>{errorMessage}</Modal>}
      <div className={classes.container}>
        <div className={classes.leftbox}>
          <h1 className={classes.h1}>
            {signIn ? "Sign in" : "Create New Account"}
          </h1>

          <input
            type="email"
            required
            id="email"
            ref={emailRef}
            className={classes.input}
            placeholder="Your Email"
          />

          <input
            type="password"
            required
            id="password"
            ref={passwordRef}
            className={classes.input}
            placeholder="Your Password"
          />

          {!signIn && (
            <input
              type="password"
              required
              id="confirmPassword"
              ref={confirmPasswordRef}
              className={classes.input}
              placeholder="Confirm Password"
            />
          )}

          <button className={classes.loginbutton}>
            {signIn ? "Login In" : "Sign Up"}
          </button>
          <p>OR</p>
          <button className={classes.googlebutton} onClick={googleLogin}>
            <img className={classes.google} src={google} alt="" />
            <span>Login With Google</span>
          </button>
        </div>

        <div className={classes.rightbox}>
          <h1 className={classes.adventure}>“Adventure, without it,</h1>{" "}
          <h1 className={classes.adventure}>why live?”</h1>
          <h2 className={classes.started}>LET'S GET STARTED!</h2>
          <h3 className={classes.noaccount} onClick={loginToggleHandler}>
            {signIn ? "Don't have an account?" : "Already a Member?"}
          </h3>
          <button
            className={classes.signupbutton}
            type="button"
            onClick={loginToggleHandler}
          >
            {signIn ? "Start for Free" : "Log In"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
