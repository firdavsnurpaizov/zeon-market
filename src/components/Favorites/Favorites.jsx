import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoveltyThunk } from "../../redux/main-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Recommendation from "../Recommendation/Recommendation";
import style from "./Favorites.module.css";
import axios from "axios";
import Card from "../Card/Card";

const Favorites = () => {
  const dispatch = useDispatch();
  // const [fav, setFav] = useState([]);
  const { cart, novelty, userFavorites } = useSelector((state) => state.main);
  const [limit, setLimit] = useState(5);

  console.log(userFavorites);

  useEffect(() => {
    if (!cart.length) {
      dispatch(getNoveltyThunk(limit));
    }
  }, [cart]);
  useEffect(() => {
    dispatch(getNoveltyThunk(limit));
  }, []);

  useEffect(() => {
    changeLimit(2);
  }, []);

  function changeLimit(num) {
    setLimit((prev) => prev + num);
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      changeLimit(4)
    ) {
      // console.log("work");
    }
  };

  return (
    <div className={style.favorites}>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <div className={style.wrapper}>
          <h3>Избранное</h3>
          {userFavorites?.length ? (
            <div className={style.quantityFav}>
              <span>Товаров в избранном:</span> {userFavorites.length}
            </div>
          ) : (
            ""
          )}
          <div className={style.product}>
            {userFavorites?.length ? (
              userFavorites
                .filter((i, k) => k < limit)
                .map((f) => {
                  // console.log(f)
                  return <Card key={f.id} data={f} />;
                })
            ) : (
              <div>
                <div className={style.attention}>
                  <span> У Вас пока нет избранных товаров</span>
                </div>
                <h3>Возможно Вас заинтересует</h3>
                  <div className={style.productR}>
                    {novelty.data?.map((item) => (
                      <Recommendation data={item} key={item.id} />
                    ))}
               
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
