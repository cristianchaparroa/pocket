import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {scrollSepolia} from 'wagmi/chains';
import {QueryClientProvider, QueryClient,} from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';


const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'pocket',
    projectId: '71d8c3310f0fb3c0788d5a4b6582820e',
    chains: [scrollSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const App = () => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    Pocket !!
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: 12,
                        }}
                    >
                        <ConnectButton/>
                    </div>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
);
};

export default App
