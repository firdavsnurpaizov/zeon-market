import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsThunk } from "../../redux/news-reducer";
import style from "./News.module.css";

const News = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsThunk());
  }, []);
 
  return (
    <>
      <div className="container">
        <h3 style={{ textAlign: "start" }}>Новости</h3>
        <div>
          {news.data?.map((n) => {
            return (
              <div className={style.new} key={n.id}>
                <h4>{n.title}</h4>
                <div>{n.body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
