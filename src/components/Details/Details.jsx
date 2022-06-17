import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsThunk, getSimilarThunk } from "../../redux/details-reducer";
import Detail from "../Detail/Detail";
import Product from "../Product/Product";
import Recommendation from "../Recommendation/Recommendation";
import style from "./Details.module.css";

const Details = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params);
  const { details, similar } = useSelector((state) => state.details);
  // console.log(details);
  // console.log("details", params);

  // console.log(similar);
  useEffect(() => {
    dispatch(getDetailsThunk(params.name, params.id));
    dispatch(getSimilarThunk(params.name, params.id));
  }, []);

  return (
    <>
      <div className="container">
        <div className={style.details}>
          {details.map((d) => {
            return <Detail data={d} key={d.id} />;
          })}
        </div>
        <div>
          <h3>Похожие товары</h3>
          <div className={style.similar}>
            {similar.map((item) => (
              <Recommendation data={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
