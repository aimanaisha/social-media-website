import { Link } from "react-router-dom"
import { logout } from "../store/AuthContext"
import classes from './Navbar.module.css'

const Navbar = () => {    

    const logoutHandler = () => {
        logout()
    }

    return(
        <header>
      <nav className={classes.nav}>
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