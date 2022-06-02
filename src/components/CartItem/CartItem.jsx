import React from "react";
import style from "./CartItem.module.css";
import {ReactComponent as Delete} from './../../assets/svg/delete.svg'

const CartItem = ({ data }) => {

    const isCartPresent = localStorage.getItem("cart");
    let cart = isCartPresent ? JSON.parse(isCartPresent) : [];

const remove = () => {
    cart = cart.filter(item => item.id !== data.id)
    localStorage.setItem(`cart`, JSON.stringify(cart));
}



  return (
    <>
      <div className={style.cart}>
        <div className={style.cartItem}>
                <Delete className={style.delete} onClick={remove} />
            <div>
                {
                    data.images.map(image => (
                        <img style={{width: 112, height: 142, objectFit: "cover" }} src={image.src} key={image.id} alt="product image" />
                    ))
                }
            </div>
          <div style={{ textAlign: 'start'}}>
            <h4>{data.title}</h4>
            <div>Размер: {data.size}</div>
            <div style={{ display: "flex", alignItems: "center" }}>  Цвет: <div style={{backgroundColor: `${data.colors}`, width: 8, height:8}}></div></div>
            <span>{data.price} р</span>
            <div>
              <button>-</button>
              кол-во
              <button>+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
