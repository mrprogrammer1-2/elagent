import { useContext, useState } from 'react'
import Context from '../context/Context'
import { FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Product = ({ product }) => {

    const { currency, handleAddToCart } = useContext(Context)
    const [quantity, setQuantity] = useState(1)
    const [productSizes, setProductSizes] = useState(product.sizes || [])
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')

    const handleAddToCartClick = () => {
        const productId = product._id; // Use MongoDB _id
        console.log('Adding to cart - Product ID:', productId); // Debug log
        handleAddToCart(productId, quantity, selectedSize)
    }

    const handleSelectedSize = (size) => {
        setSelectedSize(size)
    }

    return (
        <Link to={`/products/${product._id}`} className='flex flex-col pb-7'>
            <div className='h-[80%] overflow-hidden'>
                <img src={product?.images[0].url} loading='lazy' alt={product.name} className='object-cover w-full h-full transition-all duration-300 hover:scale-110 hover:rotate-3' />
            </div>
            <div className='mt-2 flex flex-col gap-1.5 h-[20%] justify-between'>
                <h4 className='text-[1.1rem] font-normal text-gray-500'>{product.name}</h4>
                <span className='text-sm'>#{product.category} #{product.subCategory}</span>
                <div>
                    <span className='text-sm'>Sizes: </span>
                    <div className='flex items-center gap-2'>
                        {productSizes.map((size, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectedSize(size)}
                                className={`h-8 w-10 inline-flex justify-center border border-gray-400 text-gray-400 items-center uppercase cursor-pointer transition-all hover:border-gray-600 ${size === selectedSize ? "bg-blue-400 text-white" : null} `}>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
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
        </Link>
    )
}

export default Product