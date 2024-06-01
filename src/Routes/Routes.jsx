import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import MyProfile from "../Dashboard/MyProfile/MyProfile";
import AddProduct from "../Dashboard/AddProduct/AddProduct";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import PrivateRoute from "./PrivateRoute";
import UpdateProduct from "../Dashboard/UpdateProduct/UpdateProduct";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/products',
            element: <Products></Products>
        },
        {
            path:'/login',
            element: <Login></Login>
        },
        {
            path:'/register',
            element: <Register></Register>
        },
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
        // user dashboard
        {
          index:true,
          element:<MyProfile></MyProfile>
        },
        {
          path:'addProduct',
          element:<AddProduct></AddProduct>
        },
        {
          path:'myProduct',
          element:<MyProducts></MyProducts>
        },
        {
          path:'updateProduct',
          element:<UpdateProduct></UpdateProduct>
        },
      ]
    }
  ]);