import Navbar from "../components/Navbar";
import { menuProps } from "./constants";

const FundsPage = () => {
    
    return (
        <div>
            <Navbar{...menuProps} />             
            <button 
                type="button" 
                className="
                    w-full
                    focus:outline-none 
                    text-white 
                    bg-purple-700 
                    hover:bg-purple-800 
                    font-medium 
                    rounded-lg 
                    text-sm 
                    px-5 
                    py-2.5 
                    mt-10 
                    mb-6
                    dark:bg-purple-600 
                    dark:hover:bg-purple-700 
                    dark:focus:ring-purple-900">Add funds</button>
        </div>
    );
}

export default FundsPage;
