import { useContext, useState } from 'react'
import Context from '../context/Context'
import { FaShoppingBag } from "react-icons/fa";

const SwiperProduct = ({ product }) => {


    const { currency, handleAddToCart } = useContext(Context)
    const [quantity, setQuantity] = useState(1)

    const handleAddToCartClick = () => {
        const productId = product.id || product._id; // Use _id if id is not available
        handleAddToCart(productId, quantity, selectedSize)
    }


    return (
        <div className='flex flex-col p-2 pb-7'>
            <div className='h-[80%] overflow-hidden'>
                <img src={product?.image[0]} loading='lazy' alt={product.name} className='object-cover w-full h-full transition-all duration-300 hover:scale-110 hover:rotate-3' />
            </div>
            <div className='mt-2 flex flex-col gap-1.5 h-[20%] justify-between'>
                <h4 className='text-[1.1rem] font-normal text-gray-500'>{product.name}</h4>
                <span className='text-sm'>#{product.category} #{product.subCategory}</span>

                <div className='flex items-center gap-3 text-sm relative mt-4'>
                    <div className='bg-blue-400  active:scale-90 p-2 absolute w-10 transition-all hover:w-32 group flex items-center gap-3 cursor-pointer'
                        onClick={handleAddToCartClick}
                    >
                        <span className='text-gray-200 group-hover:text-white'>
                            <FaShoppingBag className='text-2xl w-fit cursor-pointer transition-colors duration-200 ' />
                        </span>
                        <p className=' pointer-events-none opacity-0 transition-all group-hover:opacity-100 group-hover:pointer-events-auto whitespace-nowrap text-sm font-medium text-white'>Add to cart</p>
                    </div>
                    <span className='ml-12'><b>{product.price}{currency}</b></span>
                </div>
            </div>
        </div>
    )
}

export default SwiperProduct