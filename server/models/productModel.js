const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [{
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    }],
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, default: [] },
    bestseller: { type: Boolean, default: false },
}, { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product