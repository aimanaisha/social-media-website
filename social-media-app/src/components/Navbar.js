import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../store/AuthContext"

const Navbar = () => {

    const ctx = useContext(AuthContext)

    const logoutHandler = () => {
        ctx.logout()
    }

    return(
        <header>
      <nav>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li> 

           <li>
            <Link to='/profile'>Profile</Link>
          </li>
          
          <li>
          <Link to='/login'>
              <button onClick={logoutHandler}>Log Out</button>
          </Link>
          </li>
          
        </ul>
      </nav>
    </header>
    )
}

export default Navbar