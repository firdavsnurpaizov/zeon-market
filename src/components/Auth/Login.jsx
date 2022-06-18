import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDataFromAPI } from "../../api/api";
import { getUserThunk } from "../../redux/main-reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    <div className="container">
      <form
        onSubmit={login}
        style={{ display: "flex", flexDirection: "column", width: 500 }}
      >
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

export default Login;
