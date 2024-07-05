import React, { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import SaidbarMobile from './SaidbarMobile';
import '../Style/AdminMenu.css';
import Saidbar from './Saidbar';
import axios from '../Service/axios';
import CONFIG from '../store/config';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function AdminMenu() {
    const [isActive, setActive] = useState(null);
    const [isModal, setModal] = useState(null);
    const [isChange, setChange] = useState(false);

    const AddSaidbar = () => {
        setActive(!isActive);
    };
    const ModalActive = () => {
        setModal(!isModal);
    };
    const ChangeActive = () => {
        setChange(!isChange);
    };

    const [isItemCategory, setItemCategory] = useState([]);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [info, setInfo] = useState('');
    const [iscategory, setCategory] = useState(0);
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [menuPage, setMenuPage] = useState(1);
    const [currentEditItem, setCurrentEditItem] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        category_id: 0,
        new:false
    });
    const [selectedCategory, setSelectedCategory] = useState(0);
    const CategoryPag = 3;
    const handleCheckboxChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
    }

    const createMenu = (e) => {
        e.preventDefault();

        const newMenu = {
            name: menuName,
            price: price,
            description: info,
            category_id: iscategory,
            discount: discount,
            type:checked,
            new:checked2,
        };
        const formData = new FormData();
        for (let key of Object.keys(newMenu)) {
            formData.append(key, newMenu[key]);
        }
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        axios.post('/menu', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                Toastify({
                    text: "Qoshildi",
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();
                ModalActive();
                getAllMenu();
                setCategory('')
                setInfo('')
                setMenuName('')
                setPrice('')
                setDiscount('')
                setSelectedFile(null)
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error creating new item:', error.response || error.message);
                Toastify({
                    text: "Hato!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }).showToast();
            });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const deleteMenu = (id) => {
        axios.delete(`/menu/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((respons) => {
                Toastify({
                    text: "Ochirildi",
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", 
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();
                getAllMenu();
            })
            .catch((error) => {
                console.log(error);
                Toastify({
                    text: "Hato!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }).showToast();
            });
    };


    
    const editMenu = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', currentEditItem.name);
        formData.append('description', currentEditItem.description);
        formData.append('price', currentEditItem.price);
        formData.append('category_id', currentEditItem.category_id);
        formData.append('new', currentEditItem.new.toString());
        if (selectedFile) {
            formData.append('image', selectedFile);
        } else {
            formData.append('image', currentEditItem.image);
        }
        axios.put(`/menu/${currentEditItem.id}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                Toastify({
                    text: "Ozgartirildi",
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();
                setCurrentEditItem({
                    img: selectedFile,
                    id: '',
                    name: '',
                    price: '',
                    description: '',
                    discount:'',
                    category_id: iscategory,
                });
                setChecked2(false);
                ChangeActive();
                getAllMenu();
            })
            .catch((error) => {
                Toastify({
                    text: "Hato!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }).showToast();
            });
    };
    const handleCheckboxChange2 = () => {
        setChecked2(!checked2);
        setCurrentEditItem(prevState => ({
            ...prevState,
            new: !checked2, 
        }));
    };
    
    const toggleEditModal = (item) => {
        setCurrentEditItem(item);
        ChangeActive();
    };

    const getAllCategory = () => {
        axios.get('/category')
            .then((respons) => {
                setItemCategory(respons.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const getAllMenu = () => {
        axios.get('/menu')
            .then((respons) => {
                setChecked2(respons.data)
                setItems(respons.data);
                setFilteredItems(respons.data);
            })
            .catch((error) => {
                console.error('Error fetching menu items:', error);
            });
    };

    const filterByCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 0) {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item => item.category_id === categoryId);
            setFilteredItems(filtered);
        }
    };

    const indexOfLastItem = menuPage * CategoryPag;
    const indexOfFirstItem = indexOfLastItem - CategoryPag;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredItems.length / CategoryPag);

    const nextPage = () => {
        if (menuPage < totalPages) {
            setMenuPage(menuPage + 1);
        }
    };

    const prevPage = () => {
        if (menuPage > 1) {
            setMenuPage(menuPage - 1);
        }
    };

    
    useEffect(() => {
        getAllMenu();
        getAllCategory();
    }, []);

    return (
        <div className='AdminMenu'>
            <Saidbar />
            <div className='AdminMenu-content'>
                <div className='AdminMenu-header'>
                    <div className='AdminMenu-header-con'>
                        <h1>
                            Menu
                        </h1>
                        <button onClick={ModalActive} className='AdminMenu-header-btn'>
                            Menu Yaratish
                        </button>
                    </div>
                    <div className='Hamburger' onClick={AddSaidbar}>
                        <Hamburger color='white' />
                    </div>
                </div>
                <div className='AdminMenu-main '>
                    <div className='AdminMenu-main-category'>
                        {isItemCategory.map((item, index) => (
                            <button key={index} onClick={() => filterByCategory(item.id)} className={selectedCategory === item.id ? 'active2' : ''}>{item.name}</button>
                        ))}
                    </div>
                    <div className='AdminMenu-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <h3>
                                            Rasm
                                        </h3>
                                    </th>
                                    <th>
                                        <h3>
                                            Nom
                                        </h3>
                                    </th>
                                    <th>
                                        <h3>
                                            Narx
                                        </h3>
                                    </th>
                                    <th>
                                        <h3>
                                            Skidka 
                                        </h3>
                                    </th>
                                    <th>
                                        <h3>
                                            Turi 
                                        </h3>
                                    </th>
                                    <th>
                                        <h3>
                                            Info
                                        </h3>
                                    </th>
                                    <th>
                                        <h3>
                                            Sozlama
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((i, index) => (
                                    <tr key={i.id}>
                                        <td>
                                            <img src={CONFIG.API_URL + i.image} alt="foto" />
                                        </td>
                                        <td>
                                            <h3>
                                                {i.name}
                                            </h3>
                                        </td>
                                        <td>
                                            <h3>
                                                {i.price}
                                            </h3>
                                        </td>
                                        <td>
                                            <h3>
                                                {i.discount}%
                                            </h3>
                                        </td>
                                        <td>
                                            <h3>
                                                {i.type === true ? "Katta" : 'Odiy'}
                                            </h3>
                                        </td>
                                        <td>
                                            <p>
                                                {i.description}
                                            </p>
                                        </td>
                                        <td>
                                            <div>
                                                <button class="delete" onClick={() => deleteMenu(i.id)}>
                                                    <svg class="delate" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                        viewBox="0 0 24 24">
                                                        <path fill="currentColor"
                                                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => toggleEditModal(i)} class="edit">
                                                    <svg class="change" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                        viewBox="0 0 24 24">
                                                        <path fill="currentColor"
                                                            d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='AdminMenu-footer'>
                        <button onClick={prevPage} disabled={menuPage === 1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6" />
                            </svg>
                        </button >
                        <div className='AdminMenu-footer-con'>
                            <span>
                                {menuPage}
                            </span>
                            <span>/</span>
                            <span>
                                {totalPages}
                            </span>
                        </div>
                        <button onClick={nextPage} disabled={menuPage === totalPages}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018a.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`Mobile-Bg ${isActive ? 'Mobile-active' : ''}`}>
                <SaidbarMobile />
            </div>
            <div className={`modal-create-bg ${isModal ? 'db' : ''}`}>
                <div className='modal-create-content'>
                    <div className='modal-create-content-header'>
                        <h2>
                            Menu Yaratish
                        </h2>
                        <button onClick={ModalActive}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clip-rule="evenodd" /></svg>
                        </button>
                    </div>
                    <form onSubmit={createMenu}>
                        <label htmlFor="name">
                            <h3>
                                Nomi
                            </h3>
                            <input
                                value={menuName}
                                onChange={(e) => setMenuName(e.target.value)}
                                required id='name' type="text" />
                        </label>
                        <label htmlFor="Price">
                            <h3>
                                Narx
                            </h3>
                            <input
                            
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required id='Price' type="number" />
                        </label>
                        <label htmlFor="sk">
                            <h3>
                                Skidka
                            </h3>
                            <input

                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                id='sk' type="number" />
                        </label>
                        <div className="modal-foto">
                            <h3>Фото</h3>
                            <label className="file-input-container" htmlFor="photo">
                                <span className='soz'>Фото</span>
                                <input required onChange={handleFileChange} id="photo" accept="image/*" type="file" />
                            </label>
                        </div>
                        <label htmlFor="productText">
                            <h3>Malumot</h3>
                            <textarea
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                                required
                                id="productText"
                                className="menu-info"
                                cols=""
                                rows=""
                            />
                        </label>
                        <select  value={iscategory} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Category</option>
                            {isItemCategory.map((category) => (
                                <option  key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                     <div className='Flex'>
                     <label className='lel' htmlFor="">
                        <h3>
                            Turi
                        </h3>
                      <input 
                      value={checked}
                      onChange={handleCheckboxChange} type="checkbox" name="" id="" 
                      
                      />
                      </label>
                      <label className='lel' htmlFor="">
                        <h3>
                            Yangilik
                        </h3>
                      <input 
                      value={checked2}
                      onChange={handleCheckboxChange2} type="checkbox" name="" id="" 
                      
                      />
                      </label>
                     </div>
                        <button type='submit'>
                            Yaratish
                        </button>
                    </form>
                </div>
            </div>
            <div className={`modal-change-bg ${isChange ? 'db' : ''}`}>
                <div className='modal-change-content'>
                    <div className='modal-change-content-header'>
                        <h2>
                            O'zgartirish
                        </h2>
                        <button onClick={ChangeActive}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clip-rule="evenodd" /></svg>
                        </button>

                    </div>
                    <form onSubmit={editMenu}>
                        <label htmlFor="name">
                            <h3>
                                Nomi
                            </h3>
                            <input
                                value={currentEditItem.name}
                                onChange={(e) => setCurrentEditItem({ ...currentEditItem, name: e.target.value })}
                                id='name' type="text" />
                        </label>
                        <label htmlFor="Price">
                            <h3>
                                Narx
                            </h3>
                            <input
                                value={currentEditItem.price}
                                onChange={(e) => setCurrentEditItem({ ...currentEditItem, price: e.target.value })}
                                id='Price' type="number" />
                        </label>
                        <label htmlFor="sk">
                            <h3>
                                Skidka
                            </h3>
                            <input
                                value={currentEditItem.discount}
                                onChange={(e) => setCurrentEditItem({ ...currentEditItem, discount: e.target.value })}
                                id='sk' type="number" />
                        </label>
                        <div className="modal-foto">
                            <h3>Фото</h3>
                            <label className="file-input-container" htmlFor="photo">
                                <span className='soz'>Фото</span>
                                <input onChange={handleFileChange} id="photo" accept="image/*" type="file" />
                            </label>
                        </div>
                        <label htmlFor="productText">
                            <h3>Malumot</h3>
                            <textarea
                                value={currentEditItem.description}
                                onChange={(e) => setCurrentEditItem({ ...currentEditItem, description: e.target.value })}

                                id="productText"
                                className="menu-info"
                                cols=""
                                rows=""
                            />
                        </label>
                        <select value={currentEditItem.category_id} onChange={(e) => setCurrentEditItem({ ...currentEditItem, category_id: e.target.value })}>
                            <option value="">Turkum</option>
                            {isItemCategory.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label className='lel' htmlFor="">
                        <h3>
                            Yangilik
                        </h3>
                      <input 
                      checked={checked2 === true}
                      onChange={handleCheckboxChange2} type="checkbox" name="" id="" 
                      />
                      </label>
                        <button type='submit'>
                            O'zgartirish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu