import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import { FaAlignJustify } from "react-icons/fa";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                
                <label htmlFor="my-drawer-2" className="m-10 mt-6 mb-8 drawer-button lg:hidden"><FaAlignJustify className=" bg-gray-50 text-5xl p-3 ml-3" /></label>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 md:w-80 min-h-full bg-blue-400 text-base-content">
                    <Sidebar></Sidebar>
                </ul>
                <Toaster />
            </div>
        </div>
    );
};

export default DashboardLayout;