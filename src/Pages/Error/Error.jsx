import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className=' justify-center flex items-center h-screen '>
        <div>
        <div>
             <img src="https://i.ibb.co/7pJn6m9/file-7.png" alt="" />
         </div>
         <div className="text-center">
             <Link to={'/'}><button className='btn btn-outline border-blue-600 hover:bg-blue-700 text-xl text-blue-800'><FaArrowLeft></FaArrowLeft> Go Back</button></Link>
         </div>
        </div>
     </div>
    );
};

export default Error;