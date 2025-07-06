import { useContext, useCallback, useState } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Context from '../context/Context'
import CartPageProduct from '../components/CartPageProduct'
import PayPalButton from '../components/PayPalButton'
import toast from 'react-hot-toast'

const CartPage = () => {
    const { cart, products, currency, token } = useContext(Context)
    const [isProcessing, setIsProcessing] = useState(false)

    const totalPrice = useCallback(() => {
        return cart.reduce((total, item) => {
            const product = products.find(product => product._id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }, [cart, products]);

    const handleStripeCheckout = async () => {
        if (!token) {
            toast.error('Please login to continue');
            return;
        }

        setIsProcessing(true);
        try {
            const cartProducts = cart.map(item => {
                const product = products.find(p => p._id === item.productId);
                return {
                    ...product,
                    quantity: item.quantity
                };
            });

            const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/stripe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ products: cartProducts })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            window.location.href = data.url;
        } catch (error) {
            toast.error('Checkout failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className='w-full min-h-screen flex flex-col items-center px-4 sm:px-6 py-8'>
            <h1 className='text-3xl sm:text-4xl font-bold text-center font-edu mb-6 sm:mb-8'>Shopping Cart</h1>

            <div className='w-full max-w-6xl flex flex-col lg:flex-row gap-6 xl:gap-8'>
                {/* Cart Items */}
                <div className='flex-1'>
                    {cart.length === 0 ? (
                        <div className='bg-gray-100 rounded-lg p-8 text-center'>
                            <p className='text-gray-600 text-lg'>Your cart is empty</p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className='space-y-4 sm:space-y-6'>
                            {cart.map((item, index) => (
                                <CartPageProduct key={index} item={item} />
                            ))}
                        </ul>
                    )}
                </div>

                {/* Order Summary - Only shows when cart has items */}
                {cart.length > 0 && (
                    <div className='lg:w-80 xl:w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-xl font-semibold mb-6 pb-4 border-b border-gray-700'>Order Summary</h2>

                        <div className='space-y-4'>
                            <div className='flex justify-between'>
                                <span>Subtotal:</span>
                                <span>{currency}{totalPrice().toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Shipping:</span>
                                <span className='text-gray-400'>Calculated at checkout</span>
                            </div>
                            <div className='flex justify-between pt-4 border-t border-gray-700'>
                                <span className='font-medium'>Total:</span>
                                <span className='font-medium'>{currency}{totalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Stripe Checkout */}
                        <button 
                            onClick={handleStripeCheckout}
                            disabled={isProcessing}
                            className='w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2'
                        >
                            {isProcessing ? 'Processing...' : 'Pay with Stripe'}
                        </button>

                        <div className='my-4 text-center text-gray-400'>or</div>

                        {/* PayPal Checkout */}
                        {import.meta.env.VITE_PAYPAL_CLIENT_ID && 
                         import.meta.env.VITE_PAYPAL_CLIENT_ID !== 'your_paypal_client_id_here' && 
                         import.meta.env.VITE_PAYPAL_CLIENT_ID !== 'YOUR_PAYPAL_CLIENT_ID_HERE' && 
                         import.meta.env.VITE_PAYPAL_CLIENT_ID.length > 10 ? (
                            <PayPalScriptProvider options={{
                                'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
                                currency: 'USD'
                            }}>
                                <PayPalButton 
                                    products={cart.map(item => {
                                        const product = products.find(p => p._id === item.productId);
                                        return {
                                            ...product,
                                            quantity: item.quantity
                                        };
                                    })}
                                    totalAmount={totalPrice()}
                                />
                            </PayPalScriptProvider>
                        ) : (
                            <div className='w-full py-3 px-4 bg-gray-600 text-center text-gray-300 rounded-md'>
                                PayPal not configured - Please add valid PayPal Client ID
                            </div>
                        )}

                        <div className='mt-4 text-sm text-gray-400 text-center'>
                            or <button
                                onClick={() => window.location.href = '/'}
                                className='text-yellow-400 hover:text-yellow-300 underline'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage