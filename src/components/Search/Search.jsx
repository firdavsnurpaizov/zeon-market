import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoveltyThunk } from "../../redux/main-reducer";
import Product from "../Product/Product";
import Recommendation from "../Recommendation/Recommendation";
import style from "./Search.module.css";

const Search = () => {
  const dispatch = useDispatch();
  const { searchResult, novelty } = useSelector((state) => state.main);

  console.log(searchResult);

  useEffect(() => {
    dispatch(getNoveltyThunk(5));
  }, []);

  return (
    <div className="container">
      <div className={style.search}>
        <h3>Результаты поиска по запросу: {searchResult?.result[1]} </h3>

        {searchResult?.result[0].length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {searchResult?.result[0].map((item) => (
              <Product data={item} />
            ))}
          </div>
        ) : (
          <div>
            <div>По Вашему запросу ничего не найдено.</div>
            <h3>Вoзможно Вас заинтересует</h3>
            <div  className={style.recommendation}>
            {novelty.data?.map(item=> <Recommendation data={item} key={item.id}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
