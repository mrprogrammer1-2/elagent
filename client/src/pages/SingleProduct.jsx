import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Context from '../context/Context'
import { FaStar, FaRegStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

const ProductPage = () => {
    const { productId } = useParams() // Changed from productName to productId
    const navigate = useNavigate()
    const { products, currency, handleAddToCart: addToCart } = useContext(Context)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Find product by ID instead of name
    const product = products.find(p => p._id === productId)

    useEffect(() => {
        if (!product) {
            navigate('/404') // Redirect if product not found
        }
    }, [product, navigate])

    if (!product) return null

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size')
            return
        }
        addToCart(product._id, quantity, selectedSize, selectedColor || product.colors?.[0])
        navigate('/cart')
    }

    const nextImage = () => {
        setCurrentImageIndex(prev =>
            prev === product.image.length - 1 ? 0 : prev + 1
        )
    }

    const prevImage = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? product.image.length - 1 : prev - 1
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <FaArrowLeft className="mr-2" /> Back to Shop
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Image Gallery */}
                <div className="relative">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={product.images[currentImageIndex].url}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                        />
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                                    aria-label="Previous image"
                                >
                                    <IoIosArrowDropleft className="text-gray-800 text-xl" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                                    aria-label="Next image"
                                >
                                    <IoIosArrowDropright className="text-gray-800 text-xl" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {product.images.length > 1 && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {product.image.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`aspect-square overflow-hidden rounded-md ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>

                    {/* Price */}
                    <div className="mt-4">
                        <p className="text-2xl text-gray-900">
                            {currency}{product.price.toFixed(2)}
                            {product.oldPrice && (
                                <span className="ml-2 text-lg text-gray-500 line-through">
                                    {currency}{product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Reviews */}
                    <div className="mt-4 flex items-center">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                star <= (product.rating || 0) ? (
                                    <FaStar key={star} className="text-yellow-400" />
                                ) : (
                                    <FaRegStar key={star} className="text-yellow-400" />
                                )
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                            {product.reviewCount || 0} reviews
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Description</h3>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                    </div>

                    {/* Size Selection */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {product.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedSize === size
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    {product.colors?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full border-2 ${selectedColor === color
                                            ? 'border-gray-900'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        aria-label={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                        <div className="mt-2 flex items-center">
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <span className="px-4 py-1 border-t border-b border-gray-300">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-8 w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center gap-2"
                        aria-label="Add to cart"
                    >
                        <FaShoppingCart /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage