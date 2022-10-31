import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <div>main</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default Router;
