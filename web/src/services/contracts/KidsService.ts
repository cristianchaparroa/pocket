import {createWalletClient, custom, getContract} from "viem";
import {scrollSepolia} from "viem/chains";
import pocketContractABI from "../../generated/Pocket.abi.json";
import {publicClient} from "./client.ts";
import {POCKET_CONTRACT_ADDRESS} from "./constants.ts";


class KidsService {
    private contract: any;
    private readonly walletClient: any;

    constructor() {
        this.walletClient = createWalletClient({
            chain: scrollSepolia,
            transport: custom(window.ethereum!),
        });

        this.contract = getContract({
            address: POCKET_CONTRACT_ADDRESS,
            abi: pocketContractABI,
            client: {
                public: publicClient,
                wallet: this.walletClient,
            }
        });
    }

    getParentAddress = async (phoneNumber:string) => {
        return await this.contract.read.getParentAddress([phoneNumber]);
    }


}

export default KidsService;
