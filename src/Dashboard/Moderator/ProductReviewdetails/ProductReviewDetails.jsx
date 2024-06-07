
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const ProductReviewDetails = () => {
    const item = useLoaderData()

    return (
        <div className="flex bg-gray-200 items-center justify-center h-full flex-col border-4">
            <Helmet>
                <title>Dashboard | Review details</title>
            </Helmet>
            <div className="flex justify-center">
                <img src={item.productPhoto} alt="" />
            </div>
            <div className="text-center mt-8">
                <h2 className="text-3xl font-bold text-gray-800 md:text-5xl">{item.productName}</h2>
                <p className="mt-2 text-sm text-gray-500 md:text-xl">{item.tags}</p>
                <p className="mt-2 text-sm text-gray-500 md:text-xl">{item.description}</p>
                <p className="mt-2 text-sm text-blue-600  md:text-xl">{item.link}</p>

            </div>
        </div>




    );
};

export default ProductReviewDetails;