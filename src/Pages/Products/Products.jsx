import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BiUpvote } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const Products = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');

    const { data: items, isLoading } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/featured?search=${search}`);
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
    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText);
    };

    if (isLoading) return <LoadingSpinner />;
    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>
                    <input
                        className="input  rounded-r-none input-primary input-bordered border-blue-600  max-w-xs"
                        type='text'
                        name='search'
                        onChange={e => setSearchText(e.target.value)}
                        value={searchText}
                        placeholder='Search By Product Name'
                    />
                    <button className='px-1 h-[50px] rounded-l-none md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none'>
                        Search
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 md:mx-14 lg:grid-cols-4 lg:mx-32 gap-5">
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
        </div>
    );
};

export default Products;