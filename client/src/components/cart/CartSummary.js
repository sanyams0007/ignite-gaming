import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

export default function CartSummary() {
  const history = useHistory();

  const { cartItems } = useSelector((state) => state.cart);

  /*  function subtotal(items) {
    return items
      .map(({ price, quantity }) => price * quantity)
      .reduce((sum, i) => sum + i, 0);
  }

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const TAX_RATE = 0.07;
  const invoiceSubtotal = subtotal(cartItems);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal; */

  const handleCheckout = () => {
    history.push("/login?redirect=checkout");
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>

      {/* <Box my={2} bgcolor="rgba(255,255,255,.12)" borderRadius="10px">
        <TableContainer component={Paper}>
          <Table aria-label="order detail">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details (
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}{" "}
                  items)
                </TableCell>

                <TableCell align="right">Est. Total&nbsp;($)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Price&nbsp;($)</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.product}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography variant="h6" component="p">
          Total Items:
        </Typography>
        <Typography variant="h6" component="span">
          {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (
          Units )
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography variant="h6" component="p">
          Est. Total:
        </Typography>
        <Typography variant="h6" component="span">
          ${" "}
          {Number(
            cartItems.reduce(
              (acc, item) => acc + Number(item.quantity) * Number(item.price),
              0
            )
          ).toFixed(2)}
        </Typography>
      </Box>
      <Divider />

      <Box display="flex" justifyContent="center" my={2}>
        <Button variant="contained" color="secondary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
