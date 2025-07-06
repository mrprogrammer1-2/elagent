const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {  // Changed from userId to match your controller
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {  // Changed from productId to be more descriptive
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: Number,
        price: Number,
        name: String  // Added for historical reference
    }],
    totalAmount: Number,
    status: {  // Added order status tracking
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment: {
        method: {
            type: String,
            enum: ['stripe', 'paypal'],
            required: true
        },
        stripeSessionId: String,
        paypalOrderId: String,
        status: {
            type: String,
            default: 'completed'
        }
    },
    couponUsed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema)
module.exports = Order