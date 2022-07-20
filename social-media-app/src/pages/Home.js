import UserFeed from "../components/UserFeed"
import Navbar from "../components/Navbar"
import classes from './Home.module.css'
import Modal from "../Layout/Modal"
import { useState } from "react"
import Post from "../components/Post"

const Home = () => {

    const [showModal, setShowModal] = useState(false)

  const showModalHandler = () => {
    console.log('hi')
    setShowModal(true)
  }

  const hideModalHandler = () => {
    setShowModal(false)
  }

    return(
        <div className="bg">
            
            <Navbar/> 
            <div className={classes.home}>
              <Post/>
              <UserFeed/>
            </div>

            {showModal && <Modal onClose={hideModalHandler}/>}            
            <button onClick={showModalHandler}>show modal</button>

        </div>
    )
}
export default Home