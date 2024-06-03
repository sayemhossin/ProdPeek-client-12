import { useState } from 'react'; // Import useState hook

import useAuth from "../../hooks/useAuth";

const ReviewForm = ({ item }) => {
    const { user } = useAuth();

    // State to hold the value of the select box
    const [rating, setRating] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const reviewer_name = user?.displayName;
        const reviewer_image = user?.photoURL;
        const product_id = item._id;
        const description = form.description.value;

        // Use the rating state value
        console.log(reviewer_image, reviewer_name, product_id, description, rating);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-200 w-full mb-5 mt-5 p-5 py-16">
            <div className='text-center font-bold text-xl'>
                <p>Share Your Thoughts</p>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea type="text" name="description" placeholder="description" className="w-full h-20  p-4" required />
            </div>
            <div className='flex justify-evenly  mt-5'>
                
                <select onChange={handleRatingChange} value={rating} className="select w-sm" required>
                    <option disabled selected>Rating</option>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                </select>
                <button className="btn" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default ReviewForm;
