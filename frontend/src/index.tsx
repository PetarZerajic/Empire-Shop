import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "./router/router";
import { persistor, store } from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import.meta.env.VITE_PAYPAL_CLIENT_ID

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ clientId }}
        >
          <Router />
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
