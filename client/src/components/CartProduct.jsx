import { useContext } from 'react'
import Context from '../context/Context'
import { FaTrash } from "react-icons/fa";

const CartProduct = ({ item, quantity }) => {



    const { products, currency, handleRemoveFromCart } = useContext(Context)

    const product = products?.find(pro => pro._id === item.productId)
    if (!product) {
        return null; // or handle the case where the product is not found
    }
    console.log(product)


    return (
        <li className="grid grid-cols-[1fr_2fr_1fr] gap-2 w-full max-w-md p-2 shadow-sm">
            <img src={product?.images[0].url} loading='lazy' alt={product.name} className='max-h-[80px]' />
            <div>
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-600">Price: {product.price}{currency}</p>
                <span className="text-gray-500">Quantity: {quantity}</span>
            </div>
            <FaTrash
                className='text-2xl transition-all hover:-translate-y-1'
                onClick={() => handleRemoveFromCart(item.productId)}
            />
        </li>
    )
}

export default CartProduct