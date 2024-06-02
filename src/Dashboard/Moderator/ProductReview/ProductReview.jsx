import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

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
        refetch()
    }
    const handleAccept = async(id) =>{
        await axiosSecure.patch(`/accept-product/${id}`)
        refetch()
    }

    if(isLoading) return <LoadingSpinner/>


    return (
        <div className="overflow-x-auto">
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
                        items.map((item, idx) => <tr key={item._id} className="hover">
                            <th>{idx + 1}</th>
                            <td>{item.productName}</td>
                            <td>{item.status}</td>
                            <td>Details</td>
                            <td><button className="btn">Featured</button></td>
                            <td><button disabled={item.status === 'accept'} onClick={()=> handleAccept(item._id)} className="btn">accept</button></td>

                            <td><button disabled={item.status === 'reject'} onClick={()=> handleReject(item._id)} className="btn">reject</button></td>






                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default ProductReview;