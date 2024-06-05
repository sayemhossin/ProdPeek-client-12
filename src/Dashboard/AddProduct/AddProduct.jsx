import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const AddProduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { mutateAsync } = useMutation({
        mutationFn: async (allInfo) => {
            const { data } = await axiosPublic.post(`/product`, allInfo);
            return data;
        },
        onSuccess: () => {
            toast.success('Data saved successfully. Wait for admin approval');
            navigate('/dashboard/myProduct');
        }
    });

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['user', user.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/${user.email}`);
            return data;
        }
    });
    console.log(userInfo)

    if (isLoading) {
        return <LoadingSpinner />;
    }

    let ms = Date.now();
    const currentDate = new Date(ms);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();


console.log(userInfo)


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.status !== 'verified' && userInfo.length >= 1) {
          return toast.error('Go to the profile section and subscribe now to add more data');
            
        }

        const form = e.target;
        const productName = form.productName.value;
        const tags = form.tags.value;
        const description = form.description.value;
        const link = form.link.value;
        const image = form.productImage.files[0];
        const upVote = 0;
        const status = 'pending';
        const adder = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };
        const formData = new FormData();
        formData.append('image', image);

        try {
            const { data: productImage } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            const allInfo = {
                productName,
                tags,
                description,
                link,
                upVote,
                status,
                adder,
                date: ` ${day}/${month}/${year}`,
                productPhoto: productImage.data.display_url
            };
            await mutateAsync(allInfo);

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-blue-50 lg:m-16 p-5 lg:p-10 space-y-5">
                <div className="text-center text-3xl font-bold">Add New Product</div>
                <div className="flex gap-3 pb-10">
                    <img width={100} src={user.photoURL} alt="" />
                    <div>
                        <h2>{user?.displayName}</h2>
                        <h2>{user?.email}</h2>
                    </div>
                </div>
                <div className="">
                    <div>
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" name="productName" placeholder="Product Name" className="w-full h-14 p-4" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">External Links</span>
                        </label>
                        <input type="text" name="link" placeholder="Links If Have" className="w-full h-14 p-4" />
                    </div>
                    <div className="md:flex justify-around">
                        <div>
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input type="file" name="productImage" className="file-input file-input-bordered w-full max-w-xs" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Tags</span>
                            </label>
                            <input type="text" name="tags" placeholder="#Tags" className="w-full h-14 p-4" required />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea type="text" name="description" placeholder="Description" className="w-full h-20 p-4" required />
                </div>
                <div className="text-end">
                    <button className="btn px-16 text-xl bg-blue-400 hover:bg-blue-600" type="submit">Add Now</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
