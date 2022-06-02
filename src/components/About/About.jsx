import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAboutThunk } from "../../redux/about-reducer";
import style from "./About.module.css";

const About = () => {
  const dispatch = useDispatch();
  const { about, loading } = useSelector((state) => state.about);

  // console.log(loading);

  useEffect(() => {
    dispatch(getAboutThunk());
  }, []);

  return (
    <div className={style.about}>
      <div className="container">
        <div className={style.df}>
          <div className={style.galery}>
            <div>
              <div className="row">
                <div className="col-6">
                  <img src="" alt="" />
                  {loading ? <span>Loading</span> : about[0].images.map(item => {
                    return <img key={item.id} src={item.src}/>
                  })}
                  {/* <img src={about[0]?.images[0]?.src} alt="" />
                  <img src={about[0]?.images[2]?.src} alt="" />
                  <img src={about[0]?.images[1]?.src} alt="" /> */}
                </div>
              </div>
            </div>
          </div>

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
