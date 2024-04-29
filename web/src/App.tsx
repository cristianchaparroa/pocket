import './App.css'
import '@rainbow-me/rainbowkit/styles.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {QueryClientProvider, QueryClient,} from "@tanstack/react-query";
import config from "./services/contracts/config.ts";

import HomePage from './pages/Home';
import ParentsHomePage  from './pages/parents/Home.tsx';
import ParentsKidsPage  from './pages/parents/Kids.tsx';
import ParentsFundsPage from './pages/parents/Funds.tsx';
import KidsHomePage from "./pages/kids/Home.tsx";
import KidsDashboard from "./pages/kids/Dashboard.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/parents/',
        element: <ParentsHomePage />,
    },
    {
        path: '/parents/kids',
        element: <ParentsKidsPage />,
    },
    {
        path: '/parents/funds',
        element:  <ParentsFundsPage />
    },
    {
        path: '/kids',
        element: <KidsHomePage/>,
    },
    {
        path:'/kids/dashboard',
        element: <KidsDashboard/>,
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
