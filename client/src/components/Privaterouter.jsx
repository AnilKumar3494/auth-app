import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Privaterouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  //if current user is their return profile page - this is a clildren page so we use Outlet from react-router-dom
  //Here we use Navigate which is a component from react-router-dom and we cannot use  navigate("/sign-in"); as it is not possible
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default Privaterouter;
