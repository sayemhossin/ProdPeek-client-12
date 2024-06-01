import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UpdateProduct = () => {
    const {user } = useAuth()
    const item = useLoaderData()

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    return (
        <div >

            <form onSubmit={handleSubmit} className="bg-blue-50 lg:m-16 p-5 lg:p-10 space-y-5">
                <div className="text-center text-3xl font-bold">Update The Product</div>
                <div className="flex gap-3 pb-10">
                    <img src={user.photoURL} alt="" />
                    <div>
                        <h2>{user?.displayName}</h2>
                        <h2>{user?.email}</h2>
                    </div>
                </div>
                <div>
                    <div >
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" name="productName" defaultValue={item.productName} placeholder="Product Name" className="w-full h-14 p-4" required />
                    </div>
                    <div >
                        <label className="label">
                            <span className="label-text">External Links </span>
                        </label>
                        <input type="text" name="link" defaultValue={item.link} placeholder="Links If Have" className="w-full h-14 p-4" />
                    </div>
                    <div className="md:flex justify-around">
                        <div>
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input type="file" name="productImage" className="file-input file-input-bordered file-input-primary w-full max-w-sm" required />
                        </div>
                        <div >
                            <label className="label">
                                <span className="label-text">Tags </span>
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