import React from 'react'
import logo from '../img/Rectangle 7.png'
import '../Style/Login.css'
function Login() {
  return (
    <div className='Login'>
        <div className='Login__wrapper'>
            <img src={logo} alt="" />
            <form>
                <label htmlFor="Login">
                    <h3>
                        Login
                    </h3>
                    <input id='Login' type="text" />
                </label>
                <label htmlFor="password">
                    <h3>
                        Parol
                    </h3>
                    <input id='password' type="text" />
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