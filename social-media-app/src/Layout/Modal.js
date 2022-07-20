import classes from './Modal.module.css'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return(
        <div className={classes.backdrop} onClick={props.onClick}/>
    )
}

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const Modal = (props) => {
    return(
        <>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, document.getElementById('portal'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('portal'))}
        </>
    )
}

export default Modal