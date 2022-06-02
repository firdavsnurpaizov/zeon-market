import React, { useEffect, useState } from "react";
import style from "./Detail.module.css";

const Detail = ({ data }) => {
  const [choosedColor, setChoosedColor] = useState("#BDD3D1");

  const [inCart, setInCart] = useState(false);
  const found = !!JSON.parse(localStorage.getItem("cart"))?.find(
    (c) => c.id === data.id
  );

  useEffect(() => {
    found ? setInCart(true) : setInCart(false);
  }, [choosedColor]);

  const addToCart = (e) => {
    e.preventDefault();

    const isCartPresent = localStorage.getItem("cart");
    let cart = isCartPresent ? JSON.parse(isCartPresent) : [];

    if (found) {
      // cart = cart.filter((c) => c.id !== data.id);
      setInCart(false);
    } else {
      cart.push({ ...data, colors: choosedColor });
      setInCart(true);
    }
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };

  return (
    <>
      <div className="container">
        <div className={style.product}>
          <div className={style.galery}>
            {data.images.map((i) => {
              return <img key={i.id} src={i.src} alt="" />;
            })}
            {data.images.map((i) => {
              return <img key={i.id} src={i.src} alt="" />;
            })}
            {data.images.map((i) => {
              return <img key={i.id} src={i.src} alt="" />;
            })}
            {data.images.map((i) => {
              return <img key={i.id} src={i.src} alt="" />;
            })}

            {data.images.map((i) => {
              return (
                <img
                  style={{ width: 140, height: 240, objectFit: "cover" }}
                  key={i.id}
                  src={i.src}
                  alt=""
                />
              );
            })}
            {data.images.map((i) => {
              return (
                <img
                  style={{ width: 140, height: 240, objectFit: "cover" }}
                  key={i.id}
                  src={i.src}
                  alt=""
                />
              );
            })}
            {data.images.map((i) => {
              return (
                <img
                  style={{ width: 140, height: 240, objectFit: "cover" }}
                  key={i.id}
                  src={i.src}
                  alt=""
                />
              );
            })}
            {data.images.map((i) => {
              return (
                <img
                  style={{ width: 140, height: 240, objectFit: "cover" }}
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
              {data.colors.map((c) => (
                <div key={c.id} className={style.productColorItemBorder}>
                  <div
                    onClick={() => setChoosedColor(c.color)}
                    className={style.productColorItem}
                    style={{ backgroundColor: `${c.color}` }}
                  >
                    {" "}
                  </div>
                </div>
              ))}
            </div>
            <div className={style.productPrice}>
              {data.price} р {data.sale ? <span>{data.previous} c.</span> : ""}
            </div>
            <div className={style.about}>
              <div>О товаре:</div>
              <div className={style.description}>{data.description}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <button className={style.btn} onClick={addToCart}>
                <span>Добавить в корзину</span>
              </button>
              <button className={style.fav}></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
