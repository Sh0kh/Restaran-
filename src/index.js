import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/Error';
import Category from './components/Category';
import Menu from './components/Menu';
import Login from './components/Login';
import Admin from './components/Admin';
import AdminMenu from './components/AdminMenu';
import AdminCategory from './components/AdminCategory';
import AdminBg from './components/AdminBg';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Category/>,
      },
      {
        path:'/Menu',
        element:<Menu/>
      },
      {
        path:'/Login',
        element:<Login/>
      },
      {
        path:'/Admin',
        element:<Admin/>
      },
      {
        path:'/AdminMenu',
        element:<AdminMenu/>
      },
      {
        path:'/AdminCategory',
        element:<AdminCategory/>
      },
      {
        path:'/Adminfoon',
        element:<AdminBg/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
