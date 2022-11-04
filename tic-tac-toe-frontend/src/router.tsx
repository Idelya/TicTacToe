import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "./Pages/GamePage";
import { LoginPage } from "./Pages/LoginPage";
import { MainPage } from "./Pages/MainPage";
import { ResultPage } from "./Pages/ResultPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/game/:gameid",
    element: <GamePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default Router;
