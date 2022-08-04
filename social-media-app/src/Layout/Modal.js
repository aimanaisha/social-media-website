import classes from "./Modal.module.css";
import { Scrollbars } from 'react-custom-scrollbars';
import ReactDOM from "react-dom";


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <Scrollbars style={{ width: 800, height: 300 }}>
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </Scrollbars>
    
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("portal")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("portal")
      )}
    </>
  );
};

export default Modal;
