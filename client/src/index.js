import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.render(
  <Provider store={store}>
    <PayPalScriptProvider
      /*  options={{ components: "buttons" }} */
      deferLoading={true}
    >
      <App />
    </PayPalScriptProvider>
  </Provider>,
  document.getElementById("root")
);
