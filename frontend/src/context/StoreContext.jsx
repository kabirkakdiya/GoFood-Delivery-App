import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext({});

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([])
    const url = "http://localhost:5000";


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = food_list.find((item) => item._id === itemId)
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    }

    const fetchFood_list = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFood_list(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/getcart`, {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }
    useEffect(() => {
        async function loadData() {
            await fetchFood_list();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }

        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;