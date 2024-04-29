import './App.css'
import '@rainbow-me/rainbowkit/styles.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {QueryClientProvider, QueryClient,} from "@tanstack/react-query";
import config from "./services/contracts/config.ts";

import HomePage  from './pages/Home';
import KidsPage  from './pages/Kids';
import FundsPage from './pages/Funds';
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/parents/',
        element: <HomePage />,
    },
    {
        path: '/parents/kids',
        element: <KidsPage />,
    },
    {
        path: '/parents/funds',
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
