const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Name cannot exceed 100 chars"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [100, "Price cannot exceed 5 chars"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  platform: [{ type: String, required: true }],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
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
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please select product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product stock cannot exceed 5 chars"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Product", productSchema);
