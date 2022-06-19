import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionItem from "../CollectionItem/CollectionItem";
import { Pagination } from "antd";
import style from "./Collections.module.css";
import {
  getAllCollectionsThunk,
  getCollectionsThunk,
} from "../../redux/main-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

const Collections = () => {
  const dispatch = useDispatch();
  const { collections, allCollections } = useSelector((state) => state.main);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(window.innerWidth <= 320) {
      dispatch(getCollectionsThunk(4, page));
    } else {
      dispatch(getCollectionsThunk(8, page));
    }
  }, [page, limit, window.innerWidth]);

  useEffect(() => {
    dispatch(getAllCollectionsThunk());
  }, []);

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <div className={style.collections}>
          <h3>Коллекции</h3>
          <div className={style.product}>
            {collections?.data?.map((c) => {
              return <CollectionItem data={c} key={c.id} />;
            })}
          </div>
          <Pagination
            defaultCurrent={1}
            current={page}
            onChange={onChange}
            total={allCollections?.length}
            showSizeChanger={false}
            className={style.pagination}
          />
        </div>
      </div>
    </>
  );
};

export default Collections;
