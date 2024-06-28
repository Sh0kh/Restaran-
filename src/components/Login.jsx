import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../img/Rectangle 7.png'
import '../Style/Login.css'
import axios from '../Service/axios'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
function Login() {
    const [login, setLogin] = useState({
        phone: '',
        password: '',
      });
      const navigate = useNavigate();
      const loginAdmin = (e) => {
        e.preventDefault();
        const data = {
          phone: login.phone,
          password: login.password,
        };
    
        axios
          .post('/admin/login', data)
          .then((res) => {
            setLogin({ phone: '', password: '' });
            localStorage.setItem('token', res.data.tokens.refresh_token);
            navigate('/Admin');
          })
          .catch((error) => {
            Toastify({
                text: "Hato!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast();
          });
      };
  return (
    <div className='Login'>
        <div className='Login__wrapper'>
            <img src={logo} alt="" />
            <form onSubmit={loginAdmin}>
                <label htmlFor="Login">
                    <h3>
                        Login
                    </h3>
                    <input onChange={(e) => setLogin({ ...login, phone: e.target.value })} value={login.phone} id='Login' type="text" />
                </label>
                <label htmlFor="password">
                    <h3>
                        Parol
                    </h3>
                    <input
                     value={login.password}
                     onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    id='password' type="text" />
                </label>
                <button type='submit'>
                    Kirish
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login