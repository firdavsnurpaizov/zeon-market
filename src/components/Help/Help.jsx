import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Help.module.css";
import Item from "./Item/Item";
import Image from "./../../assets/img/helpimg.png";

const Help = () => {
  const [helps, setHelps] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/help").then((response) => {
      setHelps(response.data);
      return response.data;
    });
  }, []);
  console.log(helps);

  return (
    <div className="container">
      <div className={style.wrapper}>
        <div>
          <img src={Image} alt="img" />
        </div>
        <div className={style.accordion}>
          {helps.map((help) => (
            <Item data={help} key={help.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
