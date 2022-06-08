import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoveltyThunk } from "../../redux/main-reducer";
import CartItem from "../CartItem/CartItem";
import Recommendation from "../Recommendation/Recommendation";
import style from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, novelty } = useSelector((state) => state.main);
  const [carts, setCarts] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (!cart.length) {
      dispatch(getNoveltyThunk(limit));
    }
  }, [cart]);

  const totalQuantity = cart.reduce(
    (acc, item) => (acc += item.quantity * item.count),
    0
  );
  const totalLines = cart.reduce((acc, item) => (acc += item?.count), 0);
  const totalPrice = cart.reduce(
    (acc, item) => (acc += item?.price * item.quantity * item.count),
    0
  );
  const discount = cart.reduce(
    (acc, item) =>
      (acc += item?.previous
        ? (item.previous - item.price) * item.quantity * item.count
        : 0),
    0
  );

  useEffect(() => {
    setCarts(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  return (
    <>
      <div className="container">
        {carts.length ? (
          <div className={style.wrapper}>
            <div className={style.cart}>
              {carts?.map((product, i) => (
                <CartItem data={product} key={product.id + i} />
              ))}
            </div>
            {carts.length ? (
              <div className={style.total}>
                <h4>Сумма заказа</h4>

                <div>Количество линеек: {totalLines}</div>
                <div>Количество товаров: {totalQuantity}</div>
                <div>Стоимость: {totalPrice.toLocaleString()}</div>
                <div>Скидка: {discount.toLocaleString()}</div>
                <div className={style.dashed}></div>
                <div>
                  Итого к оплате: {(totalPrice - discount).toLocaleString()}
                </div>
                <button className={style.btn}>
                  <span>Оформить заказ</span>
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 style={{ marginTop: 11, textAlign: "start" }}>Корзина</h3>
            <div style={{ textAlign: "start" }}>
              У Вас пока нет товаров в корзине
            </div>
            <h3 style={{ textAlign: "start" }}>Возможно Вас заинтересует</h3>
            <div style={{ display: "flex", gap: 8 }}>
              {novelty.map((item) => (
                <Recommendation data={item} key={item.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
