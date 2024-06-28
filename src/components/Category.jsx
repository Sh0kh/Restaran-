import React, { useEffect, useState } from 'react';
import axios from '../Service/axios';
import '../Style/Category.css';
import logo from '../img/Rectangle 7.png';
import { NavLink } from 'react-router-dom';
import CONFIG from '../store/config';

function Category() {
    const [category, setCategory] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState([]);

    useEffect(() => {
        getCategory();
        getBackgroundImage();
    }, []);

    const getCategory = () => {
        axios.get('/category')
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
            });
    };

    const getBackgroundImage = () => {
        axios.get('/background')
            .then((response) => {
                    setBackgroundImage(response.data);
                    
            })
            .catch((error) => {

            });
    };

    return (
        <div className='Category'>
            <header>
                <div className='container header-wrapper'>
                    <img src={logo} alt="Logo" />
                </div>
            </header>
          {backgroundImage?.map((item)=>(
              <div className='Main' style={{ backgroundImage: `url(${CONFIG.API_URL + item.image})` }} key={item}>
              <div className='Menu__overflow'></div>
              <div className='container'>
                  <div className='Main-wrapper'>
                      {category?.map((item) => {
                          return (
                              <NavLink to={`/Menu/${item?.id}`} key={item?.id}>
                                  <div className='Main-card'>
                                      <img src={CONFIG.API_URL + item.image} alt="Category" />
                                      <div className='card-over'>
                                          <h2>{item?.name}</h2>
                                      </div>
                                  </div>
                              </NavLink>
                          );
                      })}
                  </div>
              </div>
          </div>
          ))}
        </div>
    );
}

export default Category;
