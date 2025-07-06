import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useContext } from 'react';
import Context from '../context/Context';
import toast from 'react-hot-toast';

const PayPalButton = ({ products, totalAmount }) => {
    const { token } = useContext(Context);
    const [{ isPending }] = usePayPalScriptReducer();

    const createOrder = async () => {
        try {
            console.log('Creating PayPal order with products:', products);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/paypal/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ products })
            });
            
            const data = await response.json();
            console.log('PayPal create order response:', data);
            
            if (!response.ok) {
                console.error('PayPal order creation failed:', data);
                throw new Error(data.error || 'Failed to create order');
            }
            
            return data.orderID;
        } catch (error) {
            console.error('PayPal createOrder error:', error);
            toast.error('Failed to create PayPal order');
            throw error;
        }
    };

    const onApprove = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/paypal/capture-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    orderID: data.orderID,
                    products 
                })
            });
            
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            
            toast.success('Payment successful!');
            window.location.href = '/success';
        } catch (error) {
            toast.error('Payment failed');
        }
    };

    if (isPending) {
        return <div className="text-center">Loading PayPal...</div>;
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => {
                console.error('PayPal error:', err);
                toast.error('PayPal payment error');
            }}
            style={{
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal'
            }}
        />
    );
};

export default PayPalButton;