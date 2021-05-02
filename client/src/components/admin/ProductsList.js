import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ToastAlert from "../layout/ToastAlert";
import ProductTable from "./ProductsTable";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { getAdminProducts } from "../../actions/productActions";

const ProductsList = (props) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [error, dispatch]);

  products && console.log(products);

  const rows = [];

  products &&
    products.forEach((product) => {
      rows.push({
        ID: product._id,
        Name: product.name,
        Price: product.price,
        Stock: product.stock,
        Action: `dashboard/admin/product/${product._id}`,
      });
    });

  return (
    <>
      <MetaData title={"All Products"} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
          alignContent="flex-start"
          container
          spacing={2}
          style={{ margin: "0 auto" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ margin: "20px 0" }}
            >
              All <span>Products</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProductTable rows={rows} />
          </Grid>
        </Grid>
      )}
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
};

export default ProductsList;
