import React, { useState } from 'react'
import '../Style/AdminBg.css'
import Saidbar from './Saidbar'
import SaidbarMobile from './SaidbarMobile'
import Hamburger from 'hamburger-react'
function AdminBg() {
    const [isActive, setActive] = useState(null)
    const AddSaidbar = () => {
        setActive(!isActive)
    }
    return (
        <div className='AdminBg'>
            <Saidbar />
            <div className='AdminBg-content'>
                <div className='AdminBg-header'>
                    <h1>
                        Fon
                    </h1>
                    <div className='Hamburger' onClick={AddSaidbar}>
                        <Hamburger color='white' />
                    </div>   
                </div>
                <div className='AdminBg-main'>
                    <div class="file-upload">
                        <input accept="application/pdf" type="file" id="fileInput" />
                        <label for="fileInput" class="file-label">
                            <div class="file-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                viewBox="0 0 16 16">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="m9.5 1.1l3.4 3.5l.1.4v2h-1V6H8V2H3v11h4v1H2.5l-.5-.5v-12l.5-.5h6.7zM9 2v3h2.9zm4 14h-1v-3H9v-1h3V9h1v3h3v1h-3z"
                                    clip-rule="evenodd" />
                            </svg></div>
                            <h3 class="file-text">Faylni tanlang</h3>
                        </label>
                    </div>
                    {/* <div class="pdf-check">
                        <div class="pdf-bg">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                                </svg>
                            </button>
                        </div>
                        <h1>
                            Fon bor
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M13 9V3.5L18.5 9M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                            </svg>
                        </h1>
                    </div> */}
                </div>
            </div>
            <div className={`Mobile-Bg ${isActive ? 'Mobile-active' : ''}`}>
                <SaidbarMobile />
            </div>
        </div>
    )
}

export default AdminBg