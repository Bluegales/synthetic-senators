import React, { useEffect, useState } from 'react';
import { DAO, Person } from '../types';

const DAODetails: React.FC<{ dao: DAO, onPersonSelect: (person: Person) => void, onBack: () => void }> = ({ dao, onPersonSelect, onBack }) => {
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
    <section className="p-10 w-5/6 mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-6">{dao.name}</h1>
      <div> 
        <img src={`${dao.image}`} alt={dao.name} width="200px" className="rounded" />
        <br></br>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {persons.map((person) => (
          <div
            key={person.id}
            className="person-card p-4 bg-slate-700 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:shadow-slate-600 transition-shadow"
            onClick={() => onPersonSelect(person)}
          >
            <img src={`${person.image}`} alt={person.name} className="rounded mb-4" />
            <p className="text-lg font-semibold">{person.name}</p>
            <p className="text-sm">{person.description}</p>
          </div>
        ))}
      </div>
      <br />
      <button className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onBack}>Back</button>
    </section>
  );
};

export default DAODetails;
