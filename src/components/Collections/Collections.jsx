import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsThunk } from "../../redux/main-reducer";
import CollectionItem from "../CollectionItem/CollectionItem";

import style from "./Collections.module.css";

const Collections = () => {
  const dispatch = useDispatch();

  const { collections } = useSelector((state) => state.main);

  useEffect(() => {
    dispatch(getCollectionsThunk());
  }, []);

  return (
    <>
      <div className="container">
    
        <div className={style.collections}>
          <h3>Коллекции</h3>
          <div className={style.product}>
            {collections.map((c) => {
              return <CollectionItem data={c} key={c.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
