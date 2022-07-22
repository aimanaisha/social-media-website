import UserFeed from "../components/posts/UserFeed"
import Navbar from "../components/Navbar"
import classes from './Home.module.css'
import Post from "../components/posts/Post"

const Home = () => {

    return(
        <div className="bg">
            
            <Navbar/> 
            <div className={classes.home}>
              <Post/>
              <UserFeed/>
            </div>
        </div>
    )
}
export default Home