import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const dispatch = useDispatch();
  const login = async () => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://api.darshannayak.in/api/v1';
        dispatch(ShowLoading());
        const response = await axios.post(`${apiUrl}/portfolio/admin-login`, user);
        dispatch(HideLoading());
        if(response.data.success){
            message.success(response.data.message);
            localStorage.setItem('token',response.data.token);
            window.location.href = '/admin';
        }else{
            message.error(response.data.message);
        }
    } catch (error){
        message.error(error.message);
        dispatch(HideLoading());
    }
  };

  return (
    <div className="page-wrap">
        <div className='login-container'>
            <h1 className="login-title">Admin Login</h1>
            <div className="login-inputs">
                <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleInputChange}
                className="login-input"
                />
                <input
                type="password" 
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleInputChange}
                className="login-input"
                />
            </div>
            <button className="login-button" onClick={login}>Login</button>
        </div>
    </div>
  );
}

export default Login;
