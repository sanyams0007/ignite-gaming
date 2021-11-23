import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "material-react-toastify";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { clearCart } from "../../../actions/cartActions";

export default function COD({ order, clearErrors, createOrder }) {
  const { error } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();
  const history = useHistory();

  const createOrderByCOD = () => {
    console.log(order);
    order.paymentInfo = {
      status: "incomplete",
      provider: "COD",
    };

    dispatch(createOrder(order));
    dispatch(clearCart());
    history.push("/success");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Amount to be paid on Delivery is ${order && order.totalPrice}
      </Typography>
      <Button variant="contained" color="primary" onClick={createOrderByCOD}>
        Place Order
      </Button>
    </>
  );
}
