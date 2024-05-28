import React, { useEffect, useState } from 'react';

interface Person {
  id: number;
  name: string;
  description: string;
}

const DAODetails: React.FC<{ daoName: string, onPersonSelect: () => void }> = ({ daoName, onPersonSelect }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch('/persons.json');
      const persons = await response.json();
      setPersons(persons);
    };
    fetchPersons();
  }, []);

  return (
    <section>
      <h1>{daoName}</h1>
      <div className="people-list">
        {persons.map((person) => (
          <div key={person.id} className="person-card" onClick={onPersonSelect}>
            <img src={`https://picsum.photos/100/100?random=${person.id + 3}`} alt={person.name} />
            <p>{person.name}</p>
            <p>{person.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DAODetails;
