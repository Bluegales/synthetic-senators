// import './App.css';
// import React from 'react';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Navbar />
//       <Home />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    alert('Wallet signed in!'); // Add this line to confirm wallet connection
    setIsWalletConnected(true);
  };

  return (
    <div className="App">
      <Navbar onWalletConnect={handleWalletConnect} isWalletConnected={isWalletConnected} />
      <Home isWalletConnected={isWalletConnected} />
    </div>
  );
};

export default App;
