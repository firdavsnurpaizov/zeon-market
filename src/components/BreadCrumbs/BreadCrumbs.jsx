import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import style from "./BreadCrumbs.module.css";

const BreadCrumbs = () => {

  




  const location = useLocation();

  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div className={style.breadcrumb}>
        <Breadcrumb>
          {pathnames.length > 0 &&
            // (
            //   <Breadcrumb.Item>
            //     <Link to="/">Главная</Link>
            //   </Breadcrumb.Item>
            // ) :
            <Breadcrumb.Item>
              {" "}
              <Link to="/home">Главная</Link>
            </Breadcrumb.Item>
          }
          {pathnames.map((name, index) => {
            const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
            // console.log(routeTo);
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item  key={name}>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={name}>
                <Link to={`/${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            ) 
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumbs;
