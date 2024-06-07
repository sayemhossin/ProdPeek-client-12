import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { BiUpvote } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const FeaturedProduct = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient();

    const { data: items, isLoading } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/featured');
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            await axiosPublic.patch(`/up-vote/${id}`, { email: user?.email });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('featured');
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

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:mx-14 lg:grid-cols-4 lg:mx-32 gap-5">
            {items.slice(0, 8).map(item => (
                <div data-aos="fade-up" data-aos-duration="2000" key={item._id} className="card bg-base-100 shadow-xl">
                    <div className="h-1/2 w-full">
                        <img data-aos="zoom-in" data-aos-duration="2000" className="h-full w-full p-3" src={item.productPhoto} alt={item.productName} />
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
                                style={{ backgroundColor: (user?.email === item.adder.email || (item.upVoters && item.upVoters.includes(user?.email))) ? '#ABC9FF' : '#34B3F1', cursor: 'pointer' }}
                            >
                                <p className="flex items-center">
                                    <BiUpvote className="text-xl" /> Upvote
                                </p>
                            </button>
                            <div className="bg-blue-200 rounded-r-full px-5 py-3">
                                <p>{item.upVote}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedProduct;
