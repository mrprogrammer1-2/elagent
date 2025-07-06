import { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { FaTrash } from "react-icons/fa";

const CartPageProduct = ({ item }) => {
    const { products, currency, handleUpdateCart, handleRemoveFromCart } = useContext(Context)
    const [count, setCount] = useState(item.quantity)
    const product = products?.find(product => product._id === item.productId)

    const handleCountChange = (operation) => {
        if (operation === 'increment') {
            setCount(count + 1)
        } else if (operation === 'decrement' && count > 1) {
            setCount(prevCount => prevCount - 1)
        }
    }

    useEffect(() => {
        if (count === 0) {
            handleRemoveFromCart(item.productId, item.size)
        }
        if (count !== item.quantity) {
            handleUpdateCart(item.productId, count);
        }
    }, [count]);

    return (
        <li className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-4 sm:gap-6'>
            {/* Product Image and Info */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto'>
                <img
                    src={product?.images[0].url}
                    loading='lazy'
                    alt={product?.name}
                    className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-lg'
                />

                <div className='flex-1'>
                    <h2 className='font-semibold text-lg line-clamp-2'>{product?.name}</h2>
                    <div className='mt-1 flex flex-wrap items-center gap-x-4 gap-y-2'>
                        <span className='text-gray-600 text-sm'>Qty: {item.quantity}</span>
                        <div className='flex items-center'>
                            <span className='text-gray-600 text-sm'>Size:</span>
                            <span className='ml-1 text-gray-800 font-medium text-sm uppercase'>
                                {item.size}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price, Quantity, and Actions */}
            <div className='w-full sm:w-auto flex flex-col xs:flex-row sm:flex-col md:flex-row items-end sm:items-center justify-between gap-4'>
                {/* Price */}
                <div className='text-lg font-medium min-w-[80px] text-right sm:text-center'>
                    {currency}{product?.price?.toFixed(2)}
                </div>

                {/* Quantity Controls */}
                <div className='flex items-center gap-4'>
                    <div className='bg-gray-100 rounded-md flex items-center'>
                        <button
                            className='py-1 px-3 text-lg hover:bg-gray-200 transition-colors'
                            onClick={() => handleCountChange('decrement')}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className='px-4 w-10 text-center'>{count}</span>
                        <button
                            className='py-1 px-3 text-lg hover:bg-gray-200 transition-colors'
                            onClick={() => handleCountChange('increment')}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    {/* Subtotal and Delete */}
                    <div className='flex items-center gap-4'>
                        <div className='text-lg font-medium min-w-[80px] text-right'>
                            {currency}{(product?.price * item.quantity)?.toFixed(2)}
                        </div>
                        <button
                            onClick={() => handleRemoveFromCart(item.productId, item.size)}
                            className='text-red-500 hover:text-red-700 transition-colors p-2'
                            aria-label="Remove item"
                        >
                            <FaTrash className='text-lg' />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartPageProduct