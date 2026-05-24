import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import About from './pages/utils/About.jsx'
import BrandDetails from './pages/brands/BrandDetails.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import Items from './pages/items/Items.jsx'
import Users from './pages/users/Users.jsx'
import Moves from './pages/movements/Movements.jsx'
import Supply from './pages/items/Supply.jsx'
import Takeout from './pages/items/Takeout.jsx'
import ItemDetails from './pages/items/ItemDetails.jsx'
import MoveDetails from './pages/movements/MoveDetails.jsx'
import UserDetails from './pages/users/UserDetails.jsx'
import Logout from './pages/users/auth/Logout.jsx'
import ComponentDetails from './pages/components/ComponentDetails.jsx'
import LocalDetails from './pages/locals/LocalDetails.jsx'
import CategoryDetails from './pages/categories/CategoryDetails.jsx'
import UnityDetails from './pages/units/UnityDetails.jsx'
import ErrorPage from './pages/utils/ErrorPage.jsx'
import { Login } from './pages/users/auth/Login.jsx'
import { Register } from './pages/users/auth/Register.jsx'
import { ResetPassWord } from './pages/users/auth/ResetPassWord.jsx'
import { ConfirmEmail } from './pages/users/auth/ConfirmEmail.jsx'
import { UpdatePassWord } from './pages/users/auth/UpdatePassWord.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage error='Página não encontrada' />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/forgot-password",
        element: <ResetPassWord />
      },
      {
        path: "/update-password",
        element: <UpdatePassWord />
      },
      {
        path: "/confirm-email/:id",
        element: <ConfirmEmail />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/items",
        element: <Items />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/moves",
        element: <Moves />
      },
      {
        path: "/takeout/:id",
        element: <Takeout />
      },
      {
        path: "/supply",
        element: <Supply />
      },
      {
        path: "/takeout",
        element: <Takeout />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/items/:id",
        element: <ItemDetails />
      },
      {
        path: "/moves/:id",
        element: <MoveDetails />
      },
      {
        path: "/users/:id",
        element: <UserDetails />
      },
      {
        path: "/brands/:id",
        element: <BrandDetails />
      },
      {
        path: "/components/:id",
        element: <ComponentDetails />
      },
      {
        path: "/locals/:id",
        element: <LocalDetails />
      },
      {
        path: "/categories/:id",
        element: <CategoryDetails />
      },
      {
        path: "/units/:id",
        element: <UnityDetails />
      },
      {
        path: "/oldroute",
        element: <Navigate to="/contact" />
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
