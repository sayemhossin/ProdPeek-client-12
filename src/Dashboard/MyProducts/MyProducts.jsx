import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const MyProducts = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: items, isLoading } = useQuery({
        queryKey: ['my-product',user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/my-product/${user?.email}`)
            return data
        }
    })

console.log(items)
    if (isLoading) return <LoadingSpinner />


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Number of votes</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        items.map(item=><tr key={item._id} className="hover">
                        <th>2</th>
                        <td>{item.productName}</td>
                        <td>{item.upVote}</td>
                        <td>{item.status}</td>
                        <td>{item.status}</td>
                        <td>{item.status}</td>
                    </tr>)
                    }
                    

                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;