const express = require('express');
const router = express.Router();
const Product = require("../models/productSchema");
const ADMIN_EMAIL = "Pk.aliraza001@gmail.com"; 

// POST: Upload a product
router.post("/productUpload", async (req, res) => {
    try {
        const { 
            email,
            name,
            category,
            rate,
            stock,
            description,
            imageurl,
            activecomponents,
            ingredients
        } = req.body;

        if (email !== ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only admin can upload products."
            });
        }

        const newProduct = await Product.create({
            name,
            category,
            rate,
            stock,
            description,
            imageurl,
            activecomponents,
            ingredients
        });

        res.json({
            success: true,
            message: "Product uploaded successfully",
            product: newProduct
        });
    } catch (err) {
        console.error("Error uploading product:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

// GET: All Products
// router.get("/products", async (req, res) => {
//     try {
//         const products = await Product.find({});
        
//         // Normalize backend → frontend keys
//         const normalized = products.map(p => ({
//             id: p._id,
//             _id: p._id,
//             name: p.name,
//             category: p.category,
//             rate: p.rate,
//             stock: p.stock,
//             description: p.description,
//             imageUrl: p.imageurl,
//             activecomponents: p.activecomponents,
//             ingredients: p.ingredients
//         }));

//         res.json({
//             success: true,
//             products: normalized
//         });
//     } catch (err) {
//         console.error("Error fetching products:", err);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: err.message
//         });
//     }
// });

// GET: Single Product by ID
router.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Normalize backend → frontend keys
        const normalized = {
            id: product._id,
            _id: product._id,
            name: product.name,
            category: product.category,
            rate: product.rate,
            stock: product.stock,
            description: product.description,
            imageUrl: product.imageurl,
            activecomponents: product.activecomponents,
            ingredients: product.ingredients
        };

        res.json({
            success: true,
            product: normalized
        });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

// PUT: Update a product
router.put("/productUpdate/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            email,
            name,
            category,
            rate,
            stock,
            description,
            imageurl,
            activecomponents,
            ingredients
        } = req.body;

        // Check admin authorization
        if (email !== ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only admin can update products."
            });
        }

        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                category,
                rate,
                stock,
                description,
                imageurl,
                activecomponents,
                ingredients
            },
            { new: true, runValidators: true } // Return updated doc & run schema validators
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

module.exports = router;