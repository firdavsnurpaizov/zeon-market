import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Help.module.css";
import Item from "./Item/Item";
import Image from "./../../assets/img/helpimg.png";
import { ReactComponent as Show } from "./../../assets/svg/show.svg";
import { ReactComponent as Hide } from "./../../assets/svg/hide.svg";

const Help = () => {
  const [helps, setHelps] = useState([]);
  const [handle, setHandle] = useState(null);

  useEffect(() => {
    axios("http://localhost:3000/help").then((response) => {
      setHelps(response.data);
      return response.data;
    });
  }, []);


  const toggle = (i) => {
    if (handle == i) {
      return setHandle(null);
    }
    setHandle(i)
  };

  return (
    <div className="container">
      <div className={style.wrapper}>
        <div>
          <img src={Image} alt="img" />
        </div>
        <div className={style.accordion}>
          {helps.map((help, i) => (
                     <div className={style.item}> 
                      <div onClick={()=> toggle(i)} className={style.title}>
                        <h3>{help.title}</h3>
                        {handle == i ? <Hide /> : <Show />}
                      </div>
                      <div className={handle ===i ? style.contentShow : style.content}>
                        {help.content}
                      </div>
                     </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
