import React, { useState } from "react";
import style from "./Active.module.css";

const Active = ({ color, setColor, id }) => {
  //   const found = !!JSON.parse(localStorage.getItem("cart"))?.find(
  //     (c) => c.id === id && c.colors === color.color
  //   );
  // const [active, setActive] = useState(true);

  // const border = active ? style.activeBorder : null;

  const itemHandler = () => {
    setColor(color.color);
  };

  return (
    <div
      onClick={itemHandler}
      className={style.productColorItem}
      style={
        color.color === "#FFFFFF"
          ? {
              backgroundColor: `${color.color}`,
              border: "1px solid #D1D1D1",
            }
          : {
              backgroundColor: `${color.color}`,
            }
      }
    >
      <input
        style={{ position: "absolute", opacity: 0, overflow: "hidden" }}
        type="radio"
        id={color.color}
        name="color"
        defaultChecked={color.color === "#BDD3D1"}
      />
      <label htmlFor={color.color}></label>
    </div>
  );
};

export default Active;
