import React from "react";
import Layout from "./components/layout/Layout";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Layout>
          <RouterProvider router={Router} />
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
