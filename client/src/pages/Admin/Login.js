import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { HideLoading, ShowLoading, SetGuestStatus } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';
import apiUrl from '../../config';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${apiUrl}/admin-login`, user);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isGuest', response.data.isGuest);
        dispatch(SetGuestStatus(response.data.isGuest)); 
        navigate('/admin'); 
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const guestLogin = async () => {
    const guestUser = { username: 'guest', password: 'guest' };
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${apiUrl}/admin-login`, guestUser);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        dispatch(SetGuestStatus(response.data.isGuest)); 
        navigate('/admin');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="page-wrap">
      <div className="portfolio-bg-text">Portfolio Admin</div>
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Login</h1>
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
          <button
            className="login-button"
            onClick={login}
            disabled={!user.username || !user.password}
          >
            Login
          </button>
          <button
            className="guest-login-button"
            onClick={guestLogin}
          >
            Guest Login
          </button>
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Darshan Nayak
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
