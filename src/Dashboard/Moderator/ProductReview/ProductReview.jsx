import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ProductReview = () => {
    const axiosSecure = useAxiosSecure()

    const { data: items, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/product')
            return data
        }
    })
    
    const handleReject = async(id) =>{
        await axiosSecure.patch(`/reject-product/${id}`)
        toast.error('Rejected')
        refetch()
    }
    const handleAccept = async(id) =>{
        await axiosSecure.patch(`/accept-product/${id}`)
        toast.success('Accepted')
        refetch()
    }
    const handleFeatured = async(id) =>{
        await axiosSecure.patch(`/featured-product/${id}`)
        toast.success('Added successfully')
    }

    if(isLoading) return <LoadingSpinner/>


    return (
        <div className="overflow-x-auto p-10 bg-gray-200">
            <Helmet>
                <title>Dashboard | Product Review</title>
            </Helmet>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>status</th>
                        <th>View Details</th>
                        <th>Make Featured</th>
                        <th>Accept Button</th>
                        <th>Reject Button</th>
                        
                    </tr>
                </thead>
                <tbody>

                    {
                        items.map((item, idx) => <tr key={item._id} className="hover:bg-blue-50">
                            <th>{idx + 1}</th>
                            <td>{item.productName}</td>
                            <td className={item.status === 'accept' && 'text-green-500 font-bold' || item.status === 'pending' && 'text-blue-400 font-bold' || item.status === 'reject' && 'text-red-400 font-bold'}>{item.status}</td>

                            
                            <td><Link to={`/dashboard/productReview-details/${item._id}`}>Details</Link></td>

                            <td className={item.status === 'accept' && 'btn bg-green-200 font-bold' || item.status === 'pending' && 'btn bg-blue-400 font-bold' || item.status === 'reject' && 'text-red-400 font-bold'}><button disabled={item.status === 'reject'} onClick={()=> handleFeatured(item._id)}>Featured</button></td>

                            <td className={item.status === 'accept' && 'text-green-500 font-bold' || item.status === 'pending' && 'text-blue-400 font-bold' || item.status === 'reject' && 'text-red-400 font-bold'}><button disabled={item.status === 'accept'} onClick={()=> handleAccept(item._id)}><HiOutlineCheckCircle  className="text-4xl "/></button></td>

                            <td  className="text-red-500"><button disabled={item.status === 'reject'} onClick={()=> handleReject(item._id)}><RxCrossCircled className="text-4xl" /></button></td>






                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default ProductReview;