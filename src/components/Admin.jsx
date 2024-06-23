import React, { useState } from 'react'
import '../Style/Admin.css'
import Saidbar from './Saidbar'
import { NavLink } from 'react-router-dom'
import SaidbarMobile from './SaidbarMobile'
import Hamburger from 'hamburger-react'
function Admin() {
    const [isActive, setActive] = useState(null)
    const AddSaidbar = ()=>{
        setActive(!isActive)
    }
  return (
    <div className='Admin'>
        <Saidbar/>
        <div className='Admin-content'>
            <div className='Admin-header'>
                <h1>
                    Bosh panel
                </h1>
                <div className='Hamburger' onClick={AddSaidbar}>
                    <Hamburger color='white'/>
                </div>
            </div>
            <div className='Admin-main'>
                <div className='Admin-wrapper'>
                    <div className='Admin-card'>
                        <div className='Admin-grid'>
                            <h3>
                                Menu
                            </h3>
                            <span>
                                10
                            </span>
                        </div>
                        <NavLink to='/AdminMenu'>
                            Ko`rish
                        </NavLink>
                    </div>
                    <div className='Admin-card'>
                        <div className='Admin-grid'>
                            <h3>
                                Category
                            </h3>
                            <span>
                                10
                            </span>
                        </div>
                        <NavLink to='/AdminMenu'>
                            Ko`rish
                        </NavLink>
                    </div>
                    <div className='Admin-card'>
                        <div className='Admin-grid'>
                            <h3>
                                Fon
                            </h3>
                            <span>
                                Qoshilgan
                            </span>
                        </div>
                        <NavLink to='/AdminMenu'>
                            Qoshi
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
        <div className={`Mobile-Bg ${isActive ? 'Mobile-active' : ''}`}>
            <SaidbarMobile/>
        </div>
    </div>
  )
}

export default Admin