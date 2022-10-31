import React from "react";
import Layout from "./components/layout/Layout";
import { RouterProvider } from "react-router-dom";
import Router from "./router";

function App() {
  return (
    <div>
      <Layout>
        <RouterProvider router={Router} />
      </Layout>
    </div>
  );
}

export default App;
