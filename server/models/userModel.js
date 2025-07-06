const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    cart: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            size: {
                type: String,
                required: true
            }
        }],
        default: []
    }
}, { timestamps: true }
)

userSchema.methods.addToCart = async function (productId, quantity, size) {
    // Helper function to extract ObjectId from either populated or non-populated product
    const getProductId = (product) => {
        if (!product) return '';

        // If it's a populated product object, get the _id
        if (typeof product === 'object' && product._id) {
            return product._id.toString();
        }

        // If it's already an ObjectId or string, convert to string
        return product.toString();
    };

    const productIdStr = productId.toString();
    const normalizedSize = size ? size.toString().trim().toLowerCase() : '';


    // Find existing item with proper ID extraction
    const existingItem = this.cart.find(item => {
        const itemProductId = getProductId(item.productId);
        const itemSize = item.size ? item.size.toString().trim().toLowerCase() : '';

        return itemProductId === productIdStr && itemSize === normalizedSize;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.updatedAt = new Date();
    } else {
        this.cart.push({
            productId,
            quantity,
            size: size || '',
            addedAt: new Date()
        });
    }

    // Mark the cart as modified for Mongoose
    this.markModified('cart');

    await this.save();
    return this.cart;
};
// Method to remove items from cart
userSchema.methods.removeFromCart = async function (productId, size) {
    this.cart = this.cart.filter(item =>
        !(item.productId.toString() === productId.toString() && item.size === size)
    );
    await this.save();
    return this.cart;
};

const User = mongoose.model('User', userSchema)

module.exports = User