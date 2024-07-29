import React, { useEffect, useState } from 'react';
import '../Style/Menu.css';
import CONFIG from '../store/config';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../Service/axios';
import logo from '../img/Rectangle 7.png';
import foto from '../img/images (1).jpg'
function Menu() {
    let location = useParams();
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [menuHeight, setMenuHeight] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultImage = foto; 
    useEffect(() => {
        // Set up a timeout to hide the loading spinner after 5 seconds


        Promise.all([
            fetch('https://api.darxon-res.uz/api/category').then(res => res.json()),
            axios.get('/background'),
            axios.get('/menu')
        ])
        .then(([categoryData, backgroundResponse, menuResponse]) => {
            setCategories(categoryData);
            setBackgroundImage(backgroundResponse.data);
            setMenuHeight(menuResponse.data.length);

        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError(error);
        })
    }, []);
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (id) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

    let filteredCat = categories?.find((item) => item.id === Number(location.categoryID));


    return (
        <div className='Menu'>
            <header>
                <div className='container header__wrapper'>
                    <img src={logo} alt="Logo" />
                    <NavLink to="/">Ortga</NavLink>
                </div>
            </header>
            {backgroundImage?.map((item) => (
                <div className='main'
                    style={{
                        backgroundImage: `url(${CONFIG.API_URL + item.image})`,
                        height: menuHeight > 3 ? '100%' : '100%'
                    }}
                    key={item.id}>
                    <div className='Menu__overflow'></div>
                    <div className='container'>
                        <div className='main__wrapper'>
                            {filteredCat?.menu?.map((item) => (
                                <div className='main__card' key={item.id}>
                                    <div className='novin'>
                                        {item.new === true && <span>Янгилик</span>}
                                    </div>
                                    <img
                            src={loadedImages[item.id] ? CONFIG.API_URL + item.image : defaultImage}
                            alt="Category"
                            onLoad={() => handleImageLoad(item.id)}
                        />
                                    <div className='main__card__grid'>
                                        <h2>{item.name}</h2>
                                        <div className='card__line'></div>
                                        <h2 className='card__price'>{item.price} Сум</h2>
                                    </div>
                                    <div className='discount'>
                                        <span>{item.discount > 0 ? `Скидка ${item.discount} %` : ""}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Menu;
