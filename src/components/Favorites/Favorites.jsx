import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import style from "./Favorites.module.css";

const Favorites = () => {
  const [fav, setFav] = useState([]);
  const { favorites } = useSelector((state) => state.main);

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem("favorites")));
  }, [favorites]);

  return (
    <div className={style.favorites}>
      <div className="container">
        <h3>Избранное</h3>
        {fav.length ? (
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
            <div>У Вас пока нет избранных товаров</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
