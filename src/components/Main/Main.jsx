import React, { useEffect, useState } from "react";
// import Carousel from "../Carousel/Carousel";
// import carouselImage from "./../../assets/img/carousel.png";
// import fullFavoriteIcon from "./../../assets/svg/fullFavoriteIcon.svg";
import style from "./Main.module.css";
import {
  getAdvantagesThunk,
  getBestsellerThunk,
  getCollectionsThunk,
  getNoveltyThunk,
  getUserThunk,
} from "../../redux/main-reducer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import Button from "../UI/Button/Button";
import CollectionItem from "../CollectionItem/CollectionItem";
import Advantages from "../Аdvantages/Advantages";
import Slider from "../Slider/Slider";

const Main = () => {
  const dispatch = useDispatch();
  const { bestseller, novelty, collections, advantages, currentUser } =
    useSelector((state) => state.main);

  const [limitNovelty, setLimitNovelty] = useState(4);
  const [limitBestseller, setLimitBestseller] = useState(8);
  const [limitCollections, setCollections] = useState(4);

  useEffect(() => {
    dispatch(getAdvantagesThunk());
  }, []);

  // console.log(currentUser);

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

  return (
    <div className={style.main}>
      <div className="container">
        <div>
          <Slider />
        </div>
        <h3>Хит продаж</h3>
        <div className={style.product}>
          {bestseller?.data?.map((b) => (
            <Product data={b} key={b.id} />
          ))}
        </div>

        {16 === bestseller?.data?.length ? null : (
          <Button onClick={alsoB}>Ещё</Button>
        )}
        <h3 style={{ marginTop: 44 }}>Новинки</h3>
        <div className={style.product}>
          {novelty?.data?.map((b) => (
            <Product data={b} key={b.id} />
          ))}
        </div>
        {8 === novelty?.data?.length ? null : (
          <Button onClick={() => alsoN()}>Ещё</Button>
        )}
        <h3 style={{ marginTop: 44 }}>Коллекция</h3>
        <div className={style.product}>
          {collections?.data?.map((c) => {
            return <CollectionItem data={c} key={c.id} />;
          })}
        </div>
        {8 === collections?.data?.length ? null : (
          <Button onClick={() => alsoC()}>Ещё</Button>
        )}

        <h3 style={{ marginTop: 44 }}>Наши преимущества</h3>
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
