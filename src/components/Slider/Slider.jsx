import React from "react";
import { Carousel } from "antd";
import Image from "../../assets/img/carousel.png";
import style from "./Slider.module.css";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Slider = () => (
  <Carousel autoplay className={style.carousel}>
    <div>
      <img src={Image} alt="" />
    </div>
    <div>
      <img src={Image} alt="" />
    </div>
    <div>
      <img src={Image} alt="" />
    </div>
    <div>
      <img src={Image} alt="" />
    </div>
  </Carousel>
);

export default Slider;
