import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import style from "./Header.module.css";
import { ReactComponent as FavoriteIcon } from "./../../assets/svg/favorite.svg";
import { ReactComponent as FullFavoriteIcon } from "./../../assets/svg/fullFavoriteIcon.svg";
import { ReactComponent as ShoppingBagIcon } from "./../../assets/svg/shoppingBagIcon.svg";
import { ReactComponent as FullShoppingBagIcon } from "./../../assets/svg/fullShoppingBagIcon.svg";
import { ReactComponent as SearchIcon } from "./../../assets/svg/searchIcon.svg";
import serIcon from "./../../assets/svg/searchIcon.svg";
import { ReactComponent as Upicon } from "./../../assets/svg/up.svg";
import { ReactComponent as Chaticon } from "./../../assets/svg/callback.svg";
import { ReactComponent as Telegram } from "./../../assets/svg/telegram.svg";
import { ReactComponent as Telephone } from "./../../assets/svg/telephone.svg";
import { ReactComponent as Whatsapp } from "./../../assets/svg/whatsapp.svg";
import { ReactComponent as Delete } from "./../../assets/svg/delete.svg";
import del from "./../../assets/svg/delete.svg";
import { ReactComponent as Hamburger } from "./../../assets/svg/hamburger.svg";
import { auth } from "./../../firebase";
import { signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import {
  // getAllCollectionsThunk,
  // getContactsThunk,
  // getLogoThunk,
  getSearchThunk,
  setSearchData,
} from "../../redux/main-reducer";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import Success from "../UI/Success/Success";
import SearchMob from "./SearchMob";

const Header = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const {
    logo,
    contacts,
    favorites,
    cart,
    search,
    currentUser,
    userFavorites,
    userCart,
  } = useSelector((state) => state.main);

  useEffect(() => {
    dispatch(getSearchThunk());
    console.log(currentUser);
  }, []);

  const openOrderCall = () => {
    setModal(true);
    setVisible(false);
  };
  const openOrderCallForMob = () => {
    setModal(true);
    setVisible(false);
    setMenuVisible(false);
  };

  const openChat = () => {
    setVisible(true);
  };

  const deleteChat = () => {
    setVisible(false);
  };

  const classes = [style.chat];
  if (visible) {
    classes.push(style.active);
  }

  const styles = [style.chatIcon];
  if (visible) {
    styles.push(style.passive);
  }

  const continueShopping = () => {
    setModal(false);
    setSuccess(false);
  };

  const [filteredData, setFilteredData] = useState([]);

  const searchInput = (e) => {
    setValue(e.target.value);

    const searchedData = search?.data?.filter((item) => {
      console.log(item.title);
      return item.title
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim());
    });

    searchedData.length > 0 ? setHint(true) : setHint(false);

    e.target.value === "" ? setFilteredData([]) : setFilteredData(searchedData);
    let result = {
      items: searchedData,
      value: e.target.value,
    };

    dispatch(setSearchData({ result }));
  };

  const getSearchedData = () => {
    console.log("work");
    setHint(false);
  };

  async function logOut() {
    await signOut(auth);
  }

  const menuMob = [style.menuForMobile];
  if (menuVisible) {
    menuMob.push(style.activeMenu);
  }

  const [searchForMob, setSearchForMob] = useState(false);
  // const searchModal = [style.searchModal];
  // if (searchForMob) {
  //   searchModal.push(style.activeModal);
  // }

  const location = useLocation();

  console.log(location);
  const logoURL = logo[1];
  const phone = contacts[0];
  return (
    <>
      <div className={style.header}>
        <div className="container">
          <SearchMob
            style={{ display: "none" }}
            searchForMob={searchForMob}
            value={value}
            setSearchForMob={setSearchForMob}
          />
          {/* <div className={style.modalForMob}> */}

          <Modal visible={modal}>
            {success ? (
              <Success onClick={continueShopping} />
            ) : (
              <Input setVisible={setModal} order={setSuccess} />
            )}
          </Modal>

          {/* </div> */}
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
            <a href={`tel:${phone?.tel}`} className={style.phone}>
              <span>Тел:</span> {phone?.tel}
            </a>
            {/* <div>
              {currentUser ? (
                <div>
                  <Link to={"/user/profile"}>
                    <button className={style.login}> {currentUser.name}</button>
                  </Link>
                  <button
                    onClick={logOut}
                    className={style.login}
                    style={{
                      marginLeft: 20,
                      borderLeft: "1px solid #d3d3d3",
                      paddingLeft: 20,
                    }}
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <div>
                  <NavLink to={"/login"}>
                    <button className={style.login}>Войти</button>
                  </NavLink>
                  <NavLink to={"/register"}>
                    <button
                      className={style.login}
                      style={{
                        marginLeft: 20,
                        borderLeft: "1px solid #d3d3d3",
                        paddingLeft: 20,
                      }}
                    >
                      Регистрация
                    </button>
                  </NavLink>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className={style.line}></div>
        <div className="container">
          <div className={style.toolbar}>
            <div className={style.logo}>
              <NavLink to={"/"}>
                <img
                  className={style.logoImg}
                  src={logoURL?.srcURL}
                  alt="logo"
                />
              </NavLink>
              <img
                className={style.mobsearchicon}
                onClick={() => setSearchForMob((e) => !e)}
                src={searchForMob ? del : serIcon}
              />
              <div className={style.hamburgerWrapper}>
                <Hamburger
                  className={style.hamburger}
                  onClick={() => {
                    setMenuVisible(true);
                    // document.body.style.overflow = "hidden";
                  }}
                />
              </div>
              <div className={menuMob.join(" ")}>
                <Delete
                  className={style.deleteForMob}
                  onClick={() => {
                    setMenuVisible(false);
                    // document.body.style.overflow = "auto";
                  }}
                />
                <h3>Меню</h3>
                <div className={style.nav}>
                  <div className={style.link}>
                    <NavLink className={style.navlink} to={"/about"}>
                      <div
                        onClick={() => {
                          setMenuVisible(false);
                          // document.body.style.overflow = "auto";
                        }}
                        className={style.linkItem}
                      >
                        О нас
                      </div>
                    </NavLink>
                  </div>
                  <div
                    className={style.link}
                    onClick={() => {
                      setMenuVisible(false);
                      // document.body.style.overflow = "auto";
                    }}
                  >
                    <NavLink className={style.navlink} to={"/collections"}>
                      <div className={style.linkItem}>Коллекции</div>
                    </NavLink>
                  </div>
                  <div className={style.link}>
                    <NavLink className={style.navlink} to={"/news"}>
                      <div
                        onClick={() => {
                          setMenuVisible(false);
                          // document.body.style.overflow = "auto";
                        }}
                        className={style.linkItem}
                      >
                        Новости
                      </div>
                    </NavLink>
                  </div>
                </div>
                <div
                  style={{ borderTop: "1px solid #d3d3d3", width: 100 }}
                ></div>
                <div className={style.favMob}>
                  <div className={style.favorite}>
                    {userFavorites.length ? (
                      <FullFavoriteIcon
                        onClick={() => {
                          setMenuVisible(false);
                          // document.body.style.overflow = "auto";
                        }}
                        className={style.icon}
                      />
                    ) : (
                      <FavoriteIcon
                        onClick={() => {
                          setMenuVisible(false);
                          // document.body.style.overflow = "auto";
                        }}
                        className={style.icon}
                      />
                    )}
                    <NavLink
                      to={"/favorites"}
                      onClick={() => {
                        setMenuVisible(false);
                        // document.body.style.overflow = "auto";
                      }}
                      className={style.favText}
                    >
                      Избранное
                    </NavLink>
                  </div>
                  <div className={style.cart}>
                    {cart?.length ? (
                      <FullShoppingBagIcon
                        onClick={() => {
                          setMenuVisible(false);
                          // document.body.style.overflow = "auto";
                        }}
                        className={style.icon}
                      />
                    ) : (
                      <ShoppingBagIcon
                        onClick={() => {
                          setMenuVisible(false);
                          // document.body.style.overflow = "auto";
                        }}
                        className={style.icon}
                      />
                    )}
                    <NavLink
                      to={"/cart"}
                      onClick={() => {
                        setMenuVisible(false);
                        // document.body.style.overflow = "auto";
                      }}
                      className={style.favText}
                    >
                      Корзина
                    </NavLink>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 245,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <h4>Свяжитесь с нами:</h4>
                  <a href={`tel:${phone?.tel}`} className={style.phone}>
                    <span>Тел:</span> {phone?.tel}
                  </a>
                  <div
                    className={style.chatMob}
                    onClick={() => setMenuVisible(false)}
                  >
                    <a href="https://telegram.org" target="_blank">
                      <Telegram />
                    </a>
                    <a
                      href="https://www.whatsapp.com"
                      target="_blank"
                      onClick={() => setMenuVisible(false)}
                    >
                      <Whatsapp />
                    </a>
                    <Telephone
                      style={{ marginBottom: 6 }}
                      onClick={openOrderCallForMob}
                    />
                  </div>
                </div>
              </div>
            </div>
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
                  <div className={style.hintItem} onClick={getSearchedData}>
                    {filteredData.map((item) => {
                      return (
                        <NavLink
                          to={`/collections/${item.collection}/${item.id}`}
                          style={{ color: "#333" }}
                        >
                          <div>{item.title}</div>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            {value ? (
              <NavLink to={"/search"}>
                <SearchIcon
                  className={style.searchButton}
                  onClick={getSearchedData}
                  style={{ cursor: "pointer" }}
                />
              </NavLink>
            ) : (
              <SearchIcon className={style.searchButton} />
            )}

            <div className={style.fav}>
              <div className={style.favorite}>
                {userFavorites.length ? (
                  <FullFavoriteIcon className={style.icon} />
                ) : (
                  <FavoriteIcon className={style.icon} />
                )}
                <NavLink to={"/favorites"} className={style.favText}>
                  Избранное
                </NavLink>
              </div>
              <div className={style.cart}>
                {cart?.length ? (
                  <FullShoppingBagIcon className={style.icon} />
                ) : (
                  <ShoppingBagIcon className={style.icon} />
                )}
                <NavLink to={"/cart"} className={style.favText}>
                  Корзина
                </NavLink>
              </div>
            </div>
            <Upicon
              className={style.upIcon}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            {location.pathname === "/cart" ? null : (
              <Chaticon className={styles.join(" ")} onClick={openChat} />
            )}

            <div className={classes.join(" ")}>
              <a href="https://telegram.org" target="_blank">
                <Telegram />
              </a>
              <a href="https://www.whatsapp.com" target="_blank">
                <Whatsapp />
              </a>
              <Telephone style={{ marginBottom: 6 }} onClick={openOrderCall} />
              <Delete onClick={deleteChat} />
            </div>
          </div>
        </div>
        <div className={style.line}></div>
      </div>
    </>
  );
};

export default Header;
