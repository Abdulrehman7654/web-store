const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");

router.post("/orders/create", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
});

router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().populate("products.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
});

router.get("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.productId");
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch order", error: error.message });
    }
});

router.patch("/orders/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus: status },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error: error.message });
    }
});

router.delete("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
});

module.exports = router;
