import pocketHomeImage from '/home-image.png';
import KidsService from "../../services/contracts/KidsService.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/Modal.tsx";

const KidsHomePage = () => {
    const navigate = useNavigate();
    const kidsService = new KidsService();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const changePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleConnect = () => {
        kidsService.getParentAddress(phoneNumber).then(address => {
            navigate("/kids/dashboard", { state: { parentAddress: address, phoneNumber: phoneNumber } });
        }).catch( e => {
            setIsConnected(false);
            setIsModalOpen(true);
        })
    }

    return (
        <div>
            <div className="mt-20 flex space-x-4 flex-row justify-center items-center">
                <img className="w-72" src={pocketHomeImage} alt="Home logo" />
            </div>

            <div className="flex-column space-y-5">
                <h1 className="text-3xl pt-20">Pocket</h1>
                <h2 className="text-slate-700">for Kids</h2>
            </div>

            <div className="m-10">
                <input
                    onChange={changePhoneNumber}
                    type="text"
                    placeholder="phone number"
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
                    onClick={handleConnect}
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
                >Connect
                </button>
            </div>

            {isModalOpen && (
                <Modal
                    title="Error"
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                >
                    <div>
                        You are not allowed to connect.
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default KidsHomePage;
