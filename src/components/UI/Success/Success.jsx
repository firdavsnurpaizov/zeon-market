import React from "react";
import style from "./Success.module.css";
import { ReactComponent as SuccessIcon } from "./../../../assets/svg/success.svg";

const Success = ({ setVisible }) => {

const continueShopping = () => {
    setVisible(false)
}


  return (
    <div className={style.success}>
      <SuccessIcon />
      <h3>Спасибо!</h3>
      <div className={style.text}>Ваша заявка была принята ожидайте,</div>
      <div className={style.text}>
         скоро Вам перезвонят
      </div>
      <button onClick={continueShopping} className={style.btn}><span>Продолжить покупки</span></button>
    </div>
  )
}

export default Success;
