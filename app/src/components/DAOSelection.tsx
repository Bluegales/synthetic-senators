import React, { useEffect, useState } from 'react';

interface DAO {
  id: number;
  name: string;
}

const DAOSelection: React.FC<{ onSelectDAO: (dao: DAO) => void }> = ({ onSelectDAO }) => {
  const [daos, setDaos] = useState<DAO[]>([]);

  useEffect(() => {
    const fetchDaos = async () => {
      const response = await fetch('/daos.json');
      const daos = await response.json();
      setDaos(daos);
    };
    fetchDaos();
  }, []);

  return (
    <section>
      <h1>Select a DAO</h1>
      <div className="dao-cards">
        {daos.map((dao) => (
          <div key={dao.id} className="dao-card" onClick={() => onSelectDAO(dao)}>
            <img src={`https://picsum.photos/200/200?random=${dao.id}`} alt={dao.name} />
            <p>{dao.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DAOSelection;
