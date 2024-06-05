import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const ManageUsers = () => {

const axiosSecure = useAxiosSecure()


    const { data: users = [] ,refetch, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
           const {data} = await axiosSecure.get('/users')
           return data
        }
    })


const handleMakeAdmin = (user)=>{
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
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }
    });
}









if(isLoading) return <LoadingSpinner/>



    return (
        <div className="overflow-x-auto">
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
                        users.map((user, idx) => <tr key={user._id} className="hover">
                            <th>{idx + 1}</th>
                            <th>{user?.email}</th>
                            <th>{user?.role}</th>
                            <th><button disabled={user?.role === 'admin' || user?.role === 'moderator'} className="btn">Moderator</button></th>
                            <th><button onClick={() => handleMakeAdmin(user)}  disabled={user?.role === 'admin'}  className="btn">Admin</button></th>
                            
                         
                            
                        </tr>)

                    }



                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;