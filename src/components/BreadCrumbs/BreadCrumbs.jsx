import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import style from "./BreadCrumbs.module.css";

const BreadCrumbs = () => {
  const voc = {
    news: "Новости",
    cart: "Корзина",
    favorites: "Избранные",
    help: "Помощь",
    public: "Публичная оферта",
    collections: "Коллекции",
    about: "О нас",
    spring2020: "Весна 2020",
    summer2020: "Лето 2020",
    fall2020: "Осень 2020",
    winter2020: "Зима 2020",
    casual2020: "Юбки",
    beach2020: "Пляжный",
    skirts2020: "Повседневная одежда",
    jeans2020: "Джинсы",
    product: "Вечернее платье",
  };

  const location = useLocation();

  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div className={style.breadcrumb}>
        <Breadcrumb>
          {pathnames.length > 0 && (
            // (
            //   <Breadcrumb.Item>
            //     <Link to="/">Главная</Link>
            //   </Breadcrumb.Item>
            // ) :
            <Breadcrumb.Item>
              {" "}
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
            // console.log(routeTo);
            const isLast = index === pathnames.length - 1;
            let test = +name;
            if (test) name = "product";
            return isLast ? (
              <Breadcrumb.Item key={name}>
                {capatilize(voc[name])}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={name}>
                <Link to={`/${routeTo}`}>{capatilize(voc[name])}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumbs;
