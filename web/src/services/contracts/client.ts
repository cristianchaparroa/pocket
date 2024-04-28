import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { scrollSepolia } from 'viem/chains'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import WalletConnectProjectID from "./constants.ts";

export const publicClient = createPublicClient({
    chain: scrollSepolia,
    transport: http(),
})

// eg: WalletConnect
const provider = await EthereumProvider.init({
    projectId: WalletConnectProjectID,
    showQrModal: true,
    chains: [1],
})

export const walletClientWC = createWalletClient({
    chain: scrollSepolia,
    transport: custom(provider),
})
