import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Home/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

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
            {noHeaderFooter || <Footer></Footer>}
            <Toaster />
        </div>
    );
};

export default Main;