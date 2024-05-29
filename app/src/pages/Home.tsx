import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import DAOSelection from '../components/DAOSelection';
import DAODetails from '../components/DAODetails';
import AIInteraction from '../components/AIInteraction';
import { DAO } from '../types';

const Home: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);
  const [isPersonSelected, setIsPersonSelected] = useState(false);

  const handleDAOSelect = (dao: DAO) => {
    setSelectedDAO(dao);
  };

  const handlePersonSelect = () => {
    setIsPersonSelected(true);
  };

  const handleBackToDAOSelection = () => {
    setSelectedDAO(null);
    setIsPersonSelected(false);
  };

  const handleBackToDAODetails = () => {
    setIsPersonSelected(false);
  };

  useEffect(() => {
    // Handle state changes based on wallet connection
  }, [isConnected]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-slate-200">
      <main className="flex-grow pt-32 w-5/6 max-w-6xl mx-auto">
        {!isConnected ? (
          <div className="w-full">
            <section className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-4">Welcome to DAOtik AIwar!</h1>
              <p className="text-xl font-semibold mb-4">Simplify Your DAO Voting</p>
              <p className="text-lg mb-4">Are you tired of constantly having to vote on proposals? Let our advanced AI agents handle it for you. At DAOtik AIwar, we make DAO voting effortless and efficient.</p>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gradient">Why Choose DAOtik AIwar?</h2>
                <ul className="list-inside">
                  <li className="text-lg mb-2"><b>Automated Voting:</b><br></br> Our AI agents analyze proposals and cast votes on your behalf, saving you time and effort.</li>
                  <li className="text-lg mb-2"><b>Intelligent Decision-Making:</b><br></br> Leveraging cutting-edge AI, our agents make informed decisions based on your preferences and guidelines.</li>
                  <li className="text-lg mb-2"><b>Seamless Integration:</b><br></br> Easily integrate with your existing DAO platforms and enjoy a hassle-free voting experience.</li>
                  <li className="text-lg mb-2"><b>Customizable Preferences:</b><br></br> Set your voting preferences and let our AI agents take care of the rest.</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img src="https://picsum.photos/400/300" alt="Placeholder" className="rounded-lg shadow-md" />
              </div>
            </section>

            <section className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gradient">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Step 1" className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Step 1</h3>
                  <p className="text-lg">Connect your Wallet</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Step 2" className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Step 2</h3>
                  <p className="text-lg">Select DAO</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Step 3" className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Step 3</h3>
                  <p className="text-lg">Select AI Agent</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Step 4" className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Step 4</h3>
                  <p className="text-lg">Delegate your voice to DAOtik AIwar</p>
                </div>
              </div>
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Learn more</button>
            </section>

            <section className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gradient">Works with the DAOs you love</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Logo 1" className="w-20 h-20 mb-4" />
                  <p className="text-lg font-semibold">Nouns</p>
                  <p className="text-sm text-gray-600">Lorem Ipsum and some stuff.</p>
                  <a href="#" className="text-blue-600 hover:underline">See it in action</a>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Logo 2" className="w-20 h-20 mb-4" />
                  <p className="text-lg font-semibold">ENS</p>
                  <p className="text-sm text-gray-600">Lorem Ipsum and some stuff.</p>
                  <a href="#" className="text-blue-600 hover:underline">See it in action</a>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Logo 3" className="w-20 h-20 mb-4" />
                  <p className="text-lg font-semibold">Fluence</p>
                  <p className="text-sm text-gray-600">Lorem Ipsum and some stuff.</p>
                  <a href="#" className="text-blue-600 hover:underline">See it in action</a>
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://picsum.photos/100/100" alt="Logo 4" className="w-20 h-20 mb-4" />
                  <p className="text-lg font-semibold">PretzlDAO</p>
                  <p className="text-sm text-gray-600">Lorem Ipsum and some stuff.</p>
                  <a href="#" className="text-blue-600 hover:underline">See it in action</a>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <>
            {!selectedDAO && <DAOSelection onSelectDAO={handleDAOSelect} />}
            {selectedDAO && !isPersonSelected && (
              <DAODetails daoName={selectedDAO.name} onPersonSelect={handlePersonSelect} onBack={handleBackToDAOSelection} />
            )}
            {isPersonSelected && <AIInteraction onBack={handleBackToDAODetails} />}
          </>
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        Made with 🍻 for HackFS 2024
      </footer>
    </div>
  );
};

export default Home;
