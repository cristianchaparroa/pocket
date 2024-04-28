import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {scrollSepolia} from 'wagmi/chains';
import {QueryClientProvider, QueryClient,} from "@tanstack/react-query";

import HomePage  from './pages/Home';
import KidsPage  from './pages/Kids'; 
import FundsPage from './pages/Funds';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'pocket',
    projectId: '71d8c3310f0fb3c0788d5a4b6582820e',
    chains: [scrollSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/kids',
        element: <KidsPage />,
    },
    {
        path: '/funds',
        element:  <FundsPage />
    }
]);

const App = () => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                   <RouterProvider router={router}>
                        {/* Your application routes and components */}
                    </RouterProvider> 
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
);
};

export default App
