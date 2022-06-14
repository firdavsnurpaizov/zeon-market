import React, { useState } from "react";
import style from "./Item.module.css";
import { ReactComponent as Show } from "./../../../assets/svg/show.svg";
import { ReactComponent as Hide } from "./../../../assets/svg/hide.svg";

const Item = ({ data, i }) => {
  const [handle, setHandle] = useState(null);
  const classes = [style.content];

  // if (handle) {
  //   classes.push(style.active);
  // }
  const toggle = (i) => {
    if (handle == i) {
      return setHandle(null);
    }
    setHandle(i)
  };

  return (
    <div className={style.item}>
      <div
        onclick={() => toggle(i)}
        style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
      >
        <div className={style.title}>{data.question}</div>
        {handle == i ? <Hide /> : <Show />}
      </div>
      <div className={classes.join(" ")}>{data.answer}</div>
    </div>
  );
};

export default Item;
