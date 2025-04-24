import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import UpdateItem from '../../components/UpdateItem/UpdateItem';

const List = () => {
  const url = "http://localhost:5000";
  const [list, setList] = useState([]);
  const [showUpdateItem, setShowUpdateItem] = useState(false);
  const [itemId, setItemId] = useState(""); //for UpdateItem component

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  //for update button click event to call the UpdateItem Component.
  const onClickHandler = (id) => {
    setItemId(id);
    setShowUpdateItem(true);
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>

      {showUpdateItem ? <UpdateItem itemId={itemId} /> :
        <div className='list add flex-col'>
          <p>All Foods list</p>
          <div className="list-table">
            <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => {
              return (
                <div key={index} className='list-table-format'>
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>₹{item.price}</p>
                  <div className="list-table-buttons">
                    <p title='Update Item' onClick={() => onClickHandler(item._id)} className='cursor'><RxUpdate size={20} style={{ fill: "blue" }} /></p>
                    <p title='Delete Item' onClick={() => removeFood(item._id)} className='cursor'><MdDelete size={20} style={{ fill: "red" }} /></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>}
    </>
  )
}

export default List