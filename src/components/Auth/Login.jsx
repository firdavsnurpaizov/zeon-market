import React, { useState } from "react";
import style from "./Login.module.css";
import { useDispatch } from "react-redux";
import { auth } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDataFromAPI } from "../../api/api";
import { getUserThunk } from "../../redux/main-reducer";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { useAuth } from "./../../firebase";

const Login = () => {
  useAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const user = await signInWithEmailAndPassword(auth, email, password);

    console.log(user);

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
        <h3>Введите логин и пароль для входа</h3>
        <div className={style.wrapper}>
          <form onSubmit={login} className={style.form}>
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
            <button className={style.btn} type="submit">
              <span>Войти</span>
            </button>
          </form>
        </div>
        <h5>
          Если у Вас нет аккаунта пройтиде для{" "}
          <Link to="/register">регистрации</Link>
        </h5>
      </div>
    </>
  );
};

export default Login;
