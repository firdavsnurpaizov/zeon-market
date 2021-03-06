import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNoveltyThunk, getUserFavoritesThunk } from "../../redux/main-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CartItem from "../CartItem/CartItem";
import OrderRegistration from "../OrderRegistration/OrderRegistration";
import Recommendation from "../Recommendation/Recommendation";
import Modal from "../UI/Modal/Modal";
import Success from "../UI/Success/Success";
import style from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, novelty, userCart, currentUser } = useSelector((state) => state.main);
  const [carts, setCarts] = useState([]);
  // const [limit, setLimit] = useState(5);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hide, setHide] = useState(false);

  const state = useSelector(state => state)
  console.log(state);

  useEffect(() => {
    if (!cart.length) {
      dispatch(getNoveltyThunk(5));
    }
    // dispatch(getUserFavoritesThunk(currentUser?.id));
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
        <Modal className={style.modal} visible={modal}>
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
            {cart.length ? (
              <div style={{ position: "relative" }}>
                <div className={style.total}>
                  <h4>?????????? ????????????</h4>

                  <div className={style.totalOrder}>
                    ???????????????????? ????????????: <span>{totalLines} ????</span>
                  </div>
                  <div className={style.totalOrder}>
                    ???????????????????? ??????????????: <span>{totalQuantity} ????</span>
                  </div>
                  <div className={style.totalOrder}>
                    ??????????????????: <span>{totalPrice.toLocaleString()} ????????????</span>
                  </div>
                  <div className={style.totalOrder}>
                    ????????????: <span> {discount.toLocaleString()} ????????????</span>{" "}
                  </div>
                  <div className={style.dashed}></div>
                  <div className={style.totalOrder}>
                    ?????????? ?? ????????????:{" "}
                    <span>
                      {(totalPrice - discount).toLocaleString()} ????????????
                    </span>
                  </div>
                  <button className={style.btn} onClick={() => setModal(true)}>
                    <span>???????????????? ??????????</span>
                  </button>
                </div>
                <div className={styles.join(" ")}>
                  <h4>?????????? ????????????</h4>

                  <div className={style.totalOrder}>
                    ?????????? ????????????????????:{" "}
                    <span>
                      {totalLines} ???????????? ({totalQuantity} ????.)
                    </span>
                  </div>
                  <div
                    className={style.totalOrder}
                    style={{ marginBottom: 12, marginTop: 12 }}
                  >
                    ??????????????????: <span>{totalPrice.toLocaleString()} ????????????</span>
                  </div>
                  <div
                    className={style.totalOrder}
                    style={{ marginBottom: 24 }}
                  >
                    ????????????: <span> {discount.toLocaleString()} ????????????</span>{" "}
                  </div>
                  <div className={style.dashed}></div>
                  <div className={style.totalOrder} style={{ marginTop: 24 }}>
                    ?????????? ?? ????????????:{" "}
                    <span>
                      {(totalPrice - discount).toLocaleString()} ????????????
                    </span>
                  </div>
                  <button
                    className={style.btnHandler}
                    onClick={() => setHide(true)}
                  >
                    <span>????????????</span>
                  </button>
                  <button className={style.btn} onClick={() => setModal(true)}>
                    <span>???????????????? ??????????</span>
                  </button>
                </div>
                <div className={classes.join(" ")}>
                  <div className={style.totalOrder} style={{ marginTop: 24 }}>
                    ?????????? ?? ????????????:{" "}
                    <span>
                      {(totalPrice - discount).toLocaleString()} ????????????
                    </span>
                  </div>
                  <button
                    className={style.btnInfo}
                    onClick={() => setHide(false)}
                  >
                    <span>???????????????????? ?? ????????????</span>
                  </button>
                  <button className={style.btn} onClick={() => setModal(true)}>
                    <span>???????????????? ??????????</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className={style.emptyCart}>
            <h3>??????????????</h3>
            <div className={style.default}>
              ?? ?????? ???????? ?????? ?????????????? ?? ??????????????
            </div>
            <h3 className={style.interested}>???????????????? ?????? ????????????????????????</h3>
            <div className={style.recommendation}>
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
