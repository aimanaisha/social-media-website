import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import classes from './Profile.module.css'
const Profile = () => {

    return (
        <>
        <Navbar/>
        <div className={classes.profile}>
        <UserProfile/>
        </div>
        </>
        
    )
}

export default Profile