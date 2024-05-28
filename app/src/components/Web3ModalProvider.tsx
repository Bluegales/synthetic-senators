import React, { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, queryClient } from '../web3modalConfig';

interface Props {
  children: ReactNode;
}

const Web3ModalProvider: React.FC<Props> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
};

export default Web3ModalProvider;
