// import React, { useState, useEffect } from 'react';
// import { useAccount } from 'wagmi';
// import DAOSelection from '../components/DAOSelection';
// import DAODetails from '../components/DAODetails';
// import AIInteraction from '../components/AIInteraction';
// import { DAO } from '../types';

// const Home: React.FC = () => {
//   const { address, isConnected } = useAccount();
//   const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);
//   const [isPersonSelected, setIsPersonSelected] = useState(false);

//   const handleDAOSelect = (dao: DAO) => {
//     setSelectedDAO(dao);
//   };

//   const handlePersonSelect = () => {
//     setIsPersonSelected(true);
//   };

//   const handleBackToDAOSelection = () => {
//     setSelectedDAO(null);
//     setIsPersonSelected(false);
//   };

//   const handleBackToDAODetails = () => {
//     setIsPersonSelected(false);
//   };

//   useEffect(() => {
//     // Handle state changes based on wallet connection
//   }, [isConnected]);

//   return (
//     <main className="p-8 bg-gray-100 min-h-screen">
//       {!isConnected ? (
//         <section id="home" className="text-center max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold mb-6">Welcome to DAOtik AIwar</h1>
//           <p className="text-lg mb-4">DAO Voting made easy. Tired of having to vote for proposals? Make AI agents do the work for you.</p>
//           <p className="text-lg mb-4">Our platform provides seamless integration with your favorite DAOs, allowing AI to handle routine voting tasks.</p>
//           <p className="text-lg mb-4">Join now and experience the future of decentralized governance with AI-powered solutions.</p>
//           <img src="https://via.placeholder.com/600x400" alt="Placeholder" className="mx-auto my-8 rounded shadow-md" />
//           <img src="https://via.placeholder.com/600x400" alt="Placeholder" className="mx-auto my-8 rounded shadow-md" />
//         </section>
//       ) : (
//         <>
//           {!selectedDAO && <DAOSelection onSelectDAO={handleDAOSelect} />}
//           {selectedDAO && !isPersonSelected && (
//             <DAODetails daoName={selectedDAO.name} onPersonSelect={handlePersonSelect} onBack={handleBackToDAOSelection} />
//           )}
//           {isPersonSelected && <AIInteraction onBack={handleBackToDAODetails} />}
//         </>
//       )}
//     </main>
//   );
// };

// export default Home;

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
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow p-8 bg-gray-100">
      {!isConnected ? (
        <section id="home" className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to DAOtik AIwar</h1>
          <p className="text-lg mb-4">DAO Voting made easy. Tired of having to vote for proposals? <br></br> Make AI agents do the work for you</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">No More Absent Votes</h2>
              <p className="text-lg mb-4">Have the AI Vote for you, based on your</p>
              <img src="https://picsum.photos/400/300?random=1" alt="Placeholder" className="rounded-lg shadow-md mb-4" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">No More Absent Votes</h2>
              <p className="text-lg mb-4">Have the AI Vote for you, based on your</p>
              <img src="https://picsum.photos/400/300?random=2" alt="Placeholder" className="rounded-lg shadow-md mb-4" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">No More Absent Votes</h2>
              <p className="text-lg mb-4">Have the AI Vote for you, based on your</p>
              <img src="https://picsum.photos/400/300?random=3" alt="Placeholder" className="rounded-lg shadow-md mb-4" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">No More Absent Votes</h2>
              <p className="text-lg mb-4">Have the AI Vote for you, based on your</p>
              <img src="https://picsum.photos/400/300?random=4" alt="Placeholder" className="rounded-lg shadow-md mb-4" />
            </div>
          </div>
        </section>
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
      {/* <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full">
        Made with 🍻
      </footer> */}
    </div>
  );
};

export default Home;
