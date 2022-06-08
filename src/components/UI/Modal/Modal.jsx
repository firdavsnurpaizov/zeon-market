import React from "react";
import style from "./Modal.module.css";


const Modal = ({ children, visible, setVisible }) => {
  const classes = [style.modal];

  if (visible) {
    classes.push(style.active);
  }

  return (
    <div className={classes.join(" ")} onClick={() => setVisible(false)}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
