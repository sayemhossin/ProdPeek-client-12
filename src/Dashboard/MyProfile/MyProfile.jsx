import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const MyProfile = () => {
    const { user, setLoading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        setLoading(true)
        axiosSecure.get(`/user/${user?.email}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
        setLoading(false)

    }, [axiosSecure, user?.email, setLoading]);


    return (
        <div className="md:h-screen bg-gray-200  flex flex-wrap items-center  justify-center  ">
            <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div>
                <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full   " src={user?.photoURL} alt="" />

                </div>
                <div className=" ">
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user?.displayName}</h2>
                        <p className="text-gray-400 mt-2 ">{user?.email}</p>
                        <p className="mt-2 text-gray-500 text-sm"> Hi, I am {user?.displayName}! Passionate about innovation, tech, and startups. Always exploring new ideas and products. Let connect and create something amazing together!</p>
                    </div>
                    <hr className="mt-6" />



                    <div className="text-center p-4 w-full hover:bg-gray-100 cursor-pointer">
                       {userDetails?.status === 'verified' ?'verified':  <Link to='/dashboard/payment'><button className="">Subscribe 15$</button></Link>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;