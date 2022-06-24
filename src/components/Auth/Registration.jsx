import React, { useState } from "react";
import style from "./Registration.module.css";
import { useDispatch } from "react-redux";
import { auth } from "./../../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDataFromAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { useAuth } from "./../../firebase";
import PhoneInput from "react-phone-number-input";

const Registration = () => {
  useAuth();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const data = {
      id: user.user.uid,
      name,
      email,
      surname,
      country,
      city,
      phone
    };
    console.log(data);
    getDataFromAPI.setUser(data);

    navigate("/");
  };

  return (
    <>
      {/* <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div> */}
      <div className="container">
        <h3>Введите данные для регистрации</h3>
        <div className={style.wrapper}>
          <form onSubmit={register} className={style.form}>
            <h4>Ваше имя</h4>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Введите Ваше имя"
              className={style.inputItem}
            />
            <h4>Ваша фамилия</h4>
            <input
              onChange={(e) => setSurname(e.target.value)}
              className={style.inputItem}
              type="text"
              placeholder="Введите фамилию"
            />
            <h4>Электронный адрес</h4>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Введите электронный адрес"
              className={style.inputItem}
            />
            <h4>Пароль</h4>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Введите пароль"
              className={style.inputItem}
            />
            <h4>Ваш номер телефона</h4>
            <PhoneInput
              onChange={(e) => setPhone(e)}
              international
              defaultCountry="KG"
              name="phone"
              className={style.PhoneInput}
              placeholder="Введите номер телефона"
              style={{ border: "none", outline: "none" }}
            />

            {/* <input
              onChange={(e) => setPhone(e.target.value)}
              className={style.inputItem}
              type="phone"
              placeholder="Введите номер телефона"
            /> */}
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
            <button type="submit" className={style.btn}>
              {" "}
              <span>Регистрация</span>{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
