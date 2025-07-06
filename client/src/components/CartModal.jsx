import { useContext, useRef, useEffect } from "react"
import Context from "../context/Context"
import CartProduct from "./CartProduct"
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const CartModal = ({ showCart, setShowCart }) => {

    const modalRef = useRef(null)
    const { cart, products, currency } = useContext(Context)

    const displayedProducts = cart.slice(0, 3)

    let totalPrice = 0
    cart?.forEach(item => {
        const product = item.productId ? products.find(pro => pro._id === item.productId) : null
        if (product) {
            totalPrice += Number(product.price) * Number(item.quantity)
        }
    })


    useEffect(() => {
        const handleClickOutside = (e) => {
            // Check if click is outside modal AND not on cart icon or its children
            if (modalRef.current &&
                !modalRef.current.contains(e.target) &&
                !e.target.closest('.cart_icon')) {
                setShowCart(false);
            }
        };
        // Use 'click' instead of 'mousedown' to let the button click handler run first
        document.addEventListener('click', handleClickOutside, true); // Capture phase
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [showCart]);


    return (
        <div ref={modalRef} onClick={e => e.stopPropagation()} className={`flex flex-col items-center pt-4 pb-5 shadow-2xl min-h-64 h-fit max-w-[85vw] max-h-screen overflow-auto absolute top-[70px] w-96 z-40 bg-white transition-all ease-in-out duration-300 ${showCart ? 'right-0' : '-right-[200%]'}`}>
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart?.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className=" pb-8 border-b border-gray-400 text-c">
                        <ul className="space-y-2">
                            {displayedProducts.map((item, index) => (
                                <CartProduct key={index} item={item} quantity={item.quantity} />
                            ))}
                        </ul>
                        {cart.length > 3 && <BsThreeDots className=" sm:text-2xl mx-auto mt-4 text-gray-400 cursor-pointer" />}
                        <Link to="/cart" onClick={() => setShowCart(false)} className="text-blue-500 hover:underline mt-4 block text-center">
                            Go to cart
                        </Link>
                    </div>
                    <p className="text-xl pt-4 font-medium text-left">Total: {currency}<b>{totalPrice}</b></p>
                </>
            )}
        </div>
    )
}

export default CartModal