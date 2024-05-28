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

import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Web3ModalProvider from './components/Web3ModalProvider';

const App: React.FC = () => {
  return (
    <Web3ModalProvider>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </Web3ModalProvider>
  );
};

export default App;
