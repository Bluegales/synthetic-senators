// import React, { useEffect, useState } from 'react';

// interface DAO {
//   id: number;
//   name: string;
// }

// const DAOSelection: React.FC<{ onSelectDAO: (dao: DAO) => void }> = ({ onSelectDAO }) => {
//   const [daos, setDaos] = useState<DAO[]>([]);

//   useEffect(() => {
//     const fetchDaos = async () => {
//       const response = await fetch('/daos.json');
//       const daos = await response.json();
//       setDaos(daos);
//     };
//     fetchDaos();
//   }, []);

//   return (
//     <section>
//       <h1>Select a DAO</h1>
//       <div className="dao-cards">
//         {daos.map((dao) => (
//           <div key={dao.id} className="dao-card" onClick={() => onSelectDAO(dao)}>
//             <img src={`https://picsum.photos/200/200?random=${dao.id}`} alt={dao.name} />
//             <p>{dao.name}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default DAOSelection;

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
    <section>
      <h1>Select a DAO</h1>
      <div className="dao-cards flex gap-4 items-center">
        {daos.length > 0 ? (
          daos.map((dao) => (
            <div key={dao.id} className="dao-card p-4 border border-gray-300 cursor-pointer w-52" onClick={() => onSelectDAO(dao)}>
              <img src={`https://picsum.photos/200/200?random=${dao.id}`} alt={dao.name} />
              <p>{dao.name}</p>
            </div>
          ))
        ) : (
          <p>No DAOs available</p>
        )}
      </div>
    </section>
  );
};

export default DAOSelection;


