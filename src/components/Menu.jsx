import React, {useEffect, useState} from 'react'
import '../Style/Menu.css'
import bg from '../img/Мену.png'
import CONFIG from '../store/config'
import { NavLink, useParams } from 'react-router-dom'
function Menu() {

    let location  = useParams()
   const [x, setX] = useState(null)

   useEffect(() => {
       getData()
   }, [])
   async function getData() {
       const fetchData = await fetch('https://darxon.onrender.com/api/category')
       const json = await fetchData.json()
       setX(json)
   }

   let filteredCat = x?.find((item)=>item.id === Number(location.categoryID) )
    return (
        <div className='Menu'>
         
            <header>
                <div className='container header__wrapper' >
                    <h1>
                        Logo
                    </h1>
                        <NavLink to="/">
                            Ortga 
                        </NavLink>
                        <NavLink to="/admin">
                            admin
                        </NavLink>
                </div>
            </header>
            <div className='main' style={{backgroundImage:`url(${bg})`}}>
            <div className='Menu__overflow'></div>
                <div className='container'>
                <div className='main__wrapper'>
                    {filteredCat?.menu?.map((item)=>{
                        return(
                            <div className='main__card'>
                            <img src={CONFIG.API_URL + item.image}  alt="foto" />
                            <div className='main__card__grid'>
                            <h2>
                               {item.name}
                            </h2>
                            <div className='card__line'>
    
                            </div>
                            <p>
                                {item.description}
                            </p>
                            <div className='card__line'>
            
                            </div>
                            <h2>
                                {item.price} so'm
                            </h2>
                            </div>
                        </div>
                        )
                    })}
                   


                   
                </div>
                </div>
            </div>
        </div>
    )
}

export default Menu