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
import ProductReview from "../Dashboard/Moderator/ProductReview/ProductReview";
import ReportedContents from "../Dashboard/Moderator/ReportedContents/ReportedContents";
import Statistics from "../Dashboard/Admin/Statistics/Statistics";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
import ManageCoupons from "../Dashboard/Admin/ManageCoupons/ManageCoupons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/products',
        element: <Products></Products>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      // user routes
      {
        path:'profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'myProduct',
        element: <MyProducts></MyProducts>
      },
      {
        path: 'updateProduct/:id',
        element: <UpdateProduct />,
        loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`)
      },
      // moderator route
      {
        path:'productReview',
        element:<ProductReview></ProductReview>
      },
      {
        path:'reportedContents',
        element:<ReportedContents></ReportedContents>
      },
      // admin route
      {
        path:'statistics',
        element:<Statistics></Statistics>
      },
      {
        path:'manageUsers',
        element:<ManageUsers></ManageUsers>
      },
      {
        path:'manageCoupons',
        element:<ManageCoupons></ManageCoupons>
      }
    ]
  }
]);