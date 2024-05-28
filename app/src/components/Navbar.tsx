import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <Link to="/" className="logo text-2xl font-bold">DAOtik AIwar</Link>
            {/* Use the Web3Modal button component */}
            <w3m-button />
    </nav>
  );
};

export default Navbar;
