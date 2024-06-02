import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
    const {user} = useAuth()
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
                    <p className="mt-2 text-gray-500 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, </p>
                </div>
                <hr className="mt-6" />
                <div className="flex  bg-gray-50 ">
                    <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                        <p><span className="font-semibold">2.5 k </span> Followers</p>
                    </div>
                    <div className="border"></div>
                    <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                        <button>Subscribe $15</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    );
};

export default MyProfile;