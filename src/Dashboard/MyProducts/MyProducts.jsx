import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyProducts = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: items, isLoading, refetch } = useQuery({
        queryKey: ['my-product', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-product/${user?.email}`)
            return data
        }
    })


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/product/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }


    if (isLoading) return <LoadingSpinner />
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Number of votes</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        items.map((item, idx) => <tr key={item._id} className="hover">
                            <th>{idx + 1}</th>
                            <td>{item.productName}</td>
                            <td>{item.upVote}</td>
                            <td>{item.status}</td>
                            <td><Link className="btn btn-ghost btn-lg" to={`/dashboard/updateProduct/${item._id}`}>
                                    <FaEdit className=" text-2xl" />
                                </Link></td>
                            <td><button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrash /> </button>
                            </td>
                            
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;