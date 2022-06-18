import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./../../firebase";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { getDataFromAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(user);
    const data = {
      id: user.user.uid,
      name,
      email,
    };
    getDataFromAPI.setUser(data);
    navigate("/")
  };

  return (
    <div className="container">
      <form
        onSubmit={register}
        style={{ display: "flex", flexDirection: "column", width: 500 }}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="имя"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="электронный адресс"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="пароль"
        />
        <button type="submit">Регистрация</button>
      </form>
    </div>
  );
};

export default Registration;
