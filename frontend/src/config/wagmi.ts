import { http, createConfig } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = createConfig({
    chains: [base, baseSepolia, mainnet],
    connectors: [
        injected(),
        walletConnect({ projectId }),
        coinbaseWallet({ appName: 'DropIt' }),
    ],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
        [mainnet.id]: http(),
    },
});
