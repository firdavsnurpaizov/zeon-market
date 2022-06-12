import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsThunk } from "../../redux/main-reducer";
import CollectionItem from "../CollectionItem/CollectionItem";

import style from "./Collections.module.css";

const Collections = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.main);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  let pagesArray = []
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1)
  }
console.log(collections);
  useEffect(() => {
    dispatch(getCollectionsThunk(limit, page));
    const totalCount = collections?.headers['x-total-count']
    setTotalPages(Math.ceil(+totalCount / limit))
  }, [page]);

  return (
    <>
      <div className="container">
        <div className={style.collections}>
          <h3>Коллекции</h3>
          <div className={style.product}>
            {collections?.data?.map((c) => {
              return <CollectionItem data={c} key={c.id} />;
            })}
          </div>
          {
          pagesArray.map(p =>
            <button
              onClick={() => setPage(p)}
              className={page === p ? 'btn btnActive' : 'btn'}
              key={p}>{p}
            </button>
          )
        }
        </div>
      </div>
    </>
  );
};

export default Collections;
