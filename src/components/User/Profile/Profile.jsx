import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDataFromAPI } from "../../../api/api";
import style from "./Profile.module.css";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.main);

  // const [user, setUser] = useState(null)

  console.log(currentUser);

  //   const [name, setName] = useState(currentUser?.name);
  //   const [surname, setSurname] = useState(currentUser?.surname || "");
  //   const [email, setEmail] = useState(currentUser?.email || "");
  //   const [phone, setPhone] = useState(currentUser?.phone || "");
  //   const [country, setCountry] = useState(currentUser?.country || "");
  //   const [city, setCity] = useState(currentUser?.city || "");

  const [user, setUser] = useState({
    name: currentUser?.name,
    surname: currentUser?.surname,
    email: currentUser?.email,
    phone: currentUser?.phone,
    country: currentUser?.country,
    city: currentUser?.city,
  });

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <div>
      <h3>Введите данные</h3>
      <div className={style.wrapper}>
        <form className={style.form}>
          <h4>Ваше имя</h4>
          <input
            value={user ? user?.name : ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={style.inputItem}
            type="text"
            placeholder="Введите имя"
          />
          <h4>Ваша фамилия</h4>
          <input
            value={user?.surname}
            onChange={(e) => setUser({ ...user, surname: e.target.value })}
            className={style.inputItem}
            type="text"
            placeholder="Введите фамилию"
          />
          <h4>Ваш электронный адрес</h4>
          <input
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={style.inputItem}
            type="email"
            placeholder="Введите электронный адрес"
          />
          <h4>Ваш номер телефона</h4>
          <input
            value={user?.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className={style.inputItem}
            type="phone"
            placeholder="Введите номер телефона"
          />
          <h4>Страна</h4>
          <input
            value={user?.country}
            onChange={(e) => setUser({ ...user, country: e.target.value })}
            className={style.inputItem}
            type="text"
            placeholder="Введите страну"
          />
          <h4>Город</h4>
          <input
            value={user?.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            className={style.inputItem}
            type="text"
            placeholder="Введите город"
          />
          <button className={style.btn} type="submit">
            <span>Ввести данные</span>
          </button>

          <h5>{/* Посмотреть историю <Link to="/history">заказов</Link> */}</h5>
        </form>
      </div>
    </div>
  );
};

export default Profile;
