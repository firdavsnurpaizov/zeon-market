import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsThunk } from "../../redux/news-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Item from "./Item";
import style from "./News.module.css";

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  // console.log(totalCount);

  // console.log(news);

  useEffect(() => {
    if (fetching) {
      // console.log("fetching");
      dispatch(getNewsThunk(limit, currentPage));
      setCurrentPage((prev) => prev + 1);
    }
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      news?.length < 30
    ) {
      // console.log("work");
      setFetching(true);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <div className={style.wrapper}>
          <h3 className={style.heading}>Новости</h3>
          <div>
            {news?.map((n) => {
              return <Item n={n}/>
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
