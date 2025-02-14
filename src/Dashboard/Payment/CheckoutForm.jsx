import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const totalPrice = 15;


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
 
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
            toast.error(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            toast.error(confirmError.message)
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)


                // now save the payment in the database
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'

                }
                const res = await axiosSecure.post('/payments', payment)

                if (res.data?.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for your payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/profile')
                }
            }
        }
    }









    return (
        <form className="md:p-20 space-y-4 p-10 shadow-lg " onSubmit={handleSubmit}>
            <CardElement
                className=" bg-blue-100 shadow-lg  rounded-lg h-16 p-6 max-w-lg"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div>
                <label className="label">
                    <span className="label-text text-xl font-semibold">Coupon Code</span>
                </label>
                <input type="text" name="" placeholder="Coupon Code If You Have" className="bg-blue-50 shadow-lg  rounded-lg h-16 p-6 w-full" />
            </div>

            <button className="btn px-6 bg-blue-500 text-xl  mt-8 ml-[75%]  flex" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">
                {error}
            </p>
            {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;