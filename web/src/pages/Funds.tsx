import Navbar from "../components/Navbar";
import { menuProps } from "./constants";
import {useState} from "react";
import Modal from "../components/Modal.tsx";
import PocketService from "../services/contracts/PocketService.ts";
import {useAccount} from "wagmi";


const FundsPage = () => {
    const account = useAccount();
    const pocketService  = new PocketService(account);
    const [isFundsOpen, setIsFundsOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    const changeFunds = (event) => {
        setAmount(event.target.value);
    }

    const handleDeposit = ()=> {
        console.error(amount);
        const transaction = pocketService.deposit(amount);
        console.error(transaction);
    }

    const handleFundsOpenModal = () => {
        setIsFundsOpen(true);
    }

    const handleFundsCloseModal = () => {
        setIsFundsOpen(false);
    }

    return (
        <div>
            <Navbar{...menuProps} />
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
                    <div className="min-w-80 flex flex-column justify-between items-center space-x-6">
                        <input
                            onChange={changeFunds}
                            type="number"
                            placeholder="Deposit funds"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            className="w-full bg-purple-700 text-white hover:bg-purple-700 focus:outline-none"
                            onClick={handleDeposit}
                        >Add</button>
                    </div>
                </Modal>
            )}

        </div>
    );
}

export default FundsPage;
