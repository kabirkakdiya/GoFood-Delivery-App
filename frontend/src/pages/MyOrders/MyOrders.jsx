import React, { useContext, useState, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { token, url } = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
        if (response.data.success) {
            setOrders(response.data.data);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <>
            <h2>My Orders</h2>
            {orders.length === 0 ? <h3>No orders found</h3> : null}
            <div className='my-orders'>
                <div className="container">
                    {orders.map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {  //if item is last of all the items, it will be displayed without a comma after it.
                                        return `${item.name} x ${item.quantity}`;
                                    } else {
                                        return `${item.name} x ${item.quantity}, `;
                                    }
                                })}</p>
                                <p>₹{order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MyOrders