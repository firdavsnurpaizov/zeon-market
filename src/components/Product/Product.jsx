import React, { useEffect, useState } from "react";
import style from "./Product.module.css";
import { ReactComponent as FavoritesIcon } from "./../../assets/svg/favoritesIcon.svg";
import { ReactComponent as FullFavoritesIcon } from "./../../assets/svg/fullFavoritesIcon.svg";
import { ReactComponent as SaleIcon } from "./../../assets/svg/saleIcon.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const [inFavorites, setInFavorites] = useState(false);
  
  const found = !!JSON.parse(localStorage.getItem("favorites"))?.find(
    (f) => f.id === data.id
  );

  useEffect(() => {
    found ? setInFavorites(true) : setInFavorites(false);
  }, []);

  const addToFavorites = (e) => {
    e.preventDefault();
    const isFavoritesPresent = localStorage.getItem("favorites");
    let favorites = isFavoritesPresent ? JSON.parse(isFavoritesPresent) : [];  
    if (found) {
      favorites = favorites.filter((f) => f.id !== data.id);
      setInFavorites(false);
    } else {
      favorites.push(data);
      setInFavorites(true);
    }
    localStorage.setItem(`favorites`, JSON.stringify(favorites));
    dispatch({ type: "ADD_TO_STATE", favorites });
  };

  return (
    <>
      <NavLink
        style={{ textDecoration: "none" }}
        to={`/collections/${data.collection}/${data.id}`}
      >
        <div className={style.product}>
          {data.sale ? (
            <div className={style.saleIcon}>
              {" "}
              <SaleIcon /> <div>20%</div>
            </div>
          ) : (
            ""
          )}
          {!inFavorites ? (
            <FavoritesIcon
              onClick={addToFavorites}
              className={style.favoriteIcon}
            />
          ) : (
            <FullFavoritesIcon
              onClick={addToFavorites}
              className={style.fullFavoriteIcon}
            />
          )}
          <div
            onMouseLeave={() => setIndex(0)}
            style={{ position: "relative" }}
          >
            <img src={data.images[index].src} alt="image" />
            <div className={style.hover}>
              {data.images?.map((image, i) => {
                return (
                  <img
                    onMouseMove={() => setIndex(i)}
                    src={image.src}
                    alt="img"
                    key={image.id}
                  />
                );
              })}
            </div>
            <div className={style.progress}>
              <div
                className={style.progressBar}
                style={{ marginLeft: 25 * index + "%", transition: "all 0.3s" }}
              ></div>
            </div>
          </div>
          <div className={style.description}>
            <div className={style.productTitle}>{data.title}</div>
            <div className={style.productPrice}>
              {data.price.toLocaleString()} р{" "}
              {data.sale ? <span>{data.previous.toLocaleString()} p</span> : ""}
            </div>
            <div className={style.productSize}>
              <span>Размер:</span>
              {data.size}
            </div>
            <div className={style.productColor}>
              {data.colors.map((c) => (
                <div key={c.id} className={style.productColorItemBorder}>
                  <div
                    className={style.productColorItem}
                    style={
                      c.color === "#FFFFFF"
                        ? {
                            backgroundColor: `${c.color}`,
                            border: "1px solid #D1D1D1",
                          }
                        : {
                            backgroundColor: `${c.color}`,
                          }
                    }
                  >
                    {" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default Product;
