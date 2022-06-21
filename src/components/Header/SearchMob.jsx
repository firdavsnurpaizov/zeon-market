import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSearchThunk, setSearchData } from "../../redux/main-reducer";
import style from "./SearchMob.module.css";
import { ReactComponent as SearchIcon } from "./../../assets/svg/searchIcon.svg";
import { ReactComponent as Delete } from "./../../assets/svg/delete.svg";

const SearchMob = ({ searchForMob, setSearchForMob }) => {
  const dispatch = useDispatch();
  const [hint, setHint] = useState(false);
  const [value, setValue] = useState("");
  const { search, currentUser } = useSelector((state) => state.main);
  useEffect(() => {
    dispatch(getSearchThunk());
    console.log(currentUser);
  }, []);

  const [filteredData, setFilteredData] = useState([]);

  const getSearchedData = () => {
    console.log("work");
    setHint(false);
  };

  const searchInput = (e) => {
    setValue(e.target.value);
    setHint(true);

    let searchedData = search?.data?.filter((item) => {
      console.log(item.title);
      return item.title
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim());
    });
    e.target.value === "" ? setFilteredData([]) : setFilteredData(searchedData);
    let result = {
      items: searchedData,
      value: e.target.value,
    };

    dispatch(setSearchData({ result }));
  };



  return (
    <div
      onclick={() => setSearchForMob(!searchForMob)}
      onBlur={() => setSearchForMob(!searchForMob)}
      style={{ display: searchForMob ? "block" : "none" }}
      className={style.overlay}
    >
      <form className={style.form}>
        <input
          type="text"
          className={style.input}
          placeholder="Поиск"
          onClick={() => setHint(true)}
          onChange={(e) => searchInput(e)}
        />
        <SearchIcon className={style.searchButton} />
      </form>
      {hint && value ? (
        <div className={style.hint}>
          <NavLink to={"/search"}>
            <div className={style.hintItem} onClick={getSearchedData}>
              {filteredData.map((item) => {
                return <span>{item.title}</span>;
              })}
            </div>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default SearchMob;

{
  /* <div>
<div className={style.label}>
  <input
    className={style.searchInput}
    type="text"
    placeholder="Поиск"
    onClick={() => setHint(true)}
    onChange={(e) => searchInput(e)}
  />
  {hint && value ? (
    <div className={style.hint}>
      <NavLink to={"/search"}>
        <div className={style.hintItem} onClick={getSearchedData}>
          {filteredData.map((item) => {
            return <span>{item.title}</span>;
          })}
        </div>
      </NavLink>
    </div>
  ) : null}
</div>
{value ? (
  <NavLink to={"/search"}>
    <SearchIcon
      className={style.searchButton}
      onClick={getSearchedData}
    />
  </NavLink>
) : (
  <SearchIcon className={style.searchButton} />
)}
</div> */
}
