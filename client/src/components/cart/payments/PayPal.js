import React, { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "material-react-toastify";

import { clearCart } from "../../../actions/cartActions";

export default function PayPal({ order, clearErrors, createOrder }) {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { error } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePayment = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const items = order.orderItems.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity,
    }));
    const body = { ...order, orderItems: items };
    delete body.shippingInfo;

    // code to create the order on paypal and get orderId
    try {
      const { data } = await axios.post(
        "/api/payment/process/paypal",
        body,
        config
      );
      const { id } = data;
      return id;
    } catch (err) {
      console.error(err.error);
      toast.error(err.error);
    }
  };

  function onApprove(data, actions) {
    // the payment is processed or not
    return actions.order.capture().then(function (details) {
      if (details.status === "COMPLETED") {
        order.paymentInfo = {
          id: details.id,
          status: details.status,
          provider: "PayPal",
        };

        dispatch(createOrder(order));
        dispatch(clearCart());
        history.push("/success");
      }
    });
  }

  const onError = (err) => {
    console.error(err.error);
    toast.error(err.error);
  };

  useEffect(() => {
    const getPaypalApiKey = async () => {
      try {
        const { data } = await axios.get("/api/paypalapi");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": data.paypalApiKey,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      } catch (error) {
        console.error(error);
      }
    };

    getPaypalApiKey();
  }, [paypalDispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, clearErrors]);

  return (
    <>
      {isPending ? (
        <h4>Loading</h4>
      ) : (
        <PayPalButtons
          style={{ shape: "pill" }}
          createOrder={handlePayment}
          onApprove={onApprove}
          onError={onError}
        />
      )}
    </>
  );
}
