import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-6">
        <Link to="/" className="text-2xl font-bold">DAOtik AIwar</Link>
        {/* Use the Web3Modal button component */}
        <w3m-button />
      </div>
    </nav>
  );
};

export default Navbar;
