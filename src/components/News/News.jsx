import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsThunk } from "../../redux/news-reducer";
import style from "./News.module.css";

const News = () => {
  const dispatch = useDispatch();
  const { news, totalCount } = useSelector((state) => state.news);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  // console.log(totalCount);

  // console.log(news);

  useEffect(() => {
    if (fetching) {
      console.log("fetching");
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
      <div className="container">
        <h3 style={{ textAlign: "start", paddingTop: 8, marginBottom: 21 }}>Новости</h3>
        <div>
          {news?.map((n) => {
            return (
              <div className={style.new} key={n.id}>
                <div>
                  <img style={{width: 226}} src={n?.images[0].src} alt="image" />
                </div>
                <div>
                  <h4 className={style.title}>{n.title}</h4>
                  <div className={style.body}>{n.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
