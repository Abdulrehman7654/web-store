const mongoose = require('mongoose'); // <-- Add this line

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rate: { type: String, required: true },
    stock: { type: String, required: true },
    description: { type: String, required: true },
    imageurl: { type: String, required: true },
    activecomponents: { type: String, required: true },
    ingredients: { type: String, required: true }
});

module.exports = mongoose.model("products", productSchema);
