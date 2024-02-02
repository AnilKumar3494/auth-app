import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { store } from "./redux/store.js";
// import { Provider } from "react-redux";

import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/* 
 We cover App with the redux provider so that I can be used all across the application
 and it is configured in store.js
 Next step is to create user slice
*/
//PersistGate for storing data in the local
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
