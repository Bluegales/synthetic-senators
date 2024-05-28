import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletSignin = () => {
    alert('Wallet signed in!');
    setIsWalletConnected(true);
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo Placeholder</div>
      {isWalletConnected ? (
        <div className="wallet-info">
          <span>daotik.eth</span> <span>🟢</span>
        </div>
      ) : (
        <div className="wallet-signin" onClick={handleWalletSignin}>Wallet Connect</div>
      )}
    </nav>
  );
};

export default Navbar;
