import { useContext } from "react"
import AuthContext from "../store/AuthContext"

const UserProfile = () => {

    const ctx = useContext(AuthContext)

    return(<>
        <h2>Username</h2> 
        <p>{ctx.username}</p>
        <h2>Email</h2>
        <p>{ctx.email}</p>
        </>
    )
}

export default UserProfile