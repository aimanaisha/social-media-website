import Modal from "../Layout/Modal"
import classes from './ChangePasswd.module.css'

const ChangePasswd = (props) => {
    return(
        <Modal onClose={props.onHideBox}>
            <h1 className={classes.head}>Change Password</h1>
            <div className={classes.container}>
                <input className={classes.input} type='password' placeholder="Your Password"/>
                <input className={classes.input} type='password' placeholder="Confirm Password"/>
                <button className={classes.updatebtn}>Change</button>
            </div>
        </Modal>
    )
}
export default ChangePasswd