import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import DAOSelection from '../components/DAOSelection';
import DAODetails from '../components/DAODetails';
import AIInteraction from '../components/AIInteraction';
import { DAO, Person } from '../types';

const Home: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isPersonSelected, setIsPersonSelected] = useState(false);

  const handleDAOSelect = (dao: DAO) => {
    setSelectedDAO(dao);
  };

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
    setIsPersonSelected(true);
  };

  const handleBackToDAOSelection = () => {
    setSelectedDAO(null);
    setSelectedPerson(null);
    setIsPersonSelected(false);
  };

  const handleBackToDAODetails = () => {
    setIsPersonSelected(false);
    setSelectedPerson(null);
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
              <h1 className="text-5xl font-bold mb-4">Welcome to MahatmAI GandhDAO!</h1>
              <p className="text-xl font-semibold mb-4">Simplify Your DAO Voting</p>
              <p className="text-lg mb-4">Are you tired of constantly having to vote on proposals? Let our advanced AI agents handle it for you. At MahatmAI GandhDAO, we make DAO voting effortless and efficient.</p>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gradient">Why Choose MahatmAI GandhDAO?</h2>
                <ul className="list-inside">
                  <li className="text-lg mb-2"><b>Automated Voting:</b><br /> Our AI agents analyze proposals and cast votes on your behalf, saving you time and effort.</li>
                  <li className="text-lg mb-2"><b>Intelligent Decision-Making:</b><br /> Leveraging cutting-edge AI, our agents make informed decisions based on your preferences and guidelines.</li>
                  <li className="text-lg mb-2"><b>Seamless Integration:</b><br /> Easily integrate with your existing DAO platforms and enjoy a hassle-free voting experience.</li>
                  <li className="text-lg mb-2"><b>Customizable Preferences:</b><br /> Set your voting preferences and let our AI agents take care of the rest.</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img src="images/mahatmai-min.png" alt="Placeholder" width="400px" className="rounded-lg shadow-md" />
              </div>
            </section>

            <section className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gradient">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <img src="images/step1.png" alt="Step 1" className="mb-4" width="200px" />
                  <h3 className="text-xl font-bold mb-2">Step 1</h3>
                  <p className="text-lg">Connect your Wallet</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="images/step2.png" alt="Step 2" className="mb-4" width="200px" />
                  <h3 className="text-xl font-bold mb-2">Step 2</h3>
                  <p className="text-lg">Select DAO</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="images/step3.png" alt="Step 3" className="mb-4" width="200px" />
                  <h3 className="text-xl font-bold mb-2">Step 3</h3>
                  <p className="text-lg">Select AI Agent</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="images/step4.png" alt="Step 4" className="mb-4" width="200px" />
                  <h3 className="text-xl font-bold mb-2">Step 4</h3>
                  <p className="text-lg">Delegate your voice to MahatmAI GandhDAO</p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <>
            {!selectedDAO && <DAOSelection onSelectDAO={handleDAOSelect} />}
            {selectedDAO && !isPersonSelected && (
              <DAODetails dao={selectedDAO} onPersonSelect={handlePersonSelect} onBack={handleBackToDAOSelection} />
            )}
            {isPersonSelected && selectedDAO && selectedPerson && (
              <AIInteraction dao={selectedDAO} person={selectedPerson} onBack={handleBackToDAODetails} />
            )}
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
