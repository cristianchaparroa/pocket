import { useEffect } from 'react';

import pocketHomeImage from '/home-image.png';
import { CustomRedirectButton } from '../components/CustomRedirectButton';
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const {isConnected } = useAccount()

    useEffect( () => {
        if (isConnected) {
            navigate("/kids")
        }
    })

    return (
        <div>
            <div className="mt-20 flex space-x-4 flex-row justify-center items-center">
                <img className="w-72" src={pocketHomeImage} alt="Home logo" />
            </div> 

            <div className="flex-column space-y-5">
                <h1 className="text-3xl pt-20">Pocket</h1>
                <h2 className="text-slate-700">for parents</h2>
            </div>

            <div className="mt-10 w-auto h-auto flex space-x-4 flex-row justify-center items-center">
                <div className="
                    w-full 
                    bg-violet-800 
                    p-3
                    text-white
                    "
                > 
                    <CustomRedirectButton/>
                </div>
            </div> 
        </div>
    );
}

export default HomePage;
