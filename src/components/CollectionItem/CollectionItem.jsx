import React from "react";
import style from "./CollectionItem.module.css";
import { ReactComponent as ArrowRight } from "./../../assets/svg/arrowRight.svg";

import { NavLink } from "react-router-dom";

const CollectionItem = ({ data }) => {
  const src = data.images.map((img) => img.src);

  return (
    <>
      <div className={style.collection}>
        <div
          style={{
            backgroundImage: `url(${src})`,
          }}
          className={style.avatar}
        >
          <span>{data.title}</span>
        </div>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`/collections/${data.collection}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <button className={style.button}>
            <span> Смотреть все</span>
            <ArrowRight fill="white" className={style.arrowRight} />
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default CollectionItem;
