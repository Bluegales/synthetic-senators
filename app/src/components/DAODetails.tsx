// import React, { useEffect, useState } from 'react';

// interface Person {
//   id: number;
//   name: string;
//   description: string;
// }

// const DAODetails: React.FC<{ daoName: string, onPersonSelect: () => void }> = ({ daoName, onPersonSelect }) => {
//   const [persons, setPersons] = useState<Person[]>([]);

//   useEffect(() => {
//     const fetchPersons = async () => {
//       const response = await fetch('/persons.json');
//       const persons = await response.json();
//       setPersons(persons);
//     };
//     fetchPersons();
//   }, []);

//   return (
//     <section>
//       <h1>{daoName}</h1>
//       <div className="people-list">
//         {persons.map((person) => (
//           <div key={person.id} className="person-card" onClick={onPersonSelect}>
//             <img src={`https://picsum.photos/100/100?random=${person.id + 3}`} alt={person.name} />
//             <p>{person.name}</p>
//             <p>{person.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default DAODetails;

import React, { useEffect, useState } from 'react';
import { Person } from '../types';

const DAODetails: React.FC<{ daoName: string, onPersonSelect: () => void }> = ({ daoName, onPersonSelect }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch('/data/persons.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const persons = await response.json();
        setPersons(persons);
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    };
    fetchPersons();
  }, []);

  return (
    <section>
      <h1>{daoName}</h1>
      <div className="people-list flex gap-4 items-center">
        {persons.length > 0 ? (
          persons.map((person) => (
            <div key={person.id} className="person-card p-4 border border-gray-300 cursor-pointer w-52" onClick={onPersonSelect}>
              <img src={`https://picsum.photos/100/100?random=${person.id + 3}`} alt={person.name} />
              <p>{person.name}</p>
              <p>{person.description}</p>
            </div>
          ))
        ) : (
          <p>No persons available</p>
        )}
      </div>
    </section>
  );
};

export default DAODetails;

