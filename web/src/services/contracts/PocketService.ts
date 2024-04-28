import {createWalletClient, custom, getContract, parseEther} from 'viem'
import {publicClient} from './client'
import pocketContractABI from '../../generated/Pocket.abi.json';
import {scrollSepolia} from "viem/chains";

class PocketService {
    private static instance: PocketService;
    private contract: any;
    private readonly walletClient: any;

    constructor(account) {
        this.walletClient = createWalletClient({
            chain: scrollSepolia,
            transport: custom(window.ethereum!),
            account: account.address,
        });

        this.contract = getContract({
            address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
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
    getFunds = async () => {
        return await this.contract.read.getFund([]);
    }
}

export default PocketService;
