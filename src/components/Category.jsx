import React, { useEffect, useState } from 'react';
import axios from '../Service/axios';
import '../Style/Category.css';
import logo from '../img/Rectangle 7.png';
import { NavLink } from 'react-router-dom';
import CONFIG from '../store/config';
import '../Style/Admin.css';

function Category() {
    const [category, setCategory] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [categoriesCount, setCategoriesCount] = useState(0);

    useEffect(() => {
        getCategory();
        getBackgroundImage();
    }, []);

    const getCategory = () => {
        axios.get('/category')
            .then((response) => {
                setCategory(response.data);
                setCategoriesCount(response.data.length);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const getBackgroundImage = () => {
        axios.get('/background')
            .then((response) => {
                setBackgroundImage(response.data);
            })
            .catch((error) => {
                console.error('Error fetching background images:', error);
            });
    };

    return (
        <div className='Category'>
            <header>
                <div className='container header-wrapper'>
                    <img src={logo} alt="Logo" />
                </div>
            </header>
            {backgroundImage.map((item, index) => (
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
                                        <img src={CONFIG.API_URL + cat.image} alt="Category" />
                                        <div className='card-over'>
                                            <h2>{cat.name}</h2>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Category;
