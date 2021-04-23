// Product Model
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

/* LOGGED IN USER ROUTES */

// @route       GET api/products
// @description  gets all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  //return next(new ErrorHandler("Try Again..", 400));
  const resultsPerPage = 6;

  const productsCount = await Product.countDocuments();
  /* const productsCount = await Product.find({
    name: new RegExp(req.query.keyword, "i"),
  }).countDocuments(); */

  const pages = Math.ceil(productsCount / resultsPerPage);

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;

  let filteredProductsCount = products.length;
  apiFeatures.pagination(resultsPerPage);

  products = await apiFeatures.query;

  const page = Number(req.query.page) > pages ? 1 : Number(req.query.page);
  //: Number(req.query.page),
  res.status(200).json({
    success: true,
    productsCount,
    resultsPerPage,
    products,
    pages,
    page,
    filteredProductsCount,
  });
});

// @route       GET api/product/:id
// @description  get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @route       PUT api/review/
// @description  creates a new review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
  });
});

//@route       GET api/reviews
//description   get all reviews of product by its id
exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

/* ADMIN ONLY ROUTES */

// @route       POST api/admin/products/new
// @description  creates a new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// @route       PUT api/admin/product/:id
// @description  updates product details by its id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//@route       DELETE api/admin/product/:id
//description   deletes the product by its id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});

//@route       DELETE api/admin/product/:id
//description   deletes the product by its id
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (r) => r._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});
