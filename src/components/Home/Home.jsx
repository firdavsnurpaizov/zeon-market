import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserCartThunk, getUserFavoritesThunk } from "../../redux/main-reducer";
import { useAuth } from "./../../firebase";

const Home = () => {
  const { currentUser, userFavorites, userCart } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      dispatch(getUserFavoritesThunk(currentUser.id));
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      dispatch(getUserCartThunk(currentUser.id));
    }
  }, [currentUser]);


  // console.log(userCart);

  useAuth();
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Home;
