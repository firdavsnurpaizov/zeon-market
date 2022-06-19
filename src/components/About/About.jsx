import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAboutThunk } from "../../redux/about-reducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import style from "./About.module.css";

const About = () => {
  const dispatch = useDispatch();
  const { about, loading } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(getAboutThunk());
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
      <div className="container">
        <div className={style.about}>
          <div className={style.images}>
            <div className={style.wrapper}>
              <img
                className={style.img}
                src={about[0]?.images[0].src}
                alt="image"
              />
              <img
                className={style.img}
                src={about[0]?.images[1].src}
                alt="image"
              />
            </div>
            <div className={style.item}>
              <img
                className={style.img}
                src={about[0]?.images[2].src}
                alt="image"
              />
            </div>
          </div>
          <div className={style.item}>
            <div className={style.description}>
              <h3>О нас</h3>
              <div className={style.text}>
                {about.map((d) => {
                  return d.description;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
