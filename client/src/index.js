import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store/store.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <Context> */}
      <App />
      {/* </Context> */}
    </React.StrictMode>
  </Provider>
);
