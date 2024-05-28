// import React, { useState } from 'react';

// const Navbar: React.FC = () => {
//   const [isWalletConnected, setIsWalletConnected] = useState(false);

//   const handleWalletSignin = () => {
//     alert('Wallet signed in!');
//     setIsWalletConnected(true);
//   };

//   return (
//     <nav className="navbar flex justify-between p-4 bg-gray-800 text-white">
//       <div className="logo text-xl">Logo Placeholder</div>
//       {isWalletConnected ? (
//         <div className="wallet-info flex items-center space-x-2">
//           <span>daotik.eth</span> <span>🟢</span>
//         </div>
//       ) : (
//         <div className="wallet-signin cursor-pointer" onClick={handleWalletSignin}>Wallet Connect</div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();

  return (
    <nav className="navbar flex justify-between p-4 bg-gray-800 text-white">
      <div className="logo text-xl">Logo Placeholder</div>
      <button onClick={() => open()} className="wallet-signin cursor-pointer">Wallet Connect</button>
    </nav>
  );
};

export default Navbar;
