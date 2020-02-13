import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { DbContext, openDatabase } from "./features/project/database";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { initStore } from "./store";

openDatabase().then(
  db => {
    ReactDOM.render(
      <DbContext.Provider value={db}>
        <Provider store={initStore()}>
          <App />
        </Provider>
      </DbContext.Provider>,
      document.getElementById("root")
    );
  },
  e => {
    const errorMsg = `Error: Cannot open database: ${String(e)}`;
    document.body.innerText = errorMsg;
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
