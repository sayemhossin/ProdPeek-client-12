import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateCoupon = () => {
    const coupon = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    console.log(coupon)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target

        const code = form.code.value.toUpperCase().replace(/\s+/g, '');
        const date = form.date.value
        const description = form.description.value
        const amount = parseInt(form.amount.value)
        const allInfo = { code, date, description, amount }

        await axiosSecure.put(`/coupon/${coupon?._id}`, allInfo)
        try {
            toast.success('Coupon code Updated Successfully')
            navigate('/dashboard/manageCoupons')
        } catch (error) {
            toast.error(error.message)
        }

    }





    return (
     <form onSubmit={handleSubmit} className="bg-gray-300 rounded-lg drop-shadow-2xl p-4 md:p-8 md:m-32">
        <div className="grid  md:grid-cols-2 gap-10 ">
            <div>
                <label className="label">
                    <span className="label-text">Coupon Code</span>
                </label>
                <input type="text" name="code" defaultValue={coupon?.code} placeholder="Code Name" className="w-full h-14 p-4" required />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Expiry Date</span>

                </label>
                <input type="date" name="date" defaultValue={coupon?.date} placeholder="Expiry Date" className="w-full h-14 p-4" required />

            </div>
            <div>
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input type="text" name="description" defaultValue={coupon?.description} placeholder="Description" className="w-full h-14 p-4" required />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Discount Amount</span>

                </label>
                <input type="number" name="amount" defaultValue={coupon?.amount} placeholder="Discount Amount" className="w-full h-14 p-4" required />

            </div>
        </div>
        <div className="text-end ">
            <button type="submit" className="btn hover:bg-blue-600 bg-blue-500 mt-8 mx-4 px-10">Update</button>
        </div>
    </form>
    );
};

export default UpdateCoupon;