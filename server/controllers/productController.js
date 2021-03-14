// Product Model
const Product = require("../models/product");

// @route       POST api/admin/products/new
// @description  creates a new product
// @access
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// @route       GET api/products
// @description  gets all products
// @access
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// @route       GET api/product/:id
// @description  get single product details
// @access
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });

  res.status(200).json({
    success: true,
    product,
  });
};

// @route       PUT api/admin/product/:id
// @description  updates product details by its id
// @access
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

//@route       DELETE api/admin/product/:id
//description   deletes the product by its id
//acces
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "product not found.",
    });

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
};
