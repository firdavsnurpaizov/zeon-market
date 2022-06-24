import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCollectionThunk, getNoveltyThunk } from "../../redux/main-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Product from "../Product/Product";
import style from "./Collection.module.css";
import Recommendation from "../Recommendation/Recommendation";

const Collection = () => {
  const dispatch = useDispatch();
  const { collection, novelty } = useSelector((state) => state.main);
  const params = useParams();
  const [limitNovelty, setLimitNovelty] = useState(5);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  // console.log(collection);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCollectionThunk(params.name, limit, page)).then(() => {
      setLoaded(true);
    });
  }, [page]);

  useEffect(() => {
    if (window.innerWidth <= 320) {
      dispatch(getCollectionThunk(params.name, 4, page));
    } else {
      dispatch(getCollectionThunk(params.name, 8, page));
    }
  }, [page, window.innerWidth]);

  useEffect(() => {
    dispatch(getNoveltyThunk(limitNovelty));
  }, []);

  const onChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(collection);
  useEffect(() => {}, [collection]);

  return (
    <>
      <div style={{ backgroundColor: "#FFF", width: "100vw" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <div className={style.wrapper}>
          <h3 style={{ paddingTop: 32, margin: 0, paddingBottom: 18 }}>
            {/* Коллекция {params.name} */}
            Коллекция {loaded && collection?.data[0]?.titleCol}
          </h3>

          <div className={style.product}>
            {collection.data?.map((item) => {
              return <Product data={item} key={item.id} />;
            })}
          </div>

          <Pagination
            defaultCurrent={1}
            current={page}
            defaultPageSize={limit}
            onChange={onChange}
            total={8}
            showSizeChanger={false}
            className={style.pagination}
          />

          <h3>Новинки</h3>
          <div className={style.productN}>
            {novelty?.data?.map((b) => (
              <Recommendation data={b} key={b.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
