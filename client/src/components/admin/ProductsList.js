import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ProductsTable from "../custom/Table";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductsList = ({ history, match }) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product deleted successfully");
      history.push(match.path);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [error, dispatch, match.path, isDeleted, deleteError, history]);

  const rows = [];

  products &&
    products.forEach((product) => {
      rows.push({
        ID: product._id,
        Name: product.name,
        Price: product.price,
        Stock: product.stock,
        Actions: product._id,
      });
    });

  const columns = [
    { id: "ID", label: "Product ID", minWidth: 150 },
    { id: "Name", label: "Name", minWidth: 120 },
    {
      id: "Price",
      label: "Price",
      minWidth: 80,
      format: (value) => `$ ${value.toLocaleString("en-US")}`,
    },
    {
      id: "Stock",
      label: "Stock",
      minWidth: 50,
      align: "right",
      format: (value) =>
        Number(value) > 0 ? (
          <span style={{ color: "green" }}>{Number(value)}</span>
        ) : (
          <span style={{ color: "red" }}>{Number(value)}</span>
        ),
    },
    {
      id: "Actions",
      label: "Actions",
      minWidth: 100,
      align: "right",
      format: (value) => (
        <>
          <IconButton aria-label="edit">
            <Link to={`product/${value}`}>
              <EditIcon color="primary" />
            </Link>
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteProductHandler(value)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

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
            <ProductsTable columns={columns} rows={rows} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductsList;
