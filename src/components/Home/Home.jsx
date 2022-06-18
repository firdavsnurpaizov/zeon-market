import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./../../firebase";

const Home = () => {
  useAuth();
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Home;
