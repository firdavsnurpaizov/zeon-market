import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const User = () => {
  return (
    <>
      <div className="container">
        <div>
          <div>
            <Link to={"/user/history"}>История заказов</Link>
          </div>
          <div>
            <Link to={"/user/profile"}>Профиль</Link>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default User;
