import AuthForm from "../components/AuthForm";
import classes from './Login.module.css'

const Login = () => {
   return (
   <div className={classes.box}>
       <AuthForm/>
   </div>
   
   )
}

export default Login