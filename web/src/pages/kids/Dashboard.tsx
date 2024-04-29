import { useLocation } from 'react-router-dom';
import KidsService from "../../services/contracts/KidsService.ts";
import {useEffect, useState} from "react";
import {formatEther} from "viem";
import Modal from "../../components/Modal.tsx";
import kids from "../parents/Kids.tsx";

const KidsDashboard = () => {
    const kidsService = new KidsService();
    const location = useLocation();
    const {parentAddress, phoneNumber} = location.state;
    const [isKidConnected, setIsKidConnected] = useState(false);
    const [kid, setKid] = useState();
    const [isTransferOpen, setIsTransferOpen] = useState(false);
    const [toPhoneNumber, setToPhoneNumber] = useState("");
    const [amountToTransfer, setAmountToTransfer] = useState("");

    useEffect(() => {
        kidsService.getKid(parentAddress, phoneNumber).then( k => {
            k.allocatedFunds = formatEther(k.allocatedFunds);
            setIsKidConnected(true);
            setKid(k);
        })
    }, [isKidConnected]);


    const handleTransferClose = ()  => {
        setIsTransferOpen(false);
    }

    const handleTransferOpen = () => {
        setIsTransferOpen(true);
    }

    const doTransfer = () => {
        kidsService.transfer(phoneNumber, toPhoneNumber, amountToTransfer).then( r => {
            console.error("----> successfully transaction", r);
        }).catch(e => {
            console.error("---> failed", e);
        })
    }

    const changeToPhone = (event) => {
        setToPhoneNumber(event.target.value);
    }

    const changeAmountToTransfer = (event) => {
        setAmountToTransfer(event.target.value);
    }

    return (
        <div>
            <div>
                Kid Dashboard
                {isKidConnected && (
                    <div>
                        <div>Name: {kid.names}</div>
                        <div>Balance: {kid.allocatedFunds} ETH</div>

                        <button
                            onClick={handleTransferOpen}
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
                                dark:focus:ring-purple-900
                                disabled:bg-gray-600
                                disabled:hover:bg-gray-700
                                "
                        >Transfer
                        </button>
                    </div>

                )}
            </div>

            <div>
                {isTransferOpen && (
                    <Modal title="Transfer ETH"
                           isOpen={isTransferOpen}
                           onClose={handleTransferClose}>
                        <div className="min-w-96 flex flex-col justify-center items-center space-y-6">
                            <input
                                onChange={changeToPhone}
                                type="text"
                                placeholder="Phone number to transfer"
                                className="
                                w-full
                                rounded-md
                                border
                                border-gray-300
                                px-3 py-2
                                text-gray-700
                                focus:outline-none
                                focus:ring-1
                                focus:ring-blue-500"
                            />

                            <input
                                onChange={changeAmountToTransfer}
                                type="text"
                                placeholder="Amount to transfer"
                                className="
                                w-full
                                rounded-md
                                border
                                border-gray-300
                                px-3 py-2
                                text-gray-700
                                focus:outline-none
                                focus:ring-1
                                focus:ring-blue-500"
                            />

                            <button
                                onClick={doTransfer}
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
                                dark:focus:ring-purple-900
                                disabled:bg-gray-600
                                disabled:hover:bg-gray-700
                                "
                            >Transfer
                            </button>

                        </div>
                    </Modal>
                )}
            </div>
        </div>

    )
}

export default KidsDashboard;
