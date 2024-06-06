import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Review = ({ review }) => {
   


    return (
            <div className="">

                <div className="grid grid-cols-12 max-w-sm sm:max-w-full mx-auto">
                    <div className="col-span-12 lg:col-span-10 ">
                        <div className="sm:flex gap-6">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={review.reviewer_image || 'https://i.ibb.co/sgsSHth/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg' }  />
                                </div>
                            </div>
                            <div className="text">
                                <p className="font-medium text-lg leading-8 text-gray-900 mb-2">{review.reviewer_name}</p>


                                <p className="font-normal text-base leading-7 text-gray-400 mb-4 lg:pr-8">{review.description}</p>
                                <div className="flex items-center justify-between">
                                    <p
                                        className="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                                        {review?.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-span-12 lg:col-span-2 max-lg:hidden flex lg:items-center flex-row lg:flex-col justify-center max-lg:pt-6 ">
                        <div className="flex items-center gap-2 lg:justify-between w-full mb-5">
                            <Rating style={{ maxWidth: 250 }} value={review.rating_value}  />

                        </div>
                        <p className="font-medium text-lg leading-8 text-gray-400 lg:text-center whitespace-nowrap">{review?.date}</p>
                    </div>
                </div>
            </div>
    );
};

export default Review;