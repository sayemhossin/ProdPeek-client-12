import Banner from "../Banner/Banner";
import Coupon from "../Coupon/Coupon";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import TrendingProduct from "../TrendingProduct/TrendingProduct";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <h1 className="text-4xl text-center font-bold mt-5 mb-5">Featured Product</h1>
            <FeaturedProduct></FeaturedProduct>
            <h1 className="text-4xl text-center font-bold mt-5 mb-5">Trending Product</h1>
            <TrendingProduct></TrendingProduct>
            <Coupon></Coupon>
        </div>
    );
};

export default Home;