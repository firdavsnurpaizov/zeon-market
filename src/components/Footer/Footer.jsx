import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./Footer.module.css";
import phoneIcon from "./../../assets/svg/phoneIcon.svg";
import emailIcon from "./../../assets/svg/emailIcon.svg";
import instagramIcon from "./../../assets/svg/instagramIcon.svg";
import telegramIcon from "./../../assets/svg/telegramIcon.svg";
import whatsappIcon from "./../../assets/svg/whatsappIcon.svg";
import { getContactsThunk, getLogoThunk } from "../../redux/main-reducer";

const Footer = () => {
  const { logo, contacts } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const logoURL = logo[0];
  const phone = contacts[0];

  useEffect(() => {
    dispatch(getLogoThunk());
    dispatch(getContactsThunk());
  }, []);

  return (
    <>
      <div className={style.wrapper}>
        <div className="container">
          <div className={style.footer}>
            <div className={style.logo}>
              <NavLink
                to={"/"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img src={logoURL?.srcURL} alt="logo" />
              </NavLink>
            </div>

            <div className={style.company}>
              <h3>Компания</h3>
              <NavLink
                className={style.navlink}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={"/about"}
              >
                <div className={style.companyItem}>О нас</div>
              </NavLink>
              <NavLink
                className={style.navlink}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={"/news"}
              >
                <div className={style.companyItem}>Новости</div>
              </NavLink>
              <NavLink
                className={style.navlink}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={"/help"}
              >
                <div className={style.companyItem}>Помощь</div>
              </NavLink>
            </div>

            <div className={style.contacts}>
              <h3>Контакты</h3>
              <a href={`tel:${phone?.phone}`} className={style.phoneIcon}>
                <img src={phoneIcon} alt="phoneIcon" />
                <div className={style.contactsItem}>{phone?.phone}</div>
              </a>
              <a href={`tel:${phone?.phone}`} className={style.phoneIcon}>
                <img src={phoneIcon} alt="phoneIcon" />
                <div className={style.contactsItem}>{phone?.phone}</div>
              </a>
              <a href={`mailto:${phone?.email}`} className={style.phoneIcon}>
                <img src={emailIcon} alt="phoneIcon" />
                <div className={style.contactsItem}>{phone?.email}</div>
              </a>
            </div>

            <div className={style.media}>
              <h3>Мы в социальных сетях:</h3>
              <a
                href="https://instagram.com"
                target="_blank"
                className={style.phoneIcon}
              >
                <img src={instagramIcon} alt="instagramIcon" />
                <div className={style.mediaItem}>{phone?.instagram}</div>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                className={style.phoneIcon}
              >
                <img src={telegramIcon} alt="telegramIcon" />

                <div className={style.mediaItem}>{phone?.telegram}</div>
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                className={style.phoneIcon}
              >
                <img src={whatsappIcon} alt="whatsappIcon" />
                <div className={style.mediaItem}>{phone?.whatsapp}</div>
              </a>
            </div>
          </div>
          <div className={style.copyright}>Developed by Zeon 2022</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
