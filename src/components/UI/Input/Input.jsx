import React, { useEffect, useState } from "react";
import style from "./Input.module.css";
import { ReactComponent as User } from "./../../../assets/svg/user.svg";
import { ReactComponent as Phone } from "./../../../assets/svg/phoneIcon.svg";
import { ReactComponent as Delete } from "./../../../assets/svg/delete.svg";

const Input = ({ order, setVisible }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [nameError, setNameError] = useState("Имя не может быть пустым");
  const [phoneError, setPhoneError] = useState("Номер не может быть пустым");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || phoneError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, phoneError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    const re = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError("Некорректное имя");
    } else {
      setNameError("");
    }
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
    const re = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setPhoneError("Некорректный номер");
    } else {
      setPhoneError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
        break;
    }
  };

  const orderCall = () => {
    order(true);
    setName("");
    setPhone("");
  };

  const closeModal = () => {
    setVisible(false);
    setName("");
    setPhone("");
    setNameDirty(false);
    setPhoneDirty(false);
  };

  const classes = [style.btn];
  if (formValid) {
    classes.push(style.active);
  }

  return (
    <div className={style.input}>
      <Delete className={style.delete} onClick={closeModal} />
      <h3>Если у Вас остались вопросы</h3>
      <div className={style.text}>Оставьте заявку и мы обязательно</div>
      <div className={style.text}>Вам перезвоним</div>
      <div className={style.inputs}>
        {nameDirty && nameError && (
          <div style={{ color: "red", textAlign: "start" }}>{nameError} </div>
        )}
        <label className={style.inputUser}>
          <User />
          <input
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => nameHandler(e)}
            value={name}
            id="fir"
            name="name"
            type="text"
            placeholder="Как к Вам обращаться?"
          />
        </label>
        {phoneDirty && phoneError && (
          <div style={{ color: "red", textAlign: "start" }}>{phoneError} </div>
        )}
        <label className={style.inputUser}>
          <Phone style={{ marginRight: 5 }} />
          <input
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => phoneHandler(e)}
            value={phone}
            name="phone"
            type="phone"
            placeholder="Номер телефона"
          />
        </label>
      </div>
      <button
        disabled={!formValid}
        type="submit"
        className={classes.join(" ")}
        onClick={orderCall}
      >
        <span>Заказать звонок</span>
      </button>
    </div>
  );
};

export default Input;
