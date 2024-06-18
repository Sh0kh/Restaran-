import React from 'react'
import '../Style/Category.css'
import logo from '../img/Rectangle 7.png'
import bg from '../img/Мену.png'
import { NavLink } from 'react-router-dom'

function Category() {
  return (
    <div className='Category'>
        
        <header>
            <div className='container header-wrapper'>
                <img src={logo} alt="" />
            </div>
        </header>
        <div className='Main'  style={{backgroundImage:`url(${bg})`}}>
        <div className='Menu__overflow'></div>
            <div className='container'>
                <div className='Main-wrapper'>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                    <NavLink to="/Menu">
                    <div className='Main-card'>
                        <img src="https://www.gazeta.uz/media/img/2021/08/iqz8sx16282410420244_l.jpg" alt="foto" />
                        <div className='card-over'>
                            <h2>
                                OSh
                            </h2>
                        </div>
                    </div>
                    </NavLink>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category