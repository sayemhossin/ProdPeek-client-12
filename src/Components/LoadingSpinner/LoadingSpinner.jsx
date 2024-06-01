import { TbFidgetSpinner } from "react-icons/tb";
const LoadingSpinner = ({ smallHeight }) => {
    return (
        <div
        className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
        flex 
        flex-col 
        justify-center 
        items-center `}
      >
        <TbFidgetSpinner className="animate-spin" size={100} color='#5BBCFF' />
      </div>
    );
};

export default LoadingSpinner;