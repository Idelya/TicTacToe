import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { MainPage } from "./Pages/MainPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default Router;
