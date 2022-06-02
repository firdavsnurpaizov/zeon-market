import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { ReactComponent as FavoriteIcon } from "./../../assets/svg/favorite.svg";
import { ReactComponent as FullFavoriteIcon } from "./../../assets/svg/fullFavoriteIcon.svg";
import { ReactComponent as ShoppingBagIcon } from "./../../assets/svg/shoppingBagIcon.svg";
// import {ReactComponent as FullShoppingBagIcon} from "./../../assets/svg/fullShoppingBagIcon.svg";
import searchIcon from "./../../assets/svg/searchIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getContactsThunk, getLogoThunk } from "../../redux/main-reducer";
import BreadCrumb from "../Breadcrumb/BreadCrumbs";

const Header = () => {
  const dispatch = useDispatch();
  const { logo, contacts, favorites } = useSelector((state) => state.main);
  // console.log(favorites);
  useEffect(() => {
    dispatch(getLogoThunk());
    dispatch(getContactsThunk());
  }, []);

  const logoURL = logo[1];
  const phone = contacts[0];
  return (
    <>
      <div className={style.header}>
        <div className="container">
          <div className={style.menu}>
            <div className={style.nav}>
              <div className={style.link}>
                <NavLink className={style.navlink} to={"/about"}>
                  <div className={style.linkItem}>О нас</div>
                </NavLink>
              </div>
              <div className={style.link}>
                <NavLink className={style.navlink} to={"/collections"}>
                  <div className={style.linkItem}>Коллекции</div>
                </NavLink>
              </div>
              <div className={style.link}>
                <NavLink className={style.navlink} to={"/news"}>
                  <div className={style.linkItem}>Новости</div>
                </NavLink>
              </div>
            </div>
            <div className={style.phone}>
              <span>Тел:</span> {phone?.tel}
            </div>
          </div>

          <div className={style.toolbar}>
            <div className={style.logo}>
              <NavLink to={"/"}>
                <img src={logoURL?.srcURL} alt="logo" />
              </NavLink>
            </div>

            <input
              className={style.searchInput}
              type="text"
              placeholder="Поиск"
            />
            {/* <button > */}
            <img
              className={style.searchButton}
              src={searchIcon}
              alt="search icon"
            />
            {/* </button> */}

            <div className={style.fav}>
              <div className={style.favorite}>
                {favorites.length ? (
                  <FullFavoriteIcon className={style.icon} />
                  ) : (
                    <FavoriteIcon className={style.icon} />
                )}
                <NavLink to={"/favorites"} className={style.favText}>
                  Избранное
                </NavLink>
              </div>
              <div className={style.cart}>
                <ShoppingBagIcon className={style.icon} />
                {/* <FullShoppingBagIcon className={style.icon} /> */}
                <NavLink to={"/cart"} className={style.favText}>
                  Корзина
                </NavLink>
              </div>
            </div>
          </div>
          <BreadCrumb />
        </div>
      </div>
    </>
  );
};

export default Header;
