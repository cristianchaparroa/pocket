import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {scrollSepolia} from "wagmi/chains";
import WalletConnectProjectID from "./constants.ts";

const config = getDefaultConfig({
    appName: 'pocket',
    projectId: WalletConnectProjectID,
    chains: [scrollSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
