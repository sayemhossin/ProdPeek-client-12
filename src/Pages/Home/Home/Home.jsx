import Banner from "../Banner/Banner";
import Banner2 from "../Banner2/Banner2";
import Coupon from "../Coupon/Coupon";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import TrendingProduct from "../TrendingProduct/TrendingProduct";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="bg-gray-300 p-3 pb-10">
            <div className="text-center md:mb-20 mb-10">
                <h1  className="text-2xl mt-10 md:text-5xl md:mt-20   font-bold text-blue-900">Featured Products</h1>
                <p  className="text-[12px] md:text-[16px] font-semibold text-gray-500 mt-2 lg:w-[900px] mx-auto">Discover our Featured Product  a revolutionary smart home assistant. Enhance your daily life with seamless voice commands and a sleek touch interface. Control lights, climate, and security effortlessly. Stay updated with real-time notifications and streamline your home management. Experience ultimate convenience and connectivity.</p>
            </div>
            <FeaturedProduct></FeaturedProduct>
            </div>



            <Banner2></Banner2>


          <div style={{
            backgroundImage:'url(https://i.ibb.co/8481Pj8/vC0uxM.jpg)',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundPosition: 'center',
            padding: '10px',
          }}>
          <div className="text-center md:mb-20 mb-10">
                <h1 className="text-2xl mt-10 md:text-5xl md:mt-20   font-bold text-blue-900">Trending Products</h1>
                <p  className="text-[12px] md:text-[16px] font-semibold text-gray-500 mt-2 lg:w-[900px] mx-auto">Discover our Trending Product: a smart home assistant with intuitive voice commands and a sleek touch interface. Effortlessly control lighting, climate, and security while staying updated with real-time notifications. Experience ultimate convenience and enhanced connectivity in your home.</p>
            </div>
            <TrendingProduct></TrendingProduct>
          </div>
            <Coupon></Coupon>
        </div>
    );
};

export default Home;