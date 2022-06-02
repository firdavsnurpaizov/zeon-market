import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCollectionThunk } from "../../redux/main-reducer";
import Product from "../Product/Product";
import style from "./Collection.module.css";

const Collection = () => {
  const dispatch = useDispatch();

  const { collection } = useSelector((state) => state.main);

  const params = useParams();


  useEffect(() => {
    dispatch(getCollectionThunk(params.name));  
  }, []);



  return (
    <>
      <div className="container">
        <h3>Коллекция {params.name}</h3>

        <div className={style.product}>
          {collection.map((item) => {
            return <Product data={item} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Collection;
