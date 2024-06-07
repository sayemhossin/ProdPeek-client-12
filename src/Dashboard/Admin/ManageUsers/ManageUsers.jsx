import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import { GrUserAdmin } from "react-icons/gr";
import { MdAddModerator } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()


    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data
        }
    })


    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.email} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }
    const handleMakeModerator = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Moderator!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/moderator/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user?.email} is an Moderator Now!`,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }









    if (isLoading) return <LoadingSpinner />



    return (
        <div className="overflow-x-auto p-10 bg-gray-200">
            <Helmet>
                <title>Dashboard | Manage Users</title>
            </Helmet>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Email</th>
                        <th>User Role</th>
                        <th>Make Moderator</th>
                        <th>Make Admin</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((user, idx) => <tr key={user._id} className="hover:bg-blue-50">
                            <th>{idx + 1}</th>
                            <th>{user?.email}</th>
                            <th className={user?.role === 'admin' && 'font-extrabold text-blue-500' || user?.role === 'moderator' && 'font-bold text-green-500'}>{user?.role}</th>
                            <th><button onClick={() => handleMakeModerator(user)} disabled={user?.role === 'admin' || user?.role === 'moderator'} className="btn bg-green-100"><MdAddModerator className="text-green-600 text-2xl" /></button></th>
                            <th><button onClick={() => handleMakeAdmin(user)} disabled={user?.role === 'admin'} className="btn bg-blue-100"><GrUserAdmin className="text-xl text-blue-700" /></button></th>



                        </tr>)

                    }



                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;