import SidebarItem from "../../Shared/SidebarItem/SidebarItem";
import { FaHome, FaProductHunt, FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
    return (
        <div>
            {/* users */}
            <SidebarItem label='My Profile' address='/dashboard' icon={CgProfile}></SidebarItem>

            <SidebarItem label='Add Product' address='/dashboard/addProduct' icon={FaProductHunt}></SidebarItem>

            <SidebarItem label='My Product' address='/dashboard/myProduct' icon={FaProductHunt}></SidebarItem>




            {/* moderator */}
            <SidebarItem label='Product Review' address='/dashboard/productReview' icon={FaStar}></SidebarItem>

            <SidebarItem label='Reported Contents' address='/dashboard/reportedContents' icon={FaStar}></SidebarItem>


            {/* admin route */}
            <SidebarItem label='Statistics' address='/dashboard/statistics' icon={FaStar}></SidebarItem>

            <SidebarItem label='Manage Users' address='/dashboard/manageUsers' icon={FaStar}></SidebarItem>



            <SidebarItem label='Manage Coupons' address='/dashboard/manageCoupons' icon={FaStar}></SidebarItem>



            {/* all */}
            <SidebarItem label='Home' address='/' icon={FaHome}></SidebarItem>

        </div>
    );
};

export default Sidebar;