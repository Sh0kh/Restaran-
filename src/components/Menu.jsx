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
    const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item


    async function getData() {
        const fetchData = await fetch('https://api.darxon-res.uz/api/category');
        const json = await fetchData.json();
        setX(json);
    }

    const getBackgroundImage = () => {
        axios.get('/background')
            .then((response) => {
                setBackgroundImage(response.data);
            })
            .catch((error) => {
                console.error('Error fetching background image:', error);
            });
    };
    const getMenu = () =>{
        axios.get('/menu')
        .then((respons)=>{
            setMenuHeight(respons.data)
            console.log(respons.data);
        })
        .catch((error)=>{

        })
    }

    let filteredCat = x?.find((item) => item.id === Number(location.categoryID));

    const handleCardClick = (item) => {
        setSelectedItem(item); // Set the selected item to open the modal
    };

    const handleCloseModal = () => {
        setSelectedItem(null); // Clear the selected item to close the modal
    };
    useEffect(() => {
        getData();
        getBackgroundImage();
        getMenu()
    }, []);
    return (
        <div className='Menu'>
            <header>
                <div className='container header__wrapper'>
                    <img src={logo} alt="" />
                    <NavLink to="/">Ortga</NavLink>
                </div>
            </header>
            {backgroundImage?.map((item) => (
                <div className='main'
                    style={{
                        backgroundImage: `url(${CONFIG.API_URL + item.image})`,
                        height: menuHeight  > 3 ? '100%' : '100%'
                    }}
                    key={item.id}>
                    <div className='Menu__overflow'></div>
                    <div className='container'>
                        <div className='main__wrapper'>
                            {filteredCat?.menu?.map((item) => {
                                return (
                                    <div className='main__card' key={item.id} onClick={() => handleCardClick(item)}>
                                            <div className='novin'>
                                        {item.new === true ? (
                                                <span>Новинка</span>
                                            ) : null}
                                            </div>
                                        <img src={CONFIG.API_URL + item.image} alt="foto" />
                                        <div className='main__card__grid'>
                                            <h2>{item.name}</h2>
                                            <div className='card__line'></div>
                                            <h2>{item.price} so'm</h2>
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
            {selectedItem && (
                <div className='modal-card' onClick={handleCloseModal}>
                    <div className='modal-card-content' onClick={(e) => e.stopPropagation()}>
                        <img className='fotoBig' src={CONFIG.API_URL + selectedItem.image} alt="foto" />
                        <h2>{selectedItem.name}</h2>
                        <p>{selectedItem.description}</p>
                        <h2>{selectedItem.price} so'm</h2>
                        {selectedItem.discount > 0 && (
                            <span>Скидка {selectedItem.discount} %</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;
