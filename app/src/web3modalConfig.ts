
// export const projectId = '8a7f7aef4b5cfe2c2387efaea8d43f49'; // Replace with your actual project ID

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { QueryClient } from '@tanstack/react-query';
import { mainnet, arbitrum, optimism, baseSepolia, sepolia} from 'wagmi/chains';

export const queryClient = new QueryClient();
export const projectId = '8a7f7aef4b5cfe2c2387efaea8d43f49';

const metadata = {
  name: 'Synthetic Senators',
  description: 'DAO Voting made easy with AI agents',
  url: 'https://daotikaiwar.eth', 
  icons: ['https://daotikaiwar.eth/icon.png'],
};

const chains = [mainnet, arbitrum, optimism, baseSepolia, sepolia];
export const wagmiConfig = defaultWagmiConfig({
  chains: chains as any, 
  projectId,
  metadata,
});

createWeb3Modal({
  // themeMode: 'dark',
  wagmiConfig,
  projectId,
  enableAnalytics: true, 
  enableOnramp: true, 
});
