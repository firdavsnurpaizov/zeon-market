import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoveltyThunk, getSearchThunk } from "../../redux/main-reducer";
import Product from "../Product/Product";
import Recommendation from "../Recommendation/Recommendation";
import style from "./Search.module.css";
import { Pagination } from "antd";

const Search = () => {
  const { searchResult, novelty } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getNoveltyThunk(5));
  }, []);

  const search = searchResult?.result?.items?.slice(
    (page - 1) * limit,
    page * limit
  );

  function onChange(page) {
    setPage(page);
  }
  return (
    <div className="container">
      <div className={style.search}>
        <h3>
          Результаты поиска по запросу: {searchResult?.result?.value || ""}{" "}
        </h3>

        {!searchResult?.result?.items ||
        searchResult?.result?.items.length <= 0 ? (
          <div className={style.wrapper}>
            <h4>По Вашему запросу ничего не найдено.</h4>
            <h3>Вoзможно Вас заинтересует</h3>
            <div className={style.recommendation}>
              {novelty.data?.map((item) => (
                <Recommendation data={item} key={item.id} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {search?.map((item) => (
                <Product data={item} />
              ))}
            </div>
            <Pagination
              defaultCurrent={1}
              current={page}
              onChange={onChange}
              defaultPageSize={limit}
              total={8}
              showSizeChanger={false}
              className={style.pagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
