import SidebarItem from "../../Shared/SidebarItem/SidebarItem";
import { FaAddressBook, FaHome, FaProductHunt, FaStar, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { ImStatsDots } from "react-icons/im";
import { RiCoupon3Fill } from "react-icons/ri";
import { MdReport } from "react-icons/md";

const Sidebar = () => {
    const [role,isLoading] = useRole()
    const {user} = useAuth()

    if(isLoading) return <p>...</p>
    return (
        <div>
           {
            (role === 'moderator' || role === 'admin') && 
             <div className="flex gap-5 mb-9">
                <div className="avatar">
                    <div className="w-14 rounded-full">
                        <img src={user?.photoURL} />
                    </div>
                </div>
               <div>
               <h1 className="text-xl font-bold">{user?.displayName}</h1>
               <h2 className="font-semibold">{role}</h2>
               </div>
            </div>
          
           }





            {/* users */}
            {
                role === 'user' && <>
                    <SidebarItem label='My Profile' address='/dashboard/profile' icon={CgProfile}></SidebarItem>

                    <SidebarItem label='Add Product' address='/dashboard/addProduct' icon={FaAddressBook}></SidebarItem>

                    <SidebarItem label='My Product' address='/dashboard/myProduct' icon={FaProductHunt}></SidebarItem>
                </>
            }




            {/* moderator */}
            {
                role === 'moderator' && <>
                    <SidebarItem label='Product Review' address='/dashboard/productReview' icon={FaStar}></SidebarItem>

                    <SidebarItem label='Reported Contents' address='/dashboard/reportedContents' icon={MdReport}></SidebarItem>
                </>
            }


            {/* admin route */}
            {role === 'admin' && <>
                <SidebarItem label='Statistics' address='/dashboard/statistics' icon={ImStatsDots}></SidebarItem>

                <SidebarItem label='Manage Users' address='/dashboard/manageUsers' icon={FaUsers}></SidebarItem>

                <SidebarItem label='Manage Coupons' address='/dashboard/manageCoupons' icon={RiCoupon3Fill}></SidebarItem>
            </>}







            {/* all */}
            <SidebarItem label='Home' address='/' icon={FaHome}></SidebarItem>

        </div>
    );
};

export default Sidebar;