import React, { useEffect } from "react";
import { useState } from "react";
import style from "./Item.module.css";

const Item = ({ n }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 321) {
      setShow(true);
    }
  }, []);

  return (
    <>
      <div className={style.new} key={n.id}>
        <div>
          <img src={n?.images[0].src} alt="image" />
        </div>
        <div>
          <h4 className={style.title}>{n.title}</h4>
          <div className={style.body}>
            {show ?   <div style={{maxHeight: 95, overflow: "hidden"}}>{n.body}</div> :   <span >{n.body}</span>}
          
            {show ? (
              <button onClick={()=> setShow(false)} className={style.btn}>
                <span>Читать полностью</span>
              </button>
            ) : (
              <button onClick={()=> setShow(true)} className={style.btn}>
                <span>Скрыть</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
