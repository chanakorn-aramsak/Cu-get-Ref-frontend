import { useState } from 'react'
import './App.css'
import AuthenticationPage from './auth/register'
import Login from './auth/login';
import UpdateProfileStudent from './components/profileStudent'
import Review from './components/review';
import AddCourse from './courseManagement/addCourse';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Form } from 'node_modules/react-router-dom/dist/index';

function App() {
  const routes = [
    {
      path: "/",
      element: <AuthenticationPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/updateProfileStudent",
      element: <UpdateProfileStudent />,
    },
    {
      path: "/review",
      element: <Review />,
    },
    
    {
      path: "/form",
      element: <AddCourse />,
    },
  ];
  
  return <RouterProvider router={createBrowserRouter(routes)} />
}

export default App
