import React, { useEffect, useState } from 'react'
import './UpdateItem.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const UpdateItem = ({ itemId }) => {
    console.log(itemId);

    const url = "http://localhost:5000";
    const [updateData, setUpdateData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });

    const fetchItemInfo = async () => {
        const response = await axios.post(`${url}/api/food/getfood`, { id: itemId })
        if (response.data.success) {
            // console.log(response.data.data);
            setUpdateData({
                name: response.data.data.name,
                description: response.data.data.description,
                price: response.data.data.price,
                category: response.data.data.category,
            });
            // console.log(updateData);

        } else {
            toast.error(response.data.message);
        }
    }
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUpdateData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${url}/api/food/update`, {
            id: itemId,
            name: updateData.name,
            description: updateData.description,
            price: updateData.price,
            category: updateData.category
        });
        if (response.data.success) {
            setUpdateData({
                name: "",
                description: "",
                price: "",
                category: ""
            })
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        fetchItemInfo();
    }, []);

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>

                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={updateData.name} type="text" name="name" placeholder="Type here" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={updateData.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={updateData.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Ice Cream">Ice Cream</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={updateData.price} type="number" name="price" placeholder='₹100' />
                    </div>
                </div>
                <button type="submit" className='add-btn'>Update</button>
            </form>
        </div>
    )
}

export default UpdateItem