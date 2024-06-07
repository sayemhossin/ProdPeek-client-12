import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BiUpvote } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Products = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)

    const { data: items, isLoading } = useQuery({
        queryKey: ['featured', search,currentPage,itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/featured?page=${currentPage}&size=${itemsPerPage}&search=${search}`);
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
    useEffect(() => {
        const getCount = async () => {
          const { data } = await axiosPublic.get(`featured-count`)
    
          setCount(data.count)
        }
        getCount()
      }, [axiosPublic])
      const numberOfPages = Math.ceil(count / itemsPerPage)
      const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

      const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
      }
    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText);
    };

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="bg-gray-300 pt-6 pb-10">
          <Helmet>
            <title>All Product</title>
          </Helmet>
            <div className="text-center">
                <form onSubmit={handleSearch} className="mb-10">
                    <div>
                        <input
                            className="input  rounded-r-none input-primary input-bordered border-blue-500  w-1/2"
                            type='text'
                            name='search'
                            onChange={e => setSearchText(e.target.value)}
                            value={searchText}
                            placeholder='Search By Tag Name'
                        />
                        <button className='px-1 h-[50px] rounded-l-none md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none'>
                            Search
                        </button>
                    </div>
                </form>
            </div>
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
            {/* pagination */}
            <div className='flex justify-center mt-12'>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map(btnNum => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? 'bg-blue-500 text-white' : ''
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
        </div>
    );
};

export default Products;