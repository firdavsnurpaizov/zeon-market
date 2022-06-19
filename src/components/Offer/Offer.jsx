import axios from "axios";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import style from "./Offert.module.css";

const Offer = () => {
  const [offert, setOffert] = useState([]);
  // console.log(offert);

  useEffect(() => {
    axios(" http://localhost:3000/oofert").then((response) => {
      setOffert(response.data);
      return response.data;
    });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <div className={style.wrapper}>
          <h3>Публичная офферта</h3>
          <div className={style.offert}>{offert.map((off) => off.offert)}</div>
        </div>
      </div>
    </>
  );
};

export default Offer;
