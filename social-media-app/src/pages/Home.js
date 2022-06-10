import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserFeed from "../components/UserFeed"
import DisplayPost from "../components/DisplayPost"

const Home = () => {

    return(
        <>
            
            <Navbar/>
            <h1>Welcome!</h1>
            <CreatePost/>
            <DisplayPost/>
        </>
    )
}
export default Home