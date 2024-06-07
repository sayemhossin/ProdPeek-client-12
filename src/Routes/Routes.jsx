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
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Payment from "../Dashboard/Payment/Payment";
import UpdateCoupon from "../Dashboard/Admin/ManageCoupons/UpdateCoupon";
import ProductReviewDetails from "../Dashboard/Moderator/ProductReviewdetails/ProductReviewDetails";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import Error from "../Pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Error></Error>,
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
      {
        path: 'product-details/:id',
        element: <PrivateRoute> <ProductDetails></ProductDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://assignment-12-server-theta-one.vercel.app/featured/${params.id}`)
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      // user routes
      {
        path: 'profile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: 'addProduct',
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
      },
      {
        path: 'myProduct',
        element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
      },
      {
        path: 'updateProduct/:id',
        element: <UpdateProduct />,
        loader: ({ params }) => fetch(`https://assignment-12-server-theta-one.vercel.app/product/${params.id}`)
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },



      // moderator route
      {
        path: 'productReview',
        element: <PrivateRoute><ModeratorRoute><ProductReview></ProductReview></ModeratorRoute></PrivateRoute>
      },
      {
        path: 'productReview-details/:id',
        element: <ProductReviewDetails></ProductReviewDetails>,
        loader: ({ params }) => fetch(`https://assignment-12-server-theta-one.vercel.app/product/${params.id}`)
      },
      {
        path: 'reportedContents',
        element: <PrivateRoute><ModeratorRoute><ReportedContents></ReportedContents></ModeratorRoute></PrivateRoute>
      },


      // admin route
      {
        path: 'statistics',
        element: <PrivateRoute><AdminRoute><Statistics></Statistics></AdminRoute></PrivateRoute>
      },
      {
        path: 'manageUsers',
        element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },
      {
        path: 'manageCoupons',
        element: <PrivateRoute><AdminRoute><ManageCoupons></ManageCoupons></AdminRoute></PrivateRoute>
      },
      {
        path: 'coupon/:id',
        element: <UpdateCoupon />,
        loader: ({ params }) => fetch(`https://assignment-12-server-theta-one.vercel.app/coupon/${params.id}`)
      }
    ]
  }
]);