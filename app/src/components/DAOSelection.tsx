import React, { useEffect, useState } from 'react';
import { DAO } from '../types';

const DAOSelection: React.FC<{ onSelectDAO: (dao: DAO) => void }> = ({ onSelectDAO }) => {
  const [daos, setDaos] = useState<DAO[]>([]);

  useEffect(() => {
    const fetchDaos = async () => {
      try {
        const response = await fetch('/data/daos.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const daos = await response.json();
        console.log(daos); // Add this line to check if daos are fetched
        setDaos(daos);
      } catch (error) {
        console.error('Error fetching DAOs:', error);
      }
    };
    fetchDaos();
  }, []);

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">Select a DAO</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {daos.map((dao) => (
          <div
            key={dao.id}
            className="dao-card p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectDAO(dao)}
          >
            <img src={`https://picsum.photos/200/200?random=${dao.id}`} alt={dao.name} className="rounded mb-4" />
            <p className="text-lg font-semibold">{dao.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DAOSelection;

