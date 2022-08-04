import UserFeed from "../components/posts/UserFeed";
import Navbar from "../components/Navbar";
import classes from "./Home.module.css";
import Post from "../components/posts/Post";
import Notifications from "../components/Notifications";

const Home = () => {
  return (
    <div className="bg">
      <Navbar />
      <div className={classes.home}>
        {/* <Post/> */}
        <UserFeed />
        <Notifications className={classes.notif}/>
      </div>
    </div>
  );
};
export default Home;
