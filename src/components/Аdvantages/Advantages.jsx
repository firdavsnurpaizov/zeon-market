import React from "react";
import style from "./Advantages.module.css";

const Advantages = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className={style.advantage}>
          <img src={data.icon} alt="icon" />
          <h4>{data.title}</h4>
          <div>{data.body}</div>
        </div>
      </div>
    </>
  );
};

export default Advantages;
