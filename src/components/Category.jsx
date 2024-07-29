import React, { useEffect, useState } from 'react';
import axios from '../Service/axios';
import '../Style/Category.css';
import logo from '../img/Rectangle 7.png';
import { NavLink } from 'react-router-dom';
import CONFIG from '../store/config';
import '../Style/Admin.css';
// import lodaing from '../img/25 .gif'
function Category() {
    const [category, setCategory] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

    useEffect(() => {
        // Выполняем оба запроса параллельно и ждем, пока оба завершатся
        Promise.all([
            axios.get('/category'),
            axios.get('/background')
        ])
        .then(([categoryResponse, backgroundResponse]) => {
            setCategory(categoryResponse.data);
            setCategoriesCount(categoryResponse.data.length);
            setBackgroundImage(backgroundResponse.data);
            setIsLoading(false); // Устанавливаем состояние загрузки в false после завершения обоих запросов
        })
        .catch((error) => {
            setIsLoading(false); // Устанавливаем состояние загрузки в false даже в случае ошибки
        });
    }, []);

    if (isLoading) {
        return <div className='loading'>
          <div className='loading2'>
              <svg className='LoadSVG' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx={12} cy={2} r={0} fill="white"><animate attributeName="r" begin={0} calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill="white" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg>
            <h2>
                Loading ...
            </h2>
          </div>
            
            </div>; // Показываем индикатор загрузки
    }

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
