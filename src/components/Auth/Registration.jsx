import React, { useState } from "react";
import style from "./Registration.module.css";
import { useDispatch } from "react-redux";
import { auth } from "./../../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDataFromAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { useAuth } from "./../../firebase";

const Registration = () => {
  useAuth();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    const data = {
      id: user.user.uid,
      name,
      email,
    };
    getDataFromAPI.setUser(data);
    // await signOut(auth)
    navigate("/");
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
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
