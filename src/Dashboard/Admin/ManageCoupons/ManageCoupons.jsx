import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageCoupons = () => {

    const axiosSecure = useAxiosSecure()


    const { data: coupons = [], refetch } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/coupon')
            return data
        }
    })





    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target

        const code = form.code.value.toUpperCase().replace(/\s+/g, '');
        const date = form.date.value
        const description = form.description.value
        const amount = parseInt(form.amount.value)
        const allInfo = { code, date, description, amount }

        await axiosSecure.post('/coupon', allInfo)
        try {
            toast.success('Coupon code Added Successfully')
            refetch()
            form.reset()
        } catch (error) {
            toast.error(error.message)
        }

    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/coupon/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coupon has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }







    return (
        <div className=" p-5">
            <form onSubmit={handleSubmit} className="bg-gray-300 p-8 m-32">
                <div className="grid  grid-cols-2 gap-10 ">
                    <div>
                        <label className="label">
                            <span className="label-text">Coupon Code</span>
                        </label>
                        <input type="text" name="code" placeholder="Code Name" className="w-full h-14 p-4" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Expiry Date</span>

                        </label>
                        <input type="date" name="date" placeholder="Expiry Date" className="w-full h-14 p-4" required />

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name="description" placeholder="Description" className="w-full h-14 p-4" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Discount Amount</span>

                        </label>
                        <input type="number" name="amount" placeholder="Discount Amount" className="w-full h-14 p-4" required />

                    </div>
                </div>
                <div className="text-end ">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
            {/* all coupon  */}
            <div>
                <h1 className="text-3xl font-bold text-center">All Coupon</h1>

                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Coupon Code </th>
                                    <th>Expiry Date</th>
                                    <th>Discount Amount</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coupons.map((coupon, idx) => <tr key={coupon._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{coupon.code}</td>
                                        <td>{coupon.date}</td>
                                        <td>${coupon.amount}</td>
                                        <td><Link to={`/dashboard/coupon/${coupon._id}`}><button className="btn">Update</button></Link></td>
                                        <td><button onClick={() => handleDelete(coupon._id)} className="btn">Delete</button></td>



                                    </tr>)
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageCoupons;