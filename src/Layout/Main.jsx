import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Home/Navbar/Navbar";

const Main = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
          {
           noHeaderFooter  ||<div className="shadow-lg h-20 fixed w-full z-50">
             <Navbar></Navbar>
             </div>
          }
            <div className={!noHeaderFooter && 'pt-20'}>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;