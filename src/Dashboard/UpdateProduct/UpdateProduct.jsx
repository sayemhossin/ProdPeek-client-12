import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProduct = () => {
    const { user } = useAuth();
    const item = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const tags = form.tags.value;
        const description = form.description.value;
        const link = form.link.value;
        const image = form.productImage.files[0];

        let productPhoto = item.productPhoto;

        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            try {
                const { data: productImage } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
                productPhoto = productImage.data.display_url;
            } catch (err) {
                console.log(err);
                toast.error(err.message);
                return;
            }
        }

        const allInfo = {
            productName,
            tags,
            description,
            link,
            productPhoto,
        };

        try {
            await axiosSecure.put(`/product/${item._id}`, allInfo);
            toast.success('Updated Successfully');
            navigate('/dashboard/myProduct');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-blue-50 lg:m-16 p-5 lg:p-10 space-y-5">
                <div className="text-center text-3xl font-bold">Update The Product</div>
                <div className="flex gap-3 pb-10">
                    <img width={100} src={user.photoURL} alt="" />
                    <div>
                        <h2>{user?.displayName}</h2>
                        <h2>{user?.email}</h2>
                    </div>
                </div>
                <div>
                    <div>
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" name="productName" defaultValue={item.productName} placeholder="Product Name" className="w-full h-14 p-4" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">External Links</span>
                        </label>
                        <input type="text" name="link" defaultValue={item.link} placeholder="Links If Have" className="w-full h-14 p-4" />
                    </div>
                    <div className="md:flex justify-around">
                        <div>
                            <label className="label">
                                <span className="label-text">Current Product Image</span>
                            </label>
                            <img width={100} src={item.productPhoto} alt="Current Product" className="max-w-sm" />
                            <label className="label mt-4">
                                <span className="label-text">Update Product Image</span>
                            </label>
                            <input type="file" name="productImage" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Tags</span>
                            </label>
                            <input type="text" name="tags" defaultValue={item.tags} placeholder="#Tags" className="w-full h-14 p-4" required />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea type="text" name="description" defaultValue={item.description} placeholder="Description" className="w-full h-20 p-4" required />
                </div>
                <div className="text-end">
                    <button className="btn px-16 text-xl bg-blue-400 hover:bg-blue-600" type="submit">Update Now</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
