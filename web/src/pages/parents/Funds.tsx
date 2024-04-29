import './Funds.css';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import { menuProps } from "../constants";
import {useEffect, useState} from "react";
import Modal from "../../components/Modal.tsx";
import PocketService from "../../services/contracts/PocketService.ts";
import {useAccount} from "wagmi";

const FundsPage = () => {
    /** Wallet account logged */
    const {isConnected, address} = useAccount();

    /** Service used to interact with pocket contract */
    const pocketService  = new PocketService(address);

    /** isFundsOpen is a state to know if we should open the Deposit modal */
    const [isFundsOpen, setIsFundsOpen] = useState(false);

    /** amount is the value captured in the Deposit modal used to add founds for kids */
    const [amount, setAmount] = useState("");

    /** Kids funds are the funds that the parent sent to the pocket contract */
    const [kidsFunds, setKidsFunds] = useState("");

    const [hashResults, setHashResults] = useState("");

    /** changeFunds is the function in charge to listen when a value is set in the funds input in the Modal */
    const changeFunds = (event) => {
        setAmount(event.target.value);
    }

    /** handleDeposit will send funds from the parent account to the contract on the Modal dialog*/
    const handleDeposit = ()=> {
        pocketService.deposit(amount).then(hash => {
            setHashResults(hash);
        });
    }

    /** handleFundsOpenModal is called on click the button add funds and will show the Modal to add funds */
    const handleFundsOpenModal = () => {
        setIsFundsOpen(true);
    }

    const handleFundsCloseModal = () => {
        setIsFundsOpen(false);
        setHashResults("");
    }


    useEffect(() => {
        pocketService.getBalance().then( (value) => {
            setKidsFunds(value);
        });
    }, []); // Dependency array

    return (
        <div>
            <Navbar{...menuProps} />

            <div className="m-10 text-center text-lg">
                {kidsFunds ? (
                    <div>
                        Funds available to share with your kids: {kidsFunds} ETH
                    </div>
                ) : <div>Funds for kids: ... </div>}
            </div>
            <button
                onClick={handleFundsOpenModal}
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

            {isFundsOpen && (
                <Modal
                    title="Deposit funds"
                    isOpen={isFundsOpen}
                    onClose={handleFundsCloseModal}>
                    <div
                        className="min-w-96 h-auto flex flex-col justify-between items-center space-y-6">
                        <input
                            onChange={changeFunds}
                            type="number"
                            placeholder="Deposit funds"
                            disabled={hashResults != ""}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
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
                                "
                            onClick={handleDeposit}
                            disabled={hashResults != ""}
                        >Add</button>
                        {hashResults && (
                            <div>
                                <Link className="custom-link"  to={`https://sepolia.scrollscan.dev/tx/${hashResults}`}>
                                    Transaction successfully (click here)
                                </Link>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

        </div>
    );
}

export default FundsPage;
