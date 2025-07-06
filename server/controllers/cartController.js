const User = require('../models/userModel')

// const getCart = async (req, res) => {
//     const userId = req.id

//     try {
//         const user = await User.findById(userId).populate('cart.productId')

//         if (!user) return res.status(400).json({ message: 'No user found' })

//         res.status(201).json(user.cart)

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }



// }

const addToCart = async (req, res) => {
    const { productId, quantity, size } = req.body

    const userId = req.id

    try {
        const user = await User.findById(userId).populate('cart.productId')

        if (!user) return res.status(400).json({ message: 'No user found' })

        await user.addToCart(productId, quantity, size);
        const updatedUser = await User.findById(userId).populate('cart.productId');
        res.status(200).json(updatedUser.cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFromCart = async (req, res) => {
    const { id: productId, size } = req.params;
    const userId = req.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.removeFromCart(productId, size);
        res.status(200).json({ cart: user.cart });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.id;

    try {
        const user = await User.findOneAndUpdate({ _id: userId, "cart.productId": productId }, { $set: { "cart.$.quantity": quantity } }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.cart);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    removeFromCart,
    addToCart,
    // getCart
    updateCart
}
