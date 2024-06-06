import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

const ReportedContents = () => {

    const axiosSecure = useAxiosSecure()

    const { data: reported = [], isLoading, refetch } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/report')
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
        }).then(async(result) => {
            if (result.isConfirmed) {
               await axiosSecure.delete(`/report/${id}`)
               await refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "product has been deleted.",
                    icon: "success"
                });
            }
        });

    }


    if (isLoading) return <LoadingSpinner />

    return (
        <div className="overflow-x-auto p-10 bg-gray-200 shadow-lg" >
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Reported By</th>
                        <th>View Details</th>
                        <th>Delete Button</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        reported.map((report, idx) => <tr key={report._id} className="hover:bg-blue-50">
                            <th>{idx + 1}</th>
                            <td>{report.productName}</td>
                            <td>{report.reported_by}</td>
                            <td ><Link className="btn bg-blue-50" to={`/product-details/${report.product_id}`}><TbListDetails  className="text-blue-700 text-3xl"/></Link></td>
                            <td><button  onClick={() => handleDelete(report.product_id)} className="btn bg-red-50"><FaTrash className="text-xl text-red-400"/></button></td>
                        </tr>)

                    }



                </tbody>
            </table>
        </div>
    );
};

export default ReportedContents;