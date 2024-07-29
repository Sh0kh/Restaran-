import React, { useEffect, useState } from 'react';
import axios from '../Service/axios';
import '../Style/Category.css';
import logo from '../img/Rectangle 7.png';
import { NavLink } from 'react-router-dom';
import CONFIG from '../store/config';
import '../Style/Admin.css';
import foto from '../img/images (1).jpg'
function Category() {
    const [category, setCategory] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки
    const defaultImage = foto; 
    useEffect(() => {
        Promise.all([
            axios.get('/category'),
            axios.get('/background')
        ])
        .then(([categoryResponse, backgroundResponse]) => {
            setCategory(categoryResponse.data);
            setCategoriesCount(categoryResponse.data.length);
            setBackgroundImage(backgroundResponse.data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (id) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

    if (isLoading) {
        return (
            <div className='loading'>
                <div className='loading2'>
                    <svg className='LoadSVG' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <circle cx={12} cy={2} r={0} fill="white">
                            <animate attributeName="r" begin={0} calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                        </circle>
                        {/* Repeat for other circles as needed */}
                    </svg>
                    <h2>Loading ...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='error'>
                <h2>Ошибка загрузки данных. Попробуйте снова позже.</h2>
            </div>
        );
    }

    return (
        <div className='Category'>
            <header>
                <div className='container header-wrapper'>
                    <img src={logo} alt="Logo" />
                </div>
            </header>
            {backgroundImage.length > 0 && category.length > 0 ? (
                backgroundImage.map((item, index) => (
                    <div
                        className='Main'
                        style={{
                            backgroundImage: `url(${CONFIG.API_URL + item.image})`,
                            height: categoriesCount >= 5 ? '100%' : '100vh'
                        }}
                        key={index}
                    >
                        <div className='Menu__overflow'></div>
                        <div className='container'>
                            <div className='Main-wrapper'>
                                {category.map((cat) => (
                                    <NavLink to={`/Menu/${cat.id}`} key={cat.id}>
                                        <div className='Main-card'>
                                        <img
                            src={loadedImages[cat.id] ? CONFIG.API_URL + cat.image : defaultImage}
                            alt="Category"
                            onLoad={() => handleImageLoad(cat.id)}
                        />
                                            <div className='card-over'>
                                                <h2>{cat.name}</h2>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='no-data'>
                    <h2>No data available</h2>
                </div>
            )}
        </div>
    );
}

export default Category;
