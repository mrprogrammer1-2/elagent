const stripe = require('../config/stripe')
const axios = require('axios')
const Coupon = require('../models/couponModel')
const Order = require('../models/orderModal')


const createStripeCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode, currency = 'usd' } = req.body;

        // Validate input
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid products array' });
        }

        // Calculate total and prepare line items
        let totalAmount = 0;
        const lineItems = products.map(product => {
            if (!product.productId || !product.quantity || !product.price) {
                throw new Error('Invalid product data');
            }

            const itemTotal = product.quantity * product.price;
            totalAmount += itemTotal;

            return {
                price_data: {
                    currency,
                    product_data: {
                        name: product.name,
                        images: [product.image], // Fixed property name (was 'image')
                    },
                    unit_amount: Math.round(itemTotal * 100), // Ensure integer
                },
                quantity: product.quantity,
            };
        });

        // Validate minimum amount
        if (totalAmount < 0.5) { // Stripe minimum
            return res.status(400).json({ error: 'Amount too small' });
        }

        // Handle coupon
        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({
                code: couponCode,
                userId: req.id,
                isActive: true,
                expiryDate: { $gt: new Date() }
            });

            if (coupon) {
                totalAmount -= totalAmount * (coupon.discount / 100);
                totalAmount = Math.max(0, totalAmount); // Prevent negative
            }
        }

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                userId: req.id,
                couponId: coupon?._id?.toString() || 'none',
                products: JSON.stringify(products.map(p => ({
                    id: p._id,
                    quantity: p.quantity,
                    price: p.price
                })))
            },
            ...(coupon ? {
                discounts: [{
                    coupon: await createStripCoupon(coupon.discount)
                }]
            } : {}),
            submit_type: 'pay',
            billing_address_collection: 'required',
        });

        // Create new coupon if eligible (regardless of response)
        if (totalAmount >= 20) { // $20 threshold
            await createNewCoupon(req.id);
        }

        return res.status(200).json({
            id: session.id,
            url: session.url, // Important for redirect
            totalAmount: totalAmount
        });

    } catch (error) {
        console.error('Stripe error:', error);
        return res.status(500).json({
            error: 'Payment processing failed',
            details: error.message
        });
    }
};

const createStripCoupon = async (discount) => {
    try {
        const coupon = await stripe.coupons.create({
            percent_off: discount,
            duration: 'once',
        });
        return coupon;
    } catch (error) {
        console.error('Error creating Stripe coupon:', error);
        throw new Error('Failed to create Stripe coupon');
    }
}

async function createNewCoupon(userId) {
    const newCoupon = new Coupon({
        code: 'GIFT' + Math.random().toString(36).substring(2, 8).toUpperCase(), // Generate a random code
        userId: userId,
        discount: 10, // 10% discount
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
    })
    await newCoupon.save()
    return newCoupon;
}

const stripeCheckoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        if (session.payment_status === 'paid') {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    { code: session.metadata.couponCode, userId: session.metadata.userId },
                    { isActive: false }
                );
            }
        }
        const products = JSON.parse(session.metadata.products)
        const newOrder = new Order({
            user: session.metadata.userId,
            products: products.map(p => ({
                product: p.id,
                quantity: p.quantity,
                price: p.price
            })),
            totalAmount: session.amount_total / 100,
            payment: {
                method: 'stripe',
                stripeSessionId: sessionId,
                status: 'completed'
            },
            status: 'paid'
        })
        await newOrder.save()
        res.status(200).json({
            success: true,
            message: 'Payment successful',
            orderId: newOrder._id
        })
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getPayPalAccessToken = async () => {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    return response.data.access_token;
};

const createPayPalOrder = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        console.log('PayPal order request:', { products, couponCode });

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid products array' });
        }

        let totalAmount = 0;
        products.forEach(product => {
            totalAmount += product.quantity * product.price;
        });

        // Handle coupon
        if (couponCode) {
            const coupon = await Coupon.findOne({
                code: couponCode,
                userId: req.id,
                isActive: true,
                expiryDate: { $gt: new Date() }
            });
            if (coupon) {
                totalAmount -= totalAmount * (coupon.discount / 100);
            }
        }

        const accessToken = await getPayPalAccessToken();
        
        const orderData = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: totalAmount.toFixed(2)
                }
            }]
        };

        const response = await axios.post(
            'https://api-m.sandbox.paypal.com/v2/checkout/orders',
            orderData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        res.json({ 
            orderID: response.data.id,
            totalAmount 
        });
    } catch (error) {
        console.error('PayPal error details:', error.response?.data || error.message);
        res.status(500).json({ error: 'PayPal order creation failed' });
    }
};

const capturePayPalOrder = async (req, res) => {
    try {
        const { orderID, products } = req.body;
        
        const accessToken = await getPayPalAccessToken();
        
        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.status === 'COMPLETED') {
            const newOrder = new Order({
                user: req.id,
                products: products.map(p => ({
                    product: p._id,
                    quantity: p.quantity,
                    price: p.price
                })),
                totalAmount: parseFloat(response.data.purchase_units[0].amount.value),
                payment: {
                    method: 'paypal',
                    paypalOrderId: orderID,
                    status: 'completed'
                },
                status: 'paid'
            });
            await newOrder.save();

            if (newOrder.totalAmount >= 20) {
                await createNewCoupon(req.id);
            }

            res.json({ 
                success: true, 
                orderId: newOrder._id,
                paypalOrderId: orderID 
            });
        } else {
            res.status(400).json({ error: 'Payment not completed' });
        }
    } catch (error) {
        console.error('PayPal capture error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Payment capture failed' });
    }
};

const testPayPalConfig = async (req, res) => {
    try {
        console.log('PayPal Client ID:', process.env.PAYPAL_CLIENT_ID ? 'Set' : 'Not set');
        console.log('PayPal Client Secret:', process.env.PAYPAL_CLIENT_SECRET ? 'Set' : 'Not set');
        
        // Test actual authentication
        try {
            const accessToken = await getPayPalAccessToken();
            res.json({ 
                paypalConfigured: true,
                clientIdLength: process.env.PAYPAL_CLIENT_ID?.length || 0,
                authTest: 'SUCCESS',
                tokenReceived: !!accessToken
            });
        } catch (authError) {
            res.json({ 
                paypalConfigured: false,
                clientIdLength: process.env.PAYPAL_CLIENT_ID?.length || 0,
                authTest: 'FAILED',
                authError: authError.response?.data || authError.message
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStripeCheckoutSession,
    stripeCheckoutSuccess,
    createPayPalOrder,
    capturePayPalOrder,
    testPayPalConfig
}