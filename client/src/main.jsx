import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { store } from "./redux/store.js";
// import { Provider } from "react-redux";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
/* 
 We cover App with the redux provider so that I can be used all across the application
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
