import { Link } from "react-router-dom"
import { logout } from "../store/AuthContext"
import classes from './Navbar.module.css'
import navbar from '../assets/navbar1.png'
import navbar2 from '../assets/Vector.png'

const Navbar = () => {    

    const logoutHandler = () => {
        logout()
    }
 
    return(
        <header>
      <nav className={classes.nav}>
      <svg className={classes.test} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#CDB4DB" fillOpacity="1" d="M0,192L120,165.3C240,139,480,85,720,74.7C960,64,1200,96,1320,112L1440,128L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>

        <ul className={classes.ul}>

          <li>
            <Link to='/home' className={classes.li}>Home</Link>
          </li> 

           <li>
            <Link to='/profile' className={classes.li}>Profile</Link>
          </li>
          
          <li>
          <Link to='/login' >
              <button onClick={logoutHandler} className={classes.button}>Log Out</button>
          </Link>
          </li>
          
        </ul>
      </nav>
    </header>
    )
}

export default Navbar