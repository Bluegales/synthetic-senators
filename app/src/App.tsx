import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Web3ModalProvider from './components/Web3ModalProvider';

const App: React.FC = () => {
  return (
    <Web3ModalProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </Web3ModalProvider>
  );
};

export default App;
