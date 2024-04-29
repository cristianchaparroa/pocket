import pocketHomeImage from '/home-image.png';
import {Link} from "react-router-dom";


const HomePage = () => {
    return (
        <div>
            <div className="mt-20 flex space-x-4 flex-row justify-center items-center">
                <img className="w-72" src={pocketHomeImage} alt="Home logo"/>
            </div>

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
                    dark:focus:ring-purple-900">
                <a href="/parents/"> For Parents </a>
            </button>

            <button
                type="button"
                className="
                    w-full
                    focus:outline-none
                    text-white
                    bg-cyan-400
                    hover:bg-cyan-800
                    font-medium
                    rounded-lg
                    text-sm
                    px-5
                    py-2.5
                    mt-10
                    mb-6
                    dark:bg-cyan-600
                    dark:hover:bg-cyan-700
                    dark:focus:ring-cyan-900">
                <a href="/kids/"> For Kids </a>
            </button>

        </div>
    );
}

export default HomePage;
