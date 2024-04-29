import defaultIcon from '/person-circle-icon.png';
import { menuProps } from '../constants';
import  {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {useAccount} from "wagmi";
import Navbar from '../../components/Navbar';
import {KidType} from '../../models/Kid';

import PocketService from "../../services/contracts/PocketService.ts";
import Modal from "../../components/Modal.tsx";
import {Link} from "react-router-dom";


const KidsPage = () => {
    /** Wallet account logged */
    const {isConnected, address} = useAccount();

    /** Service used to interact with pocket contract */
    const pocketService  = new PocketService(address);

    const [kids, setKids] = useState<KidType[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [names, setNames] = useState("");
    const [phone, setPhone] = useState("");
    const [kidBalance, setKidBalance] = useState("");

    const [hashTransaction, setHashTransaction] = useState("");

    useEffect(() => {
        if (isConnected) {
            pocketService.getKids().then( (list) => {
                setKids(list);
            });
        }
    }, [kids]);


    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    const changeName = (event) => {
        setNames(event.target.value);
    }

    const changePhone = (event) => {
        setPhone(event.target.value);
    }

    const changeKidBalance = (event) => {
        setKidBalance(event.target.value);
    }

    const handleAddKid = () => {
        const identifier = uuidv4();
        pocketService.addKid(identifier, names, phone, kidBalance).then( hash => {
           setHashTransaction(hash);
        });
    }

    return (
        <div className="w-auto">
            <Navbar {...menuProps} />
            <button
                onClick={handleOpenModal}
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
                    dark:focus:ring-purple-900">Add Kid
            </button>

            <div className="m-10 flex flex-col justify-center items-center">
                {kids.length > 0 && (
                    <div>List of kids </div>
                )}

                {kids.length > 0 ? (
                        kids.map((kid, index) => (
                                <div key={index} className="flex flex-row max-w-xl p-5">
                                    <img className="w-8 h-8 mr-5" src={defaultIcon}/>
                                     {kid.names} - {kid.phoneNumber} - {kid.allocatedFunds}
                                </div>
                        ))
                    ) :
                    <div className="w-auto bg-cyan-100 min-h-10">
                        Add kids with who share the pocket funds
                    </div>
                }
            </div>
            {isOpenModal && (
                <Modal
                    title="Add a Kid"
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                >
                    <div className="min-w-96 h-auto flex flex-col justify-between items-center space-y-6">
                        <input
                            type="text"
                            onChange={changeName}
                            placeholder="name of your kid"
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
                            type="text"
                            onChange={changePhone}
                            placeholder="phone of the kid"
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
                            type="text"
                            onChange={changeKidBalance}
                            placeholder="allocated balance"
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
                            onClick={handleAddKid}
                            disabled={hashTransaction != ""}
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
                        >Add
                        </button>

                        {hashTransaction && (
                            <div>
                                <Link className="custom-link"
                                      to={`https://sepolia.scrollscan.dev/tx/${hashTransaction}`}>
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


export default KidsPage;
