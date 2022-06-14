import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCollectionThunk, getNoveltyThunk } from "../../redux/main-reducer";
import Product from "../Product/Product";
import style from "./Collection.module.css";

const Collection = () => {
  const dispatch = useDispatch();
  const { collection, novelty } = useSelector((state) => state.main);
  const params = useParams();
  const [limitNovelty, setLimitNovelty] = useState(4);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCollectionThunk(params.name, limit, page));
  }, [page]);

  useEffect(() => {
    dispatch(getNoveltyThunk(limitNovelty));
  }, []);

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="container">
        <h3 style={{ paddingTop: 32, margin:0, paddingBottom: 18 }}>Коллекция {params.name}</h3>

        <div className={style.product}>
          {collection.data?.map((item) => {
            return <Product data={item} key={item.id} />;
          })}
        </div>

        <Pagination
          defaultCurrent={1}
          current={page}
          onChange={onChange}
          total={16}
          showSizeChanger={false}
          className={style.pagination}
        />

        <h3>Новинки</h3>
        <div className={style.productN}>
          {novelty?.data?.map((b) => (
            <Product data={b} key={b.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Collection;
