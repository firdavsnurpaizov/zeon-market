import React, { useState } from "react";
import style from "./Item.module.css";
import { ReactComponent as Show } from "./../../../assets/svg/show.svg";
import { ReactComponent as Hide } from "./../../../assets/svg/hide.svg";

const Item = ({ data }) => {
  const [handle, setHandle] = useState(false);
  const classes = [style.content];

  if (handle) {
    classes.push(style.active);
  }

  const show = () => {
    setHandle(true);
  };

  const hide = () => {
    setHandle(false);
  };

  return (
    <div className={style.item}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={style.title}>{data.question}</div>
        {handle ? <Hide onClick={hide} /> : <Show onClick={show} />}
      </div>
      <div className={classes.join(" ")}>{data.answer}</div>
    </div>
  );
};

export default Item;
