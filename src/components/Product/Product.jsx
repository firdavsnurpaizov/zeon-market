import React, { useEffect, useState } from "react";
import style from "./Product.module.css";
import {ReactComponent as FavoritesIcon} from "./../../assets/svg/favoritesIcon.svg"
import {ReactComponent as FullFavoritesIcon} from "./../../assets/svg/fullFavoritesIcon.svg"
import {ReactComponent as SaleIcon} from "./../../assets/svg/saleIcon.svg"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";


const Product = ({ data }) => {
  const dispatch = useDispatch()

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
    dispatch({type: "ADD_TO_STATE", favorites})
  };

  const image = data.images.map((i) => {
    return <img key={i.id} src={i.src} alt="product image" />
  })

  return (
    <>
    <NavLink style={{textDecoration: "none"}} to={`/${data.collection}/${data.id}`}>
      

      <div className={style.product}>
        {
          data.sale ? <div className={style.saleIcon}> <SaleIcon /> <div>20%</div></div> : ''
        }
        {!inFavorites ? (
          <FavoritesIcon onClick={addToFavorites} className={style.favoriteIcon}/>
        ) : (
          <FullFavoritesIcon onClick={addToFavorites} className={style.favoriteIcon} />
        )}
        {image}
          {/* <img
            src={data.images.map((i) => {
              return (i.src)
            })}
            alt="product"
            /> */}
          <div className={style.description}>
          <div className={style.productTitle}>{data.title}</div>
          <div className={style.productPrice}>{data.price.toLocaleString()} р  {data.sale ? <span>{data.previous.toLocaleString()} p</span> : ''}</div>
          <div className={style.productSize}>
            <span>Размер:</span>
            {data.size}
          </div>
          <div className={style.productColor}>
          {
            data.colors.map((c) => (
              <div key={c.id} className={style.productColorItemBorder}>
                <div className={style.productColorItem} style={{ backgroundColor: `${c.color}`}}> </div>
              </div>
              ))
            }
            </div>
            </div>
      </div>
            </NavLink>
    </>
  );
};

export default Product;
