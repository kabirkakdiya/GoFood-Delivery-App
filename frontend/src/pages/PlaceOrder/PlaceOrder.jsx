import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    const orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data, // holds the entire state variable data
      items: orderItems,
      amount: getTotalCartAmount() + 40 //for delivery charge
    }

    const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
    if (response.data.success) {
      alert(response.data.message);
      navigate("/myorders");
    } else {
      alert(response.data.message);
      navigate("/");
    }
  }
  return (
    <form onSubmit={placeOrder} className='place-order' >
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" required name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder='First name' />
          <input type="text" required name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder='Last name' />
        </div>

        <input type="email" required name="email" value={data.email} onChange={onChangeHandler} placeholder='Email address' />
        <input type="text" required name="street" value={data.street} onChange={onChangeHandler} placeholder='Street' />

        <div className="multi-fields">
          <input type="text" required name="city" value={data.city} onChange={onChangeHandler} placeholder='City' />
          <input type="text" required name="state" value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input type="text" required name="pincode" value={data.pincode} onChange={onChangeHandler} placeholder='Pin Code' />
          <input type="text" required name="country" value={data.country} onChange={onChangeHandler} placeholder='Country' />
        </div>
        <input type="text" required name="phone" value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>
          <button type='submit'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder