import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { FaCcVisa } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    return (
        <div className="h-full bg-gray-200">
            <Helmet>
                <title>Dashboard | Payment</title>
            </Helmet>
            <div>
                <h1 className="text-3xl md:text-5xl flex gap-5 pt-8 font-bold ml-9 text-blue-800"><FaCcVisa />Payment</h1>
            </div>
               <div className="bg-gray-50 mx-auto rounded-lg mt-[10%]  max-w-xl">
               <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
               </div>
        </div>
    );
};

export default Payment;