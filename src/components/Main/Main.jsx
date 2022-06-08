import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import carouselImage from "./../../assets/img/carousel.png";
// import fullFavoriteIcon from "./../../assets/svg/fullFavoriteIcon.svg";
import style from "./Main.module.css";
// import upIcon from "./../../assets/svg/up.svg";
import {
  getAdvantagesThunk,
  getBestsellerThunk,
  getCollectionsThunk,
  getNoveltyThunk,
} from "../../redux/main-reducer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import Button from "../UI/Button/Button";
import CollectionItem from "../CollectionItem/CollectionItem";
import Advantages from "../Аdvantages/Advantages";
// import {ReactComponent as Money} from "./../../assets/svg/money1.svg"
// import {ReactComponent as Truck} from "./../../assets/svg/truck2.svg"
// import {ReactComponent as Headphones} from "./../../assets/svg/headphones3.svg"
// import {ReactComponent as Shop} from "./../../assets/svg/shop4.svg"

const Main = () => {
  const dispatch = useDispatch();
  const { bestseller, novelty, collections, advantages } = useSelector(
    (state) => state.main
  );

  const [limitNovelty, setLimitNovelty] = useState(4);
  const [limitBestseller, setLimitBestseller] = useState(8);
  const [limitCollections, setCollections] = useState(4);

  useEffect(() => {
    dispatch(getAdvantagesThunk());
  }, []);

  useEffect(() => {
    dispatch(getBestsellerThunk(limitBestseller));
    dispatch(getNoveltyThunk(limitNovelty));
    dispatch(getCollectionsThunk(limitCollections));
  }, [
    getBestsellerThunk,
    getNoveltyThunk,
    limitNovelty,
    limitBestseller,
    limitCollections,
  ]);

  const alsoN = () => {
    setLimitNovelty(8);
  };
  const alsoB = () => {
    setLimitBestseller(limitBestseller + 4);
  };
  const alsoC = () => {
    setCollections(limitCollections + 4);
  };

  //   const icons = {
  //     1: <Money/>,
  //     2: <Truck/>,
  //     3:<Headphones/>,
  //     4: <Shop/>
  // }

  return (
    <div className={style.main}>
  
      <div className="container">
        <Carousel>
          <img src={carouselImage} alt="carouse iImage" />
          {/* <img src={fullFavoriteIcon} alt="full favorite icon" /> */}
        </Carousel>

        {/* <div className={style.btn}>
          <img className={style.upIcon} src={upIcon} alt="arrow up icon" />
        </div> */}

        <h3>Хит продаж</h3>
        <div className={style.product}>
          {bestseller.data?.map((b) => (
            <Product data={b} key={b.id} />
          ))}
        </div>
        <Button onClick={() => alsoB()}>Ещё</Button>
        <h3>Новинки</h3>
        <div className={style.product}>
          {novelty.map((b) => (
            <Product data={b} key={b.id} />
          ))}
        </div>
        <Button onClick={() => alsoN()}>Ещё</Button>
        <div className={style.product}>
          {collections.map((c) => {
            return <CollectionItem data={c} key={c.id} />;
          })}
        </div>
        <Button onClick={() => alsoC()}>Ещё</Button>
        <h3>Наши преимущества</h3>
        <div className={style.advantages}>
          {advantages.map((a) => {
            return <Advantages data={a} key={a.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
