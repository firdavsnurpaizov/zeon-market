import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./User.module.css";

const User = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <div className="container">
        <h3>Введите данные</h3>
        <div className={style.wrapper}>
          <div className={style.form}>
            <h4>Ваше имя</h4>
            <input
              onChange={(e) => setName(e.target.value)}
              className={style.inputItem}
              type="text"
              placeholder="Введите имя"
            />
            <h4>Ваша фамилия</h4>
            <input
              onChange={(e) => setSurname(e.target.value)}
              className={style.inputItem}
              type="text"
              placeholder="Введите фамилию"
            />
            <h4>Ваш электронный адрес</h4>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={style.inputItem}
              type="email"
              placeholder="Введите электронный адрес"
            />
            <h4>Ваш номер телефона</h4>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className={style.inputItem}
              type="phone"
              placeholder="Введите номер телефона"
            />
            <h4>Страна</h4>
            <input
              onChange={(e) => setCountry(e.target.value)}
              className={style.inputItem}
              type="text"
              placeholder="Введите страну"
            />
            <h4>Город</h4>
            <input
              onChange={(e) => setCity(e.target.value)}
              className={style.inputItem}
              type="text"
              placeholder="Введите город"
            />
            <button className={style.btn} type="submit">
              <span>Ввести данные</span>
            </button>

            <h5>Посмотреть историю <Link to="/history">заказов</Link></h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
