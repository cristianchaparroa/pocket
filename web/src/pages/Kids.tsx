import defaultIcon from '/person-circle-icon.png';
import Navbar from '../components/Navbar';
import { menuProps } from './constants';
import {useAccount} from "wagmi";
import PocketService from "../services/contracts/PocketService.ts";

const KidsPage = () => {
    /** Wallet account logged */
    const {isConnected, address} = useAccount();

    /** Service used to interact with pocket contract */
    const pocketService  = new PocketService(address);


    const kids = [
      {"name":"James", "ammount":"200k", "image":""} ,
      {"name": "Sophia", "ammount":"150K", "image":""},
    ];

    return (
        <div className="w-auto">
            <Navbar {...menuProps} />
            <div className="flex flex-col justify-center items-center">
                {
                    kids.map( (kid, index) => (
                        <div key={index} className="flex flex-row max-w-xl p-5">
                            <img className="w-8 h-8 mr-5" src={defaultIcon} />
                            {kid.name} - {kid.ammount}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


export default KidsPage;
