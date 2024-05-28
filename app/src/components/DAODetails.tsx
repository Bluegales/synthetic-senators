import React, { useEffect, useState } from 'react';
import { Person } from '../types';

const DAODetails: React.FC<{ daoName: string, onPersonSelect: () => void, onBack: () => void }> = ({ daoName, onPersonSelect, onBack }) => {
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
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">{daoName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {persons.map((person) => (
          <div
            key={person.id}
            className="person-card p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onPersonSelect}
          >
            <img src={`https://picsum.photos/100/100?random=${person.id + 3}`} alt={person.name} className="rounded mb-4" />
            <p className="text-lg font-semibold">{person.name}</p>
            <p className="text-sm">{person.description}</p>
          </div>
        ))}
      </div>
      <br></br>
      <button className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onBack}>Back</button>
    </section>
  );
};

export default DAODetails;
