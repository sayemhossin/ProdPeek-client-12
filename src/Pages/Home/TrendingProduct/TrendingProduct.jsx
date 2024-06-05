import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { BiUpvote } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

const TrendingProduct = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient();

    const { data: items = [] } = useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/trending');
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            await axiosPublic.patch(`/up-vote/${id}`, { email: user?.email });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('trending');
        },
    });
    const handleCount = async (id) => {
        if (user && user?.email) {
            mutation.mutate(id);
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please Login First",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    };





    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:mx-14 lg:grid-cols-3 lg:mx-32 gap-5">
                {items.map(item => (
                    <div key={item._id} className="card bg-base-100 shadow-xl">
                        <div className="h-1/2 w-full">
                            <img className="h-full w-full p-3" src={item.productPhoto} alt={item.productName} />
                        </div>
                        <div className="card-body">
                            <Link to={`/product-details/${item._id}`} className="card-title hover:underline text-2xl font-extrabold">
                                {item.productName}
                            </Link>
                            <p>{item.description}</p>
                            <p>{item.tags}</p>
                            <div className="card-actions justify-start">
                                <button
                                    onClick={() => handleCount(item._id)}
                                    disabled={user?.email === item.adder.email || (item.upVoters && item.upVoters.includes(user?.email))}
                                    className="btn bg-gray-200 hover:bg-gray-300 rounded-l-full px-3 py-2"
                                >
                                    <p className="flex items-center">
                                        <BiUpvote className="text-xl" /> Upvote
                                    </p>
                                </button>
                                <div className="bg-gray-200 rounded-r-full px-5 py-3">
                                    <p>{item.upVote}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center grid justify-center">
                <Link to={'/products'}><button className="btn  text-2xl btn-link flex items-center justify-center">Show All Products <FaArrowRight /></button>
                </Link>
            </div>
        </div>
    );
};

export default TrendingProduct;