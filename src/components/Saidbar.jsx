import React, { useState } from 'react'
import '../Style/Saidbar.css'
// import Logo from '../img/Rectangle 7.png'
import { NavLink } from 'react-router-dom'
function Saidbar() {
    const [ isActive, setActive] = useState(null)
    const Activebtn = (a)=>{
        setActive(a)
    }
  return (
    <div className='Saidbar'>
        {/* <div className='Saidbar-logo'>
            <img src={Logo} alt="foto" />
        </div> */}
        <div className='Saidbar-main'>
            <NavLink to='/Admin'
            onClick={() => Activebtn(1)}
            className={`${isActive === 1 ? 'Saidbar-active' : ''}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>
            <span>
                Home
            </span>
            </NavLink>
            <NavLink to='/AdminMenu'
            onClick={()=> Activebtn(2)}
            className={`${isActive === 2 ? 'Saidbar-active' : ''}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M4.505 2h-.013a.5.5 0 0 0-.176.036a.5.5 0 0 0-.31.388C3.99 2.518 3.5 5.595 3.5 7c0 .95.442 1.797 1.13 2.345c.25.201.37.419.37.601v.5q0 .027-.003.054c-.027.26-.151 1.429-.268 2.631C4.614 14.316 4.5 15.581 4.5 16a2 2 0 1 0 4 0c0-.42-.114-1.684-.229-2.869a302 302 0 0 0-.268-2.63L8 10.446v-.5c0-.183.12-.4.37-.601A3 3 0 0 0 9.5 7c0-1.408-.493-4.499-.506-4.577a.5.5 0 0 0-.355-.403A.5.5 0 0 0 8.51 2h-.02h.001a.505.505 0 0 0-.501.505v4a.495.495 0 0 1-.99.021V2.5a.5.5 0 0 0-1 0v4l.001.032a.495.495 0 0 1-.99-.027V2.506A.506.506 0 0 0 4.506 2M11 6.5A4.5 4.5 0 0 1 15.5 2a.5.5 0 0 1 .5.5v6.978l.02.224a626 626 0 0 1 .228 2.696c.124 1.507.252 3.161.252 3.602a2 2 0 1 1-4 0c0-.44.128-2.095.252-3.602c.062-.761.125-1.497.172-2.042l.03-.356H12.5A1.5 1.5 0 0 1 11 8.5zM8.495 2h-.004z"/></svg>
            <span>
                Menu
            </span>
            </NavLink>
            <NavLink to='/AdminCategory'
            onClick={()=>Activebtn(3)}
            className={`${isActive ===3 ? 'Saidbar-active' : ''}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13"/></svg>
            <span>
                Category
            </span>
            </NavLink>
            <NavLink to='/Adminfoon'
              onClick={()=>Activebtn(4)}
              className={`${isActive ===4 ? 'Saidbar-active' : ''}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M21.129 4.012a1.5 1.5 0 0 1-.141 2.117l-16 14a1.5 1.5 0 0 1-1.976-2.258l16-14a1.5 1.5 0 0 1 2.117.141m0 6.375a1.5 1.5 0 0 1-.141 2.117l-8.715 7.625a1.5 1.5 0 0 1-1.975-2.258l8.714-7.625a1.5 1.5 0 0 1 2.117.141m0 5.875a1.5 1.5 0 0 1-.03 2.01l-.111.107l-2 1.75a1.5 1.5 0 0 1-2.086-2.151l.11-.107l2-1.75a1.5 1.5 0 0 1 2.117.141m-7.286-12.25a1.5 1.5 0 0 1-.14 2.117l-8.715 7.625a1.5 1.5 0 0 1-1.976-2.258l8.715-7.625a1.5 1.5 0 0 1 2.116.141m-6.286 0a1.5 1.5 0 0 1-.03 2.01l-.11.107l-2.43 2.125a1.5 1.5 0 0 1-2.085-2.151l.11-.107l2.429-2.125a1.5 1.5 0 0 1 2.116.141"/></g></svg>
            <span>
                Fon
            </span>
            </NavLink>
        </div>
    </div>
  )
}

export default Saidbar