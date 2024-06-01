import SidebarItem from "../../Shared/SidebarItem/SidebarItem";
import { FaHome, FaProductHunt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
    return (
        <div>
            
                <SidebarItem label='My Profile' address='/dashboard' icon={CgProfile}></SidebarItem>

                <SidebarItem label='Add Product' address='/dashboard/addProduct' icon={FaProductHunt}></SidebarItem>

                <SidebarItem label='My Product' address='/dashboard/myProduct' icon={FaProductHunt}></SidebarItem>

                <SidebarItem label='Home' address='/' icon={FaHome}></SidebarItem>
                
             
        </div>
    );
};

export default Sidebar;