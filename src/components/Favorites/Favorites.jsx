import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoveltyThunk } from "../../redux/main-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Product from "../Product/Product";
import Recommendation from "../Recommendation/Recommendation";
import style from "./Favorites.module.css";
import axios from "axios";

const Favorites = () => {
  const dispatch = useDispatch();
  const [fav, setFav] = useState([]);
  const { favorites, cart, novelty } = useSelector((state) => state.main);
  const [limit, setLimit] = useState(5);
  const { currentUser } = useSelector((state) => state.main);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${currentUser?.id}/favourites`)
      .then((response) => {
        console.log(response.data);
       return  response.data;
      });
  }, []);

  useEffect(() => {
    if (!cart.length) {
      dispatch(getNoveltyThunk(limit));
    }
  }, [cart]);
  useEffect(() => {
    dispatch(getNoveltyThunk(limit));
  }, []);

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem("favorites")));
  }, [favorites]);

  return (
    <div className={style.favorites}>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <h3>Избранное</h3>
        {favorites.length ? (
          <div className={style.quantityFav}>
            <span>Товаров в избранном:</span> {favorites.length}
          </div>
        ) : (
          ""
        )}
        <div className={style.product}>
          {favorites.length ? (
            fav.map((f) => <Product key={f.id} data={f} />)
          ) : (
            <div>
              <div className={style.attention}>
                У Вас пока нет избранных товаров
              </div>
              <h3>Возможно Вас заинтересует</h3>
              <div style={{ display: "flex", gap: 8 }}>
                {novelty.data?.map((item) => (
                  <Recommendation data={item} key={item.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
