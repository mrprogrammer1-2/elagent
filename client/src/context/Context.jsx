import { createContext, useState, useCallback, useEffect } from "react";
import api, { setAccessToken } from "../api/axios";


const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState(null);
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([])
    const currency = '$'

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const [loading, setLoading] = useState(true); // Add loading state


    // Set access token in both context and api
    const handleSetAccessToken = useCallback((token) => {
        setAccessTokenState(token);
        setAccessToken(token); // update api instance
    }, []);

    // Clear access token
    const handleClearAccessToken = useCallback(() => {
        setAccessTokenState(null);
        setAccessToken(null);
    }, []);

    // Update your checkAuth function
    const checkAuth = useCallback(async () => {
        try {
            const res = await api.get('/auth/check');
            handleSetAccessToken(res.data.accessToken);
            setUser(res.data.user);
            setCart(res.data.user.cart)
        } catch (err) {
            handleClearAccessToken();
        } finally {
            setLoading(false); // Always set loading to false when done
        }
    }, [handleSetAccessToken, handleClearAccessToken]);

    // Refresh access token using /refresh endpoint
    const refreshAccessToken = useCallback(async () => {
        try {
            const res = await api.post("/refresh");
            handleSetAccessToken(res.data.accessToken);
            setUser(res.data.user);
            return res.data.accessToken;
        } catch (err) {
            handleClearAccessToken();
            throw err;
        }
    }, [handleSetAccessToken, handleClearAccessToken]);

    const handleLogin = useCallback(async (email, password) => {
        try {
            const user = {
                email,
                password
            }

            const response = await api.post('/auth/login', user)

            if (response.status !== 200) {
                throw new Error("Login failed");
            } else {
                handleSetAccessToken(response.data.accessToken)
                setUser(response.data.user);
            }


        } catch (error) {
            console.error("Error during login:", error)
            alert("An error occurred. Please try again.")

        }
    }, [handleSetAccessToken, handleClearAccessToken]);

    const handleLogout = useCallback(async () => {
        try {
            await api.get("/auth/logout");
            handleClearAccessToken();
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }, [handleClearAccessToken]);



    const handleAddToCart = async (productId, quantity, size) => {
        // Optimistic update function that handles sizes
        const optimisticUpdate = (prevCart) => {
            // Find if we have the same product AND same size in cart
            const existingItemIndex = prevCart.findIndex(item =>
                item.productId === productId && item.size === size
            );

            if (existingItemIndex >= 0) {
                // Product with same size exists - update quantity
                return prevCart.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // New product or different size - add new entry
                return [...prevCart, { productId, quantity, size }];
            }
        };

        if (accessToken) {
            // For logged-in users: optimistic update + API sync
            setCart(optimisticUpdate);

            try {
                const response = await api.patch('/cart/add', {
                    productId,
                    quantity,
                    size
                });

                if (response.status !== 200) {
                    throw new Error("Failed to add item to cart");
                }

                // Optional: Final sync with backend data
                // setCart(response.data.cart);
            } catch (error) {
                console.error("Error adding to cart:", error);

                // Revert on error
                setCart(prevCart => {
                    // Find the item we optimistically added
                    const addedItemIndex = prevCart.findIndex(item =>
                        item.productId === productId &&
                        item.size === size &&
                        item.quantity === quantity // Only matches newly added items
                    );

                    if (addedItemIndex >= 0) {
                        // Remove the item we added
                        return prevCart.filter((_, index) => index !== addedItemIndex);
                    } else {
                        // For quantity updates, revert to previous quantity
                        const existingItemIndex = prevCart.findIndex(item =>
                            item.productId === productId && item.size === size
                        );

                        return prevCart.map((item, index) =>
                            index === existingItemIndex
                                ? { ...item, quantity: item.quantity - quantity }
                                : item
                        );
                    }
                });

                alert("An error occurred while adding to cart. Please try again.");
            }
        } else {
            // For guests: update localStorage
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = optimisticUpdate(localCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    };

    const handleUpdateCart = async (productId, quantity) => {
        if (accessToken) {
            try {
                const response = await api.patch('/cart/update', { productId, quantity });
                if (response.status === 200) {
                    setCart(response.data.cart);
                } else {
                    throw new Error("Failed to update cart");
                }
            } catch (error) {
                console.error("Error updating cart:", error);
                alert("An error occurred while updating the cart. Please try again.");
            }
        }
        else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = localCart.findIndex(item => item.productId === productId);
            if (itemIndex !== -1) {
                console.log(quantity)
                localCart[itemIndex].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(localCart));
                setCart(localCart);
            } else {
                console.warn("Item not found in local cart");
            }
        }
    }

    const handleRemoveFromCart = async (productId, size) => {
        if (accessToken) {
            try {
                const response = await api.delete(`/cart/${productId}/${size}`);
                if (response.status === 200) {
                    setCart(response.data.cart);
                } else {
                    throw new Error("Failed to remove item from cart");
                }
            } catch (error) {
                console.error("Error removing from cart:", error);
                alert("An error occurred while removing from cart. Please try again.");
            }
        }
        else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = localCart.filter(item => !(item.productId === productId && item.size === size));
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }


    const updateProducts = (id, updatedProduct) => {

        try {
            const response = api.patch(`/products/${id}`, updatedProduct)
            if (response.status === 201) {
                setProducts(response.data.products)
                console.log(response)
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product. Please trstilly again.");
        }
    }

    return (
        <Context.Provider value={{
            accessToken,
            token: accessToken, // Alias for PayPal compatibility
            setAccessToken: handleSetAccessToken,
            clearAccessToken: handleClearAccessToken,
            refreshAccessToken,
            logout: handleLogout,
            login: handleLogin,
            user,
            products, setProducts,
            currency,
            category, setCategory,
            subCategory, setSubCategory,
            cart, handleAddToCart, handleRemoveFromCart, handleUpdateCart,
            loading,
            checkAuth,
            updateProducts
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;