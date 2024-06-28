import React, { useEffect, useState } from 'react'
import '../Style/Menu.css'
import CONFIG from '../store/config'
import { NavLink, useParams } from 'react-router-dom'
import axios from '../Service/axios';
function Menu() {

    let location = useParams()
    const [x, setX] = useState(null)
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        getData()
        getBackgroundImage()

        const timer = setTimeout(() => {
            setIsVisible(false);
          }, 3 * 24 * 60 * 60 * 1000);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [])
    async function getData() {
        const fetchData = await fetch('https://darxon.onrender.com/api/category')
        const json = await fetchData.json()
        setX(json)
    }
    const getBackgroundImage = () => {
        axios.get('/background')
            .then((response) => {
                setBackgroundImage(response.data);

            })
            .catch((error) => {

            });
    };
    let filteredCat = x?.find((item) => item.id === Number(location.categoryID))
    return (
        <div className='Menu'>

            <header>
                <div className='container header__wrapper' >
                    <h1>
                        Logo
                    </h1>
                    <NavLink to="/">
                        Ortga
                    </NavLink>
                    <NavLink to="/admin">
                        admin
                    </NavLink>
                </div>
            </header>
            {backgroundImage?.map((item) => (
                <div className='main' style={{ backgroundImage: `url(${CONFIG.API_URL + item.image})` }} key={item} >
                    <div className='Menu__overflow'></div>
                    <div className='container'>
                        <div className='main__wrapper'>
                            {filteredCat?.menu?.map((item) => {
                                return (
                                    <div className='main__card' >
                                        {/* <div className='novin'>
                                            <span>
                                                Новинка
                                            </span>
                                        </div> */}
                                        {isVisible && (
                                            <div className='novin'>
                                                <span>
                                                    Новинка
                                                </span>
                                            </div>
                                        )}
                                        <img src={CONFIG.API_URL + item.image} alt="foto" />
                                        <div className='main__card__grid'>
                                            <h2>
                                                {item.name}
                                            </h2>
                                            <div className='card__line'>

                                            </div>
                                            <p>
                                                {item.description}
                                            </p>
                                            <div className='card__line'>

                                            </div>
                                            <h2>
                                                {item.price} so'm
                                            </h2>
                                        </div>
                                        <div className='discount'>
                                            <span>
                                                {item.discount ? `Скидка ${item.discount} %` : ""}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}




                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menu