import React, { useState } from 'react';
import DAOSelection from '../components/DAOSelection';
import DAODetails from '../components/DAODetails';
import AIInteraction from '../components/AIInteraction';

const Home: React.FC = () => {
  const [selectedDAO, setSelectedDAO] = useState<DAO | null>(null);
  const [isPersonSelected, setIsPersonSelected] = useState(false);

  const handleDAOSelect = (dao: DAO) => {
    setSelectedDAO(dao);
  };

  const handlePersonSelect = () => {
    setIsPersonSelected(true);
  };

  return (
    <main>
      {!selectedDAO && <section id="home">
        <h1>Welcome to DAOtik AIwar.</h1>
        <p>DAO Voting made easy. Tired of having to vote for proposals? Make AI agents do the work for you</p>
      </section>}
      {!isPersonSelected && selectedDAO && <DAOSelection onSelectDAO={handleDAOSelect} />}
      {selectedDAO && !isPersonSelected && <DAODetails daoName={selectedDAO.name} onPersonSelect={handlePersonSelect} />}
      {isPersonSelected && <AIInteraction />}
    </main>
  );
};

export default Home;
