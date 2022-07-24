import { Link } from "react-router-dom";
import { logout } from "../store/AuthContext";
import classes from "./Navbar.module.css";
import home from "../assets/home.png";
import profile from "../assets/profile.png";
import logOut from "../assets/logout.png";

const Navbar = () => {
  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      <nav className={classes.nav}>
        <svg
          className={classes.test}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#CDB4DB"
            fillOpacity="1"
            d="M0,192L120,165.3C240,139,480,85,720,74.7C960,64,1200,96,1320,112L1440,128L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          ></path>
        </svg>
        <div className={classes.ul}>
          <div className={classes.left}>
            <div>
              <Link to="/home" className={classes.li}>
                <img src={home} className={classes.image} alt="" />
              </Link>
            </div>
            <div>
              <Link to="/profile" className={classes.li}>
                <img src={profile} alt="" className={classes.image} />
              </Link>
            </div>
          </div>
          <div>
            <Link to="/login">
              <button onClick={logoutHandler} className={classes.button}>
                <img src={logOut} className={classes.image} alt="" />
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
