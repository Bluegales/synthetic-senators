// import React, { useState } from 'react';
// import DAOSelection from '../components/DAOSelection';
// import DAODetails from '../components/DAODetails';
// import AIInteraction from '../components/AIInteraction';
// import { DAO } from '../types';

// const Home: React.FC = () => {
//   const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);
//   const [isPersonSelected, setIsPersonSelected] = useState(false);

//   const handleDAOSelect = (dao: DAO) => {
//     setSelectedDAO(dao);
//   };

//   const handlePersonSelect = () => {
//     setIsPersonSelected(true);
//   };

//   return (
//     <main>
//       {!selectedDAO && <section id="home">
//         <h1>Welcome to DAOtik AIwar.</h1>
//         <p>DAO Voting made easy. Tired of having to vote for proposals? Make AI agents do the work for you</p>
//       </section>}
//       {!isPersonSelected && selectedDAO && <DAOSelection onSelectDAO={handleDAOSelect} />}
//       {selectedDAO && !isPersonSelected && <DAODetails daoName={selectedDAO.name} onPersonSelect={handlePersonSelect} />}
//       {isPersonSelected && <AIInteraction />}
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

  useEffect(() => {
    // Handle state changes based on wallet connection
  }, [isConnected]);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      {!isConnected ? (
        <section id="home" className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to DAOtik AIwar</h1>
            <p className="text-lg mb-4">DAO Voting made easy. Tired of having to vote for proposals? Make AI agents do the work for you.</p>
            <p className="text-lg mb-4">Our platform provides seamless integration with your favorite DAOs, allowing AI to handle routine voting tasks.</p>
            <p className="text-lg mb-4">Join now and experience the future of decentralized governance with AI-powered solutions.</p>
            <img src="https://via.placeholder.com/600x400" alt="Placeholder" className="mx-auto my-8 rounded shadow-md" />
            <img src="https://via.placeholder.com/600x400" alt="Placeholder" className="mx-auto my-8 rounded shadow-md" />
        </section>
      ) : (
        <>
          {!selectedDAO && <DAOSelection onSelectDAO={handleDAOSelect} />}
          {selectedDAO && !isPersonSelected && <DAODetails daoName={selectedDAO.name} onPersonSelect={handlePersonSelect} />}
          {isPersonSelected && <AIInteraction />}
        </>
      )}
    </main>
  );
};

export default Home;
