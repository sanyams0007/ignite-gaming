import { useDispatch, useSelector } from "react-redux";
/* import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react"; */

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import MetaData from "../layout/MetaData";

const ReviewOrder = ({ prev, next }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  function subtotal(items) {
    return items
      .map(({ price, quantity }) => price * quantity)
      .reduce((sum, i) => sum + i, 0);
  }

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const TAX_RATE = 0.07;
  const invoiceSubtotal = subtotal(cartItems);
  const SHIPPING_COST = invoiceSubtotal > 50 ? 0 : 4.9;
  const invoiceTaxes = TAX_RATE * invoiceSubtotal + SHIPPING_COST;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const proceedToPayment = (e) => {
    e.preventDefault();

    const data = {
      invoiceSubtotal: invoiceSubtotal.toFixed(2),
      invoiceShipping: SHIPPING_COST,
      invoiceTaxes: invoiceTaxes.toFixed(2),
      invoiceTotal: invoiceTotal.toFixed(2),
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    //dispatch();
    next();
  };

  return (
    <>
      <MetaData title="Order Review" />
      <Grid item spacing={3} xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Review
        </Typography>
      </Grid>
      <Grid item xs={12} md={5}>
        <Typography variant="h4" component="h4" gutterBottom>
          Shipping Info
        </Typography>
        <Typography component="p" gutterBottom>
          <b> Name : </b>
          {shippingInfo.firstName
            ? ` ${shippingInfo.firstName} ${shippingInfo.lastName} `
            : ""}
        </Typography>
        <Typography component="p" gutterBottom>
          <b> Phone : </b> {shippingInfo.phoneNo ? shippingInfo.phoneNo : ""}
        </Typography>
        <Typography component="p" gutterBottom>
          <b> Address : </b>
          {shippingInfo.address
            ? ` ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country} `
            : ""}
        </Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box my={2} bgcolor="rgba(255,255,255,.12)" borderRadius="10px">
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
                {invoiceSubtotal.toFixed(2) < 50 ? (
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Shipping</TableCell>
                    <TableCell align="right">
                      {ccyFormat(SHIPPING_COST)}
                    </TableCell>
                  </TableRow>
                ) : null}
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
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button onClick={prev} variant="contained" color="primary">
            Back
          </Button>
          <Button
            onClick={proceedToPayment}
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default ReviewOrder;
