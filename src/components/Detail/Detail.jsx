import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Detail.module.css";
import { ReactComponent as FavoritesIcon } from "./../../assets/svg/favoritesIcon.svg";
import { ReactComponent as WhiteHeart } from "./../../assets/svg/whiteHeart.svg";
import { ReactComponent as ShopBag } from "./../../assets/svg/shopBag.svg";
import Active from "./Active/Active";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { getDataFromAPI } from "../../api/api";
import { getUserFavoritesThunk } from "../../redux/main-reducer";

const Detail = ({ data }) => {
  // console.log(data);
  const dispatch = useDispatch();
  // const { favorites } = useSelector((state) => state.main);
  const [choosedColor, setChoosedColor] = useState("#BDD3D1");
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { currentUser, userFavorites, userCart } = useSelector(
    (state) => state.main
  );

  const found = !!JSON.parse(localStorage.getItem("cart"))?.find(
    (c) => c.id === data.id && c.colors === choosedColor
  );
  // const found = !!userCart?.find(
  //   (c) => c.id === data.id && c.colors === choosedColor
  // );

  useEffect(() => {
    found ? setInCart(true) : setInCart(false);
  }, [choosedColor]);

  const addToCart = (e) => {
    const isCartPresent = localStorage.getItem("cart");
    let cart = isCartPresent ? JSON.parse(isCartPresent) : [];
    setQuantity(quantity + 1);
    if (found) {
      setInCart(true);
    } else {
      cart.push({ ...data, colors: choosedColor, count: 1 });
      setInCart(true);
    }
    localStorage.setItem(`cart`, JSON.stringify(cart));
    dispatch({ type: "ADD_TO_CART", cart });
    dispatch({ type: "ADD_QUANTITY", quantity: 1 });
  };
  // const addToCart = (e) => {
  //   setQuantity(quantity + 1);
  //   if(found){
  //     setInCart(true);
  //   }else {
  //     getDataFromAPI.setToCart({ ...data, colors: choosedColor, count: 1, userId: currentUser?.id  })
  //     setInCart(true);
  //   }
  // };

  // const [inFavorites, setInFavorites] = useState(false);
  // const foundFav = !!JSON.parse(localStorage.getItem("favorites"))?.find(
  //   (f) => f.id === data.id
  // );
  const [inFavorites, setInFavorites] = useState(false);
  const foundFav = !!userFavorites?.find(
    (f) => f?.product?.id === data.id && currentUser?.id === f.userId
  );

  useEffect(() => {
    foundFav ? setInFavorites(true) : setInFavorites(false);
  }, []);

  // const addToFavorites = (e) => {
  //   const isFavoritesPresent = localStorage.getItem("favorites");
  //   let favorites = isFavoritesPresent ? JSON.parse(isFavoritesPresent) : [];
  //   if (foundFav) {
  //     favorites = favorites.filter((f) => f.id !== data.id);
  //     setInFavorites(false);
  //   } else {
  //     favorites.push(data);
  //     setInFavorites(true);
  //   }
  //   localStorage.setItem(`favorites`, JSON.stringify(favorites));
  //   dispatch({ type: "ADD_TO_STATE", favorites });
  // };

  const addToFavorites = async (e) => {
    e.preventDefault();

    if (foundFav) {
      const patch = userFavorites?.filter(
        (f) => f?.product?.id === data.id && currentUser?.id === f?.userId
      );
      await getDataFromAPI.removeFav(patch[0]);
      setInFavorites(false);
    } else {
      const body = {
        userId: currentUser.id,
        product: { ...data },
      };
      await getDataFromAPI.setFav(body);
      setInFavorites(true);
    }
    dispatch(getUserFavoritesThunk(currentUser?.id));
  };

  return (
    <>
      {/* <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div> */}
      <div className="container">
        <div className={style.product}>
          <div className={style.galery}>
            {data.images.map((i) => {
              return (
                <img style={{ width: 308 }} key={i.id} src={i.src} alt="" />
              );
            })}
            {data.images.map((i) => {
              return (
                <img
                  className={style.miniImage}
                  key={i.id}
                  src={i.src}
                  alt=""
                />
              );
            })}
          </div>
          <div className={style.detail}>
            <h3>{data.title}</h3>
            <div className={style.article}>
              <span>Артикул:</span> {data.article}
            </div>
            <div className={style.productColor}>
              <span>Цвет:</span>
              {data.colors?.map((c) => (
                <Active
                  setColor={setChoosedColor}
                  id={data.id}
                  color={c}
                  key={c.id}
                />
              ))}
            </div>
            <div className={style.productPrice}>
              {data.price.toLocaleString()} р{" "}
              {data.sale ? (
                <span>{data.previous.toLocaleString()} c.</span>
              ) : (
                ""
              )}
            </div>
            <div className={style.about}>
              <div>О товаре:</div>
              <div className={style.description}>{data.description}</div>
            </div>
            <div className={style.details}>
              <div>
                <div className={style.size}>
                  Размерный ряд:
                  <span>{data.size}</span>
                </div>
                <div className={style.size}>
                  Количество в линейке:
                  <span>{data.quantity}</span>
                </div>
              </div>
              <div>
                <div className={style.size}>
                  Состав ткани:
                  <span>{data.fabric}</span>
                </div>
                <div className={style.size}>
                  Материал:
                  <span>{data.composition}</span>
                </div>
              </div>
            </div>
            <div className={style.buttons}>
              {inCart ? (
                <Link to={"/cart"}>
                  <button
                    className={style.btn}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <span>Перейти в корзину</span>
                  </button>
                </Link>
              ) : (
                <button className={style.btn} onClick={addToCart}>
                  <ShopBag />
                  <span>Добавить в корзину</span>
                </button>
              )}
              {inFavorites ? (
                <WhiteHeart className={style.fav} onClick={addToFavorites} />
              ) : (
                <FavoritesIcon className={style.fav} onClick={addToFavorites} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
