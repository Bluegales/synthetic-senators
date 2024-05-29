import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-5/6 left-1/2 transform -translate-x-1/2 shadow-md shadow-gray-700 py-6 z-50 rounded-xl">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-4xl font-bold px-4 text-gradient">DAOtik AIwar</Link>
        <div className="px-4">
          <w3m-button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
