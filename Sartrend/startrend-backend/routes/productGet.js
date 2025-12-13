const express = require('express');
const router = express.Router();
const Product = require("../models/productSchema");



// GET All Products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({
            success: true,
            products
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



module.exports = router;
