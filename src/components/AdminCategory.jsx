import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import '../Style/AdminCategory.css'
import Saidbar from './Saidbar'
import SaidbarMobile from './SaidbarMobile'
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
                                <tr>
                                    <td>
                                        <h3>
                                            Osh
                                        </h3>
                                    </td>
                                    <td>
                                        <div>
                                            <button class="delete">
                                                <svg class="delate" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                    viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                                                </svg>
                                            </button>
                                            <button onClick={ChangeActive} class="edit">
                                                <svg class="change" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                    viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                        d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='AdminCategory-footer'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6" />
                            </svg>
                        </button>
                        <div className='AdminCategory-footer-con'>
                            <span>
                                1
                            </span>
                            <span>/</span>
                            <span>
                                2
                            </span>
                        </div>
                        <button>
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
                    <form>
                        <label htmlFor="name">
                            <h3>
                                Nomi
                            </h3>
                            <input required id='name' type="text" />
                        </label>
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
                    <form>
                        <label htmlFor="name">
                            <h3>
                                Nomi
                            </h3>
                            <input required id='name' type="text" />
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

export default AdminCategory