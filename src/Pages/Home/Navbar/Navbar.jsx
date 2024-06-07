import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
const Navbar = () => {
    const { user, logOut } = useAuth()
    const [role] = useRole()
    const link = <>
        <div className="flex  flex-col text-[15px] lg:flex-row" id="sidebar">
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/products'}>Products</NavLink></li>
        </div>
    </>



    const handleLogout = () => {
        logOut()
            .then()
            .catch()
    }


    return (
        <div className="navbar backdrop-blur-lg bg-white bg-opacity-30 md:px-10 h-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                        {link}
                    </ul>
                </div>
                <Link to={'/'} className="md:text-5xl cursor-pointer font-bold  text-xl"><span className="text-blue-500">P</span>rod<span className="text-blue-500">P</span>eek</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {link}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 md:w-20 rounded-full border-4 border-blue-500">
                            <img alt="Tailwind CSS Navbar component" src=
                                {user?.photoURL || 'https://i.ibb.co/sgsSHth/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg'} />
                        </div>
                    </div>
                    <ul tabIndex={0} className=" menu-sm font-semibold dropdown-content mt-3 z-[1] p-2 shadow-lg border-4 border-dashed border-blue-900 bg-[#acc7f5] rounded-lg w-52">

                        <li className="p-2 hover:bg-[#acc7f5] rounded-md ">
                            <p className="flex hover:bg-[#acc7f5] font-bold text-[16px] justify-center">{user?.displayName || 'No Name'}</p>
                        </li>

                        <div className="divider border-dashed border-gray-500 "></div>

                        {
                            role === 'user' && <li className="p-2 hover:bg-[#3a66b3] rounded-md ">
                                <Link to={'/dashboard/profile'} className="flex justify-start">Dashboard</Link>
                            </li>
                        }
                        {
                            role === 'moderator' && <li className="p-2 hover:bg-[#3a66b3] rounded-md ">
                                <Link to={'/dashboard/productReview'} className="flex justify-start">Dashboard</Link>
                            </li>
                        }
                        {
                            role === 'admin' && <li className="p-2 hover:bg-[#3a66b3] rounded-md ">
                                <Link to={'/dashboard/statistics'} className="flex justify-start">Dashboard</Link>
                            </li>
                        }




                        {
                            user ? <li className="p-2 hover:bg-[#3a66b3] rounded-md ">
                                <button className="flex h-full w-full justify-start"
                                    onClick={handleLogout}>Logout</button>
                            </li> :

                                <li className="p-2 hover:bg-[#3a66b3] rounded-md ">
                                    <Link to={'/login'} className="flex justify-start">Login</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;