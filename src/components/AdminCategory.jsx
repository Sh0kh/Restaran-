import React, { useState, useEffect } from 'react'
import Hamburger from 'hamburger-react'
import '../Style/AdminCategory.css'
import Saidbar from './Saidbar'
import SaidbarMobile from './SaidbarMobile'
import axios from '../Service/axios'
import CONFIG from '../store/config'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function AdminCategory() {
    const [isActive, setActive] = useState(null)
    const [isModal, setModal] = useState(null)
    const [isChange, setChange] = useState(null)
    const AddSaidbar = () => {
        setActive(!isActive)
    }
    const ModalActive = ()=>{
        setModal(!isModal)
    }
    const ChangeActive = ()=>{
        setChange(!isChange)
    }

    const [isCategoryName, setCategoryName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [isItemCategory, setItemCategory] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEditItem, setCurrentEditItem] = useState({ id: '', name: '' });
    const CategoryPag = 3;

    const createCategory = (e) =>{
        e.preventDefault()

        const newCategory = {
            name: isCategoryName,
        }
        const formData = new FormData();
        for (let key of Object.keys(newCategory)) {
            formData.append(key, newCategory[key]);
        }
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        axios.post("/category",formData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res)=>{
            Toastify({
                text: "Qoshildi",
                duration: 3000,
                gravity: "top", 
                position: "right", 
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
            ModalActive();
            getAllCategory(); 
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
    }
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const getAllCategory = () =>{
        axios.get('/category')
        .then((respons)=>{
            setItemCategory(respons.data)
        })
        .catch((error)=>{
            
        })
    }

    const deleteCategory = (id) =>{
        axios.delete(`/category/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => {
            Toastify({
                text: "Ochirildi",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
            getAllCategory();
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
    }

    const editCategory = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', currentEditItem.name);
        if (selectedFile) {
            formData.append('image', selectedFile);
        } else {
            // Если изображение не выбрано, добавляем текущее изображение
            formData.append('image', currentEditItem.image);
        }
        axios.put(`/category/${currentEditItem.id}`, formData,{
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
            getAllCategory()
            setCurrentEditItem({
                id: '',
                name: '',
                img: selectedFile, // Удаляем изображение из состояния после успешного редактирования
            });
            ChangeActive()
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
    }

    const indexOfLastItem = currentPage * CategoryPag;
    const indexOfFirstItem = indexOfLastItem - CategoryPag;
    const currentItems = isItemCategory.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(isItemCategory.length / CategoryPag);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleEditModal = (item) =>{
        setCurrentEditItem(item);
        ChangeActive();
    }

    useEffect(() => {
        getAllCategory();
    }, []);
    
    return (
        <div className='AdminCategory'>
            <Saidbar/>
            <div className='AdminCategory-content'>
                <div className='AdminCategory-header'>
                    <div className='AdminCategory-header-con'>
                        <h1>
                            Category
                        </h1>
                        <button onClick={ModalActive} className='AdminCategory-header-btn'>
                            Yaratish
                        </button>
                    </div>
                    <div className='Hamburger' onClick={AddSaidbar}>
                        <Hamburger color='white' />
                    </div>
                </div>
                <div className='AdminCategory-main'>
                    <div className='AdminCategory-table'>
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
                                            Sozlama
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                               {currentItems.map((isItemCategory, index) => (
                                 <tr key={index}>
                                     <td>
                                         <img src={CONFIG.API_URL + isItemCategory.image} alt="" />
                                     </td>
                                     <td>
                                         <h3>
                                             {isItemCategory.name}
                                         </h3>
                                     </td>
                                     <td>
                                         <div>
                                             <button onClick={() => deleteCategory(isItemCategory.id)} className="delete">
                                                 <svg className="delate" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                     viewBox="0 0 24 24">
                                                     <path fill="currentColor"
                                                         d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                                                 </svg>
                                             </button>
                                             <button onClick={() => toggleEditModal(isItemCategory)} className="edit">
                                                 <svg className="change" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
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
                    <div className='AdminCategory-footer'>
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6" />
                            </svg>
                        </button>
                        <div className='AdminCategory-footer-con'>
                            <span>
                                {currentPage}
                            </span>
                            <span>/</span>
                            <span>
                                {totalPages}
                            </span>
                        </div>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
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
                    <form onSubmit={createCategory}>
                        <label htmlFor="name">
                            <h3>
                                Nomi
                            </h3>
                            <input 
                             value={isCategoryName}
                             onChange={(e) => setCategoryName(e.target.value)}
                            required id='name' type="text" />
                        </label>
                        <div className="modal-foto">
                            <h3>Фото</h3>
                            <label className="file-input-container" htmlFor="photo">
                                <span className='soz'>Фото</span>
                                <input
                                onChange={handleFileChange} 
                                id="photo" accept="image/*" type="file" />
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
                    <form onSubmit={editCategory}>
                        <label htmlFor="name">
                            <h3>
                                Nomi
                            </h3>
                            <input 
                              value={currentEditItem.name}
                              onChange={(e) => setCurrentEditItem({ ...currentEditItem, name: e.target.value })}
                              required id='name' type="text" />
                        </label>
                        <div className="modal-foto">
                            <h3>Фото</h3>
                            <label className="file-input-container" htmlFor="photo">
                                <span className='soz'>Фото</span>
                                <input
                                onChange={handleFileChange} 
                                id="photo" accept="image/*" type="file" />
                            </label>
                        </div>
                        <button type='submit'>
                            O'zgartirish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminCategory
