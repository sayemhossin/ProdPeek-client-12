// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Swiper.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

import border from '../../../assets/cupon-devider.png'





const Coupon = () => {

    const axiosPublic = useAxiosPublic()


    const { data: coupons = [] } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/coupon')
            return data
        }
    })




    return (
        <div className=''>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {
                    coupons.map(coupon => <SwiperSlide
                        style={{
                            borderRadius: '15px',
                            overflow: 'hidden'
                        }} className='rounded-full bg-gradient-to-r from-cyan-700 to-blue-800 ' key={coupon._id}>


                        <div className='flex md:gap-7'>
                            <div className='bg-yellow-500  rounded-r-full'>
                                <p className='text-xl md:text-5xl font-bold flex p-5 md:p-10 flex-col md:gap-6 justify-center h-[120px] md:h-[200px]'><span className='text-3xl md:text-6xl pr7'>${coupon.amount}</span> <span>OFF</span></p>
                            </div>
                            <div className='h-[120px] md:h-[200px] text-gray-200 md:p-5 p-1 md:space-y-4'>
                                <p className='text-2xl md:text-4xl text-yellow-300 font-bold '>{coupon.code}</p>
                                <p className='text-xs md:text-[17px] '>{coupon.description}</p>
                                <p className='md:text-[16px]'>Expire date: {coupon.date}</p>
                            </div>
                        </div>

                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Coupon;