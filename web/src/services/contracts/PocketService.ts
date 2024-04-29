import {createWalletClient, custom, formatEther, getContract, parseEther} from 'viem'
import {publicClient} from './client'
import pocketContractABI from '../../generated/Pocket.abi.json';
import {scrollSepolia} from "viem/chains";

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
            address: '0x1D89Fc691D317F273Ce3DA13265e186BFae21571',
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
}

export default PocketService;
