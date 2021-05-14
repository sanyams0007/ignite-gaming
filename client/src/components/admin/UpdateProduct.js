import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import { useStyles } from "../cart/cartStyles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";

import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ match, history }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "RPG",
    "Shooter/FPS",
    "Shooter/TPS",
    "Action",
    "Adventure",
    "Horror",
    "Survival/Strategy",
    "Racing",
    "Sports/Outdoor",
    "Fighting",
    "Battle Royale",
  ];

  const dispatch = useDispatch();

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );
  const { error, product } = useSelector((state) => state.productDetails);

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(product.seller);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product updated successfully");
      history.push("/dashboard/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    toast,
    error,
    dispatch,
    isUpdated,
    history,
    updateError,
    productId,
    product,
  ]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  return (
    <>
      <MetaData title={"Update Product"} />

      <Grid
        item
        spacing={2}
        xs={12}
        sm={10}
        lg={8}
        alignContent="flex-start"
        container
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            component="h2"
            style={{ margin: "20px 0" }}
          >
            Update <span>Product</span>
          </Typography>
        </Grid>
        <form encType="multipart/form-data">
          <Grid
            item
            spacing={6}
            xs={12}
            justify="center"
            container
            style={{ margin: "0 auto" }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.root}
                required
                id="name"
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.root}
                required
                id="price"
                name="price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.root}
                required
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.root}
                required
                select
                id="category"
                name="category"
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.root}
                required
                id="stock"
                name="stock"
                label="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.root}
                required
                id="seller"
                name="seller"
                label="Seller"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="text"
                component="label"
                startIcon={<PhotoCamera />}
                style={{ borderBottom: "1px solid #fff", borderRadius: "0" }}
              >
                Upload Images
                <input
                  type="file"
                  name="product_images"
                  hidden
                  accept="image/*"
                  onChange={handleChange}
                  multiple
                />
              </Button>
            </Grid>
            {oldImages && (
              <Grid item xs={12}>
                {oldImages.map((image) => (
                  <img
                    src={image.url}
                    key={image}
                    alt={image.url}
                    className={classes.img}
                  />
                ))}
              </Grid>
            )}
            {imagesPreview.length > 0 && (
              <Grid item xs={12}>
                {imagesPreview.map((image) => (
                  <img
                    src={image}
                    key={image}
                    alt="Images Preview"
                    className={classes.img}
                  />
                ))}
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={loading ? true : false}
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default UpdateProduct;
