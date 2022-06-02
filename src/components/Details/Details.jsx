import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsThunk } from "../../redux/details-reducer";
import Detail from "../Detail/Detail";
import style from "./Details.module.css";

const Details = () => {
const dispatch = useDispatch();
    const params = useParams()
    const {details} = useSelector((state) => state.details)
    // console.log(details);
    // console.log(params);

    useEffect(() => {
        dispatch(getDetailsThunk(params.name, params.id))
    },[])

  return (
    <>
      <div className="container">
          <div className={style.details}>
              {
                  details.map(d=>{
                      return <Detail data={d} key={d.id}/>
                  })
              }
          </div>
      </div>
    </>
  );
};

export default Details;
