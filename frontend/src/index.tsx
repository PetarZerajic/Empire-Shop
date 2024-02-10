import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "./router/router";
import { persistor, store } from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
