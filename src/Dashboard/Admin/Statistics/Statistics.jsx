import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdReviews } from "react-icons/md";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Helmet } from "react-helmet-async";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/statistics');
            return data;
        },
    });

    // Ensure that the stats object has default values to avoid undefined values
    const { totalPrice = 0, totalUsers = 0, totalReviews = 0, totalProducts = 0 } = stats;

    const data = [
        { name: 'Revenue', value: totalPrice },
        { name: 'Users', value: totalUsers },
        { name: 'Reviews', value: totalReviews },
        { name: 'Products', value: totalProducts },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {value}
            </text>
        );
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="md:p-8">
            <Helmet>
                <title>Dashboard | Statistics</title>
            </Helmet>
            <div className="stats w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-primary-content">
                <div className="stat">
                    <div className="stat-title flex items-center gap-5 md:text-2xl font-bold text-gray-100 md:mb-6">
                        <FaCircleDollarToSlot /> Revenue
                    </div>
                    <div className="md:stat-value text-xl font-bold mt-3 text-center">${totalPrice}</div>
                </div>
                <div className="stat">
                    <div className="stat-title flex items-center gap-5 md:text-2xl font-bold text-gray-100 md:mb-6">
                        <FaUsers /> Users
                    </div>
                    <div className="md:stat-value text-xl font-bold mt-3 text-center">{totalUsers}</div>
                </div>
                <div className="stat">
                    <div className="stat-title flex items-center gap-5 md:text-2xl font-bold text-gray-100 md:mb-6">
                        <AiFillProduct /> Products
                    </div>
                    <div className="md:stat-value text-xl font-bold mt-3 text-center">{totalProducts}</div>
                </div>
                <div className="stat">
                    <div className="stat-title md:text-2xl flex items-center gap-5 font-bold text-gray-100 md:mb-6">
                        <MdReviews /> Reviews
                    </div>
                    <div className="md:stat-value text-xl font-bold mt-3 text-center">{totalReviews}</div>
                </div>
            </div>
            <div className="w-full h-[600px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend formatter={(value, entry) => `${entry.payload.name}: ${entry.payload.value}`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
