import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNoveltyThunk } from "../../redux/main-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CartItem from "../CartItem/CartItem";
import OrderRegistration from "../OrderRegistration/OrderRegistration";
import Recommendation from "../Recommendation/Recommendation";
import Modal from "../UI/Modal/Modal";
import Success from "../UI/Success/Success";
import style from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, novelty } = useSelector((state) => state.main);
  const [carts, setCarts] = useState([]);
  // const [limit, setLimit] = useState(5);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!cart.length) {
      dispatch(getNoveltyThunk(5));
    }
  }, [cart]);

  const totalQuantity = cart.reduce(
    (acc, item) => (acc += item.quantity * item.count),
    0
  );
  const totalLines = cart.reduce((acc, item) => (acc += item?.count), 0);
  const totalPrice = cart.reduce(
    (acc, item) => (acc += item?.price * item.count),
    0
  );
  const discount = cart.reduce(
    (acc, item) =>
      (acc += item?.previous ? (item.previous - item.price) * item.count : 0),
    0
  );

  useEffect(() => {
    setCarts(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  const order = () => {
    dispatch({ type: "CLEAR_CART" });
    setModal(false);
  };

  const styles = [style.totalForMobile];
  if (hide) {
    styles.push(style.active);
  }

  const classes = [style.active];

  if (hide) {
    classes.push(style.info);
  }

  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <Modal visible={modal}>
          {success ? (
            <NavLink to={"/"}>
              <Success onClick={order} setVisible={setModal} />
            </NavLink>
          ) : (
            <OrderRegistration
              data={cart}
              total={(totalPrice - discount).toLocaleString()}
              setVisible={setModal}
              order={setSuccess}
            />
          )}
        </Modal>
        {carts?.length ? (
          <div className={style.wrapper}>
            <div className={style.cart}>
              {carts?.map((product, i) => (
                <CartItem data={product} key={product.id + i} />
              ))}
            </div>
            {carts.length ? (
              <div style={{ position: "relative" }}>
                <div className={style.total}>
                  <h4>Сумма заказа</h4>

                  <div className={style.totalOrder}>
                    Количество линеек: <span>{totalLines} шт</span>
                  </div>
                  <div className={style.totalOrder}>
                    Количество товаров: <span>{totalQuantity} шт</span>
                  </div>
                  <div className={style.totalOrder}>
                    Стоимость: <span>{totalPrice.toLocaleString()} рублей</span>
                  </div>
                  <div className={style.totalOrder}>
                    Скидка: <span> {discount.toLocaleString()} рублей</span>{" "}
                  </div>
                  <div className={style.dashed}></div>
                  <div className={style.totalOrder}>
                    Итого к оплате:{" "}
                    <span>
                      {(totalPrice - discount).toLocaleString()} рублей
                    </span>
                  </div>
                  <button className={style.btn} onClick={() => setModal(true)}>
                    <span>Оформить заказ</span>
                  </button>
                </div>
                <div className={styles.join(" ")}>
                  <h4>Сумма заказа</h4>

                  <div className={style.totalOrder}>
                    Общее количество:{" "}
                    <span>
                      {totalLines} линеек ({totalQuantity} шт.)
                    </span>
                  </div>
                  <div
                    className={style.totalOrder}
                    style={{ marginBottom: 12, marginTop: 12 }}
                  >
                    Стоимость: <span>{totalPrice.toLocaleString()} рублей</span>
                  </div>
                  <div
                    className={style.totalOrder}
                    style={{ marginBottom: 24 }}
                  >
                    Скидка: <span> {discount.toLocaleString()} рублей</span>{" "}
                  </div>
                  <div className={style.dashed}></div>
                  <div className={style.totalOrder} style={{ marginTop: 24 }}>
                    Итого к оплате:{" "}
                    <span>
                      {(totalPrice - discount).toLocaleString()} рублей
                    </span>
                  </div>
                  <button
                    className={style.btnHandler}
                    onClick={() => setHide(true)}
                  >
                    <span>Скрыть</span>
                  </button>
                  <button className={style.btn} onClick={() => setModal(true)}>
                    <span>Оформить заказ</span>
                  </button>
                </div>
                <div className={classes.join(" ")}>
                  <div className={style.totalOrder} style={{ marginTop: 24 }}>
                    Итого к оплате:{" "}
                    <span>
                      {(totalPrice - discount).toLocaleString()} рублей
                    </span>
                  </div>
                  <button
                    className={style.btnInfo}
                    onClick={() => setHide(false)}
                  >
                    <span>Информация о заказе</span>
                  </button>
                  <button className={style.btn} onClick={() => setModal(true)}>
                    <span>Оформить заказ</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className={style.emptyCart}>
            <h3>Корзина</h3>
            <div className={style.default}>
              У Вас пока нет товаров в корзине
            </div>
            <h3 className={style.interested}>Возможно Вас заинтересует</h3>
            <div style={{ display: "flex", gap: 8 }}>
              {novelty.data?.map((item) => (
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
