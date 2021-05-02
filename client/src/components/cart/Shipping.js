import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
//import { useHistory } from "react-router";
import { useState } from "react";

import MetaData from "../layout/MetaData";
import { saveShippingInfo } from "../../actions/cartActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    "& .MuiInputBase-input": {
      color: "#dd22cc",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #fff",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
  },
}));

const Shipping = ({ next }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const countriesList = Object.entries(countries).map(
    (country) => `${country[1].name}-${country[0]}`
  );

  const { shippingInfo } = useSelector((state) => state.cart);

  const [firstName, setFirstName] = useState(shippingInfo.firstName);
  const [lastName, setLastName] = useState(shippingInfo.lastName);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      firstName &&
      lastName &&
      address &&
      city &&
      phoneNo &&
      postalCode &&
      country
    ) {
      dispatch(
        saveShippingInfo({
          firstName,
          lastName,
          address,
          city,
          phoneNo,
          postalCode,
          country,
        })
      );
      next();
    }
  };

  return (
    <>
      <MetaData title="Shipping Info" />
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.root}
          required
          id="firstName"
          name="firstName"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          autoComplete="given-name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.root}
          required
          id="lastName"
          name="lastName"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.root}
          required
          id="address1"
          name="address1"
          label="Address line 1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          autoComplete="shipping address-line1"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.root}
          required
          id="city"
          name="city"
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          autoComplete="shipping address-level2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.root}
          type="number"
          id="phone"
          name="phone"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          label="Phone Number"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.root}
          required
          type="number"
          id="zip"
          name="zip"
          label="Zip / Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          fullWidth
          autoComplete="shipping postal-code"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.root}
          required
          select
          id="country"
          name="country"
          fullWidth
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          autoComplete="shipping country"
        >
          {countriesList.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Continue
        </Button>
      </Grid>
    </>
  );
};

export default Shipping;
