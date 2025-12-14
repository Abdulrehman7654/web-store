const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");

// GET Products (filter by category/type)
router.get("/products", async (req, res) => {
  try {
    const { category, type } = req.query;

    const filter = {};

    // Use case-insensitive regex only if the query exists
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (type) {
      filter.type = { $regex: new RegExp(`^${type}$`, "i") };
    }

    const products = await Product.find(filter);

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

module.exports = router;
