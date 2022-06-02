import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import style from "./Cart.module.css"

const Cart = () => {

    const [cart, setCart] = useState([]);

    console.log(cart);

    useEffect(()=> {
      setCart(JSON.parse(localStorage.getItem("cart")))
    }, [])

    return (
        <>
          <div className="container">
             <div>
                 {
                     cart?.map(product=> ( <CartItem data={product} key={product.id} /> ))
                 }
             </div> 
          </div>   
        </>
    );
};

export default Cart;