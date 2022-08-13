import UserFeed from "../components/posts/UserFeed";
import Navbar from "../components/Navbar";
import classes from "./Home.module.css";
import Notifications from "../components/Notifications/Notifications";

const Home = () => {
  return (
    <div className="bg">
      <Navbar />
      <div className={classes.home}>
        <UserFeed className={classes.feed}/>
        <Notifications className={classes.notif}/>
      </div>
    </div>
  );
};
export default Home;
