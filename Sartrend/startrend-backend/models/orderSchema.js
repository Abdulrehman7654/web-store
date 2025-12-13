const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.Mixed, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],

    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },

    paymentMethod: { type: String, enum: ["COD", "Advanced"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

    orderStatus: { 
        type: String, 
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
        default: "pending" 
    },

    totalAmount: { type: Number, required: true },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("orders", orderSchema);
