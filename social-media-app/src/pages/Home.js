import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserFeed from "../components/UserFeed"

const Home = () => {

    return(
        <>
            
            <Navbar/>
            <h1>Welcome!</h1>
            <CreatePost/>
            <UserFeed/>
        </>
    )
}
export default Home