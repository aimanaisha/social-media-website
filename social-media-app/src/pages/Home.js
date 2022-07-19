import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserFeed from "../components/UserFeed"
import DisplayPost from "../components/DisplayPost"
import classes from './Home.module.css'

const Home = () => {

    return(
        <div className="bg">
            
            <Navbar/>
            <div className={classes.home}></div>
            <CreatePost/>
            <DisplayPost/>
        </div>
    )
}
export default Home