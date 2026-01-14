import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet />
    </div>
  );
}
