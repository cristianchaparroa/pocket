import { useLocation } from 'react-router-dom';
import KidsService from "../../services/contracts/KidsService.ts";
import {useEffect, useState} from "react";
import {formatEther} from "viem";

const KidsDashboard = () => {
    const kidsService = new KidsService();
    const location = useLocation();
    const {parentAddress, phoneNumber} = location.state;
    const [isKidConnected, setIsKidConnected] = useState(false);
    const [kid, setKid] = useState();

    useEffect(() => {
        kidsService.getKid(parentAddress, phoneNumber).then( k => {
            k.allocatedFunds = formatEther(k.allocatedFunds);
            console.error(k);
            setIsKidConnected(true);
            setKid(k);
        })
    }, [isKidConnected]);

    return (
        <div>
            Kid Dashboard
            {isKidConnected && (
                <div>
                    <div>Name: {kid.names}</div>
                    <div>Balance: {kid.allocatedFunds} ETH</div>
                </div>
            )}
        </div>
    )
}

export default KidsDashboard;
