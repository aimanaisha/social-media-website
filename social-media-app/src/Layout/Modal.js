import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import close from "../assets/close.png";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.box}>
      <div className={classes.modal}>
        <div className={classes.close_box}>          
          <img src={close} className={classes.close} onClick={props.onClick}/>
        </div>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("portal"))}
      {ReactDOM.createPortal(
        <ModalOverlay onClick={props.onClose}>{props.children}</ModalOverlay>,
        document.getElementById("portal")
      )}
    </>
  );
};

export default Modal;
