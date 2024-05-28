import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <Link to="/" className="logo text-xl font-bold">DAOtik AIwar</Link>
            {/* Use the Web3Modal button component */}
            <w3m-button />
    </nav>
  );
};

export default Navbar;
