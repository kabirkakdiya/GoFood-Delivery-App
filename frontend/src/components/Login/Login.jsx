import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const Login = ({setShowLogin}) => {
    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data, [name]: value}));
    }
    
    const onLogin = async (e)=>{
        e.preventDefault();
        let newUrl = url;
        if (currState==="Login"){ 
            newUrl += "/api/user/login" 
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else{
           alert(response.data.message); 
        }
    }

  return (
    <div className='login'>
        <form method='post' onSubmit={onLogin} className="login-form">
            <div className="login-title">
                <h2>{currState}</h2>
                <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="" />
            </div>
            <div className="login-inputs">
                {currState==="Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
                <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
                <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
            <button type='submit'>{currState==="Sign Up" ? "Create account" : "Login"}</button>
            <div className="login-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login" ? <p>Don't have an account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}

export default Login