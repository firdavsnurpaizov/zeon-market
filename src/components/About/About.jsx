import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAboutThunk } from "../../redux/about-reducer";
import style from "./About.module.css";

const About = () => {
  const dispatch = useDispatch();
  const { about, loading } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(getAboutThunk());
  }, []);

  return (
    <div className="container">
      <div className={style.about}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <img
            style={{ width: 327 }}
            src={about[0]?.images[0].src}
            alt="image"
          />
          <img
            style={{ width: 327 }}
            src={about[0]?.images[1].src}
            alt="image"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ width: 327 }}
            src={about[0]?.images[2].src}
            alt="image"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
  );
};

export default About;
