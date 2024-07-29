import React, { useEffect, useState } from 'react';
import '../Style/Menu.css';
import CONFIG from '../store/config';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../Service/axios';
import logo from '../img/Rectangle 7.png';

function Menu() {
    let location = useParams();
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [x, setX] = useState(null);
    const [menuHeight, setMenuHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

    // async function getData() {
    //     const fetchData = await fetch('https://api.darxon-res.uz/api/category');
    //     const json = await fetchData.json();
    //     setX(json);
    // }

    // const getBackgroundImage = () => {
    //     axios.get('/background')
    //         .then((response) => {
    //             setBackgroundImage(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching background image:', error);
    //         });
    // };

    // const getMenu = () => {
    //     axios.get('/menu')
    //         .then((response) => {
    //             setMenuHeight(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching menu:', error);
    //         });
    // };

    useEffect(() => {
        // Выполняем все запросы параллельно и ждем, пока все завершатся
        Promise.all([
            fetch('https://api.darxon-res.uz/api/category').then(res => res.json()),
            axios.get('/background'),
            axios.get('/menu')
        ])
        .then(([categoryData, backgroundResponse, menuResponse]) => {
            setX(categoryData);
            setBackgroundImage(backgroundResponse.data);
            setMenuHeight(menuResponse.data);
            setIsLoading(false); // Устанавливаем состояние загрузки в false после завершения всех запросов
        })
        .catch((error) => {
            setIsLoading(false); // Устанавливаем состояние загрузки в false даже в случае ошибки
        });
    }, []);

    let filteredCat = x?.find((item) => item.id === Number(location.categoryID));

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
                            {filteredCat?.menu?.map((item) => {
                                return (
                                    <div className='main__card' key={item.id} >
                                        <div className='novin'>
                                            {item.new === true ? (
                                                <span>Янгилик</span>
                                            ) : null}
                                        </div>
                                        <img src={CONFIG.API_URL + item.image} alt="foto" />
                                        <div className='main__card__grid'>
                                            <h2>{item.name}</h2>
                                            <div className='card__line'></div>
                                            <h2 className='card__price'>{item.price} Сум</h2>
                                        </div>
                                        <div className='discount'>
                                            <span>{item.discount > 0 ? `Скидка ${item.discount} %` : ""}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Menu;
