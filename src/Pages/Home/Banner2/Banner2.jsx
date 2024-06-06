
const Banner2 = () => {
    return (
        <div style={{
            backgroundImage: 'url(https://i.ibb.co/m94n62R/bigstock-Man-Hiking-Success-Silhouette-66753607.jpg)',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundPosition: 'center',
        }} className=" bg-fixed flex items-center justify-center h-[572px] p-3 md:p-10 ">
            <div className='flex flex-col justify-center items-center text-center h-[200px] md:h-[333.67px] bg-blue-200 w-[1096px]'>
            <h1 className='text-3xl md:text-5xl font-semibold'>ProdPeak</h1>
            <p  className="text-[12px] md:text-[16px] font-semibold text-gray-500 mt-2 lg:w-[900px] mx-auto">Unveil the Future of Tech and Innovation with ProdPeak! Explore groundbreaking products, cutting-edge tools, and game-changing ideas right at your fingertips. Join our vibrant community of visionaries and creators, and be at the forefront of what is next. Elevate your journey with ProdPeak today!</p>
            </div>
        </div>
    );
};

export default Banner2;