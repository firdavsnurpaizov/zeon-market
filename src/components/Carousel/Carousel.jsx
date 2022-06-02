import React, { useEffect, useState } from "react";
import style from "./Carousel.module.css";

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(children)) {
      setImages([...children]);
    } else {
      setImages([...images, children]);
    }
 
    for (let i = images.length; i < 6; i++) {
      setImages((prevState) => [...prevState, ...prevState]);
    }
  }, []);

  // const prev = () => {
  //   setActiveIndex(activeIndex ? activeIndex - 1 : images.length - 1);
  // };

  setTimeout(() => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }, 4000);

  // const next = () => {
  //   setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  // };

  const prevIndex = activeIndex ? activeIndex - 1 : images.length - 1;
  const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

  const left = prevIndex ? prevIndex - 1 : images.length - 1;
  const right = nextIndex === images.length - 1 ? 0 : nextIndex + 1;

  return (
    <div>
      {/* <button onClick={prev}>Prev</button> */}
      {/* <button onClick={next}>Next</button> */}
      <div className="container">
        <div className={style.slider}>
          <div className={(style.box, style.imgLeft)} key={left}>
            {images[left]}
          </div>
          <div className={(style.box, style.imgPrev)} key={prevIndex}>
            {images[prevIndex]}
          </div>
          <div key={activeIndex}>{images[activeIndex]}</div>
          <div className={(style.box, style.imgNext)} key={nextIndex}>
            {images[nextIndex]}
          </div>
          <div className={(style.box, style.imgRight)} key={right}>
            {images[right]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
