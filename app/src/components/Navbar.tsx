import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <div className="logo text-xl font-bold">DAOtik AIwar</div>
            {/* Use the Web3Modal button component */}
            <w3m-button />
    </nav>
  );
};

export default Navbar;
