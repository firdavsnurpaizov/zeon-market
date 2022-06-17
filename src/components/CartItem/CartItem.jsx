import React, { useEffect, useState } from "react";
import style from "./CartItem.module.css";
import { ReactComponent as Delete } from "./../../assets/svg/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setDecrement,
  setInctement,
  removeItemFromCart,
} from "../../redux/main-reducer";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeItemFromCart(data));
  };

  const addQuantity = () => {
    dispatch(setInctement(data));
  };
  const removeQuantity = () => {
    dispatch(setDecrement(data));
  };

  return (
    <>
      <div className={style.cart}>
        <div className={style.cartItem}>
          <Delete className={style.delete} onClick={remove} />
          <div>
            <img
              src={data.images[0].src}
              alt="product image"
            />
          </div>
          <div style={{ textAlign: "start" }} className={style.description}>
            <h4>{data.title}</h4>
            <div className={style.size}>Размер: {data.size}</div>
            <div className={style.color}>
              Цвет:
              <span
                style={
                  data.colors === "#FFFFFF"
          ? {
              backgroundColor: `${data.colors}`,
              border: "1px solid #D1D1D1",
            }
          : {
              backgroundColor: `${data.colors}`,
            }
              }
              ></span>
            </div>
            <div className={style.price}>
              {data.price.toLocaleString()} р{" "}
              <span>{data.sale ? data.previous.toLocaleString() : ""}</span>{" "}
            </div>
            <div className={style.buttons}>
              <button className={style.btn} onClick={removeQuantity}>
                -
              </button>
              <span>{data.count}</span>
              <button className={style.btn} onClick={addQuantity}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
