import {createWalletClient, custom, formatEther, getContract, parseEther} from 'viem'
import {publicClient} from './client'
import pocketContractABI from '../../generated/Pocket.abi.json';
import {scrollSepolia} from "viem/chains";
import {KidType} from "../../models/Kid.ts";

const ContractAddress = '0xcd969f53BfA5Ea1a49A47d9C870767d5eD56BB0B' as `0x($string)`;
class PocketService {
    private contract: any;
    private readonly walletClient: any;
    private accountAddress:any;

    constructor(address) {
        this.accountAddress = address;
        this.walletClient = createWalletClient({
            chain: scrollSepolia,
            transport: custom(window.ethereum!),
            account: this.accountAddress,
        });

        this.contract = getContract({
            address: '0xcd969f53BfA5Ea1a49A47d9C870767d5eD56BB0B',
            abi: pocketContractABI,
            client: {
                public: publicClient,
                wallet: this.walletClient,
            }
        });
    }

    /**
     * Deposit will send Eth from the parent wallet to the Pocket Contract
     * */
    deposit = async (amount: string) => {
        return await this.contract.write.deposit([], {value: parseEther(amount)});
    }

    /**
     * Get funds retrieves the amount send to contract by the parent
     * */
    getBalance = async ():Promise<string> => {
        const balance = await this.contract.read.getBalance([this.accountAddress]);
        return formatEther(balance);
    }

    /**
     * Get kids associated to the parent
     * */
    getKids = async (): Promise<KidType[]> => {
        return await this.contract.read.getKids([this.accountAddress]);
    }

    /**
     * Add a new kid associated to parent wallet
     * */
    addKid = async (identifier: string, names: string) => {
        return await this.contract.write.addKid([identifier, names]);
    }

}

export default PocketService;
