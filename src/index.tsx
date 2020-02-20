import "antd/dist/antd.css";
import notification from "antd/es/notification";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { DbContext, openDatabase } from "./database/database";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { initStore } from "./store";

openDatabase().then(
  db => {
    ReactDOM.render(
      <DbContext.Provider value={db}>
        <Provider store={initStore(db)}>
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

serviceWorker.register({
  onUpdate: () => {
    notification.info({
      message: "New version available!",
      description:
        "To use the updated version, close all tabs for this site and reopen it",
      duration: 0
    });
  }
});
