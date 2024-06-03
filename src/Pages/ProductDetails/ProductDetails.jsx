import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BiUpvote } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import ReviewForm from "../../Components/ReviewForm/ReviewForm";

const ProductDetails = () => {
    const item = useLoaderData()
    const { user } = useAuth()
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();



    const mutation = useMutation({
        mutationFn: async (id) => {
            await axiosPublic.patch(`/up-vote/${id}`, { email: user?.email });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('');
        },
    });

    const handleCount = async (id) => {
        mutation.mutate(id);
    };






    return (

        <div>
            <div className="w-full ">
                <div className="w-full">
                    <img src={item.productPhoto} className="lg:hidden md:h-[600px] w-full" alt="" />
                </div>
                <div className="flex bg-white h-auto lg:h-[700px] ">
                    <div className="flex items-center text-center mx-auto lg:text-left px-8 md:px-12 lg:w-1/2">
                        <div className="md:space-y-5">
                            <h2 className="text-3xl font-bold text-gray-800 md:text-5xl">{item.productName}</h2>
                            <p className="mt-2 text-sm text-gray-500 md:text-xl">{item.tags}</p>
                            <p className="mt-2 text-sm text-gray-500 md:text-xl">{item.description}</p>
                            <p className="mt-2 text-sm text-blue-600  md:text-xl">{item.link}</p>

                            <div className="flex justify-center lg:justify-start mt-6">
                                <button
                                    onClick={() => handleCount(item._id)}
                                    disabled={user?.email === item.adder.email || (item.upVoters && item.upVoters.includes(user?.email))}
                                    className="btn bg-gray-200 hover:bg-gray-300 rounded-l-full px-3 py-2"
                                >
                                    <p className="flex items-center">
                                        <BiUpvote className="text-xl" /> Upvote
                                    </p>
                                </button>
                                <div className="flex items-center bg-gray-200 ml-2 rounded-r-full px-5  py-2">
                                    <p className="">{item.upVote}</p>
                                </div>
                                <button className="btn  mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" >Report</button>
                            </div>
                            {/* review form */}
                            <div>
                                <ReviewForm item={item}></ReviewForm>
                            </div>
                        </div>


                    </div>
                    <div className="hidden lg:block lg:w-1/2" style={{
                        clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)'
                    }}>
                        <div className="h-full object-cover" style={{
                            backgroundImage: `url(${item.productPhoto})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}>
                            <div className="h-full bg-black opacity-25"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review section  */}
            <div>

            </div>
        </div>
    );
};

export default ProductDetails;