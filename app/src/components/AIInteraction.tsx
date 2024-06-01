import React, { useState } from 'react';
import Modal from './Modal';
import SuccessModal from './SuccessModal';
import { DAO, Person } from '../types';

const AIInteraction: React.FC<{ dao: DAO, person: Person, onBack: () => void }> = ({ dao, person, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelegate = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  
  const handleConfirm = async () => {
    setIsModalOpen(false);

    try {
      // Simulate API call
      const response = await fetch('/api/delegate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ daoId: dao.id, personId: person.id }),
      });

      if (!response.ok) {
      // if (response.ok) { //comment this out to always get the modal
        throw new Error('Delegation failed');
      }

      setIsSuccessModalOpen(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Delegation failed. Please try again.');
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <section className="p-8 w-5/6 max-w-screen-lg mx-auto mt-24">
      <div className="ai-header flex justify-between items-center mb-6">
        <img src={person.image} alt={person.name} className="rounded-full shadow-md" width="300px" />
        <div className="ai-description flex-grow pl-4">
          <h2 className="text-2xl font-bold mb-4">{person.name}</h2>
          <p className="text-lg mb-4">{person.description}</p>
          <button
            className="delegate-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelegate}
          >
            Delegate
          </button>
        </div>
      </div>
      <div className="chatbot mb-6 p-4 bg-slate-200 rounded-lg shadow-md text-slate-900 w-full">
        <p>Chatbot conversation here...</p>
      </div>
      <div className="last-proposal p-4 bg-slate-200 rounded-lg shadow-md text-slate-900 w-full">
        <h3 className="text-xl font-bold mb-2">Last Proposal</h3>
        <p>Last Proposal Content</p>
      </div>
      <br />
      <button className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onBack}>Back</button>
      
      {isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Delegate">
        <p>Are you sure you want to delegate your vote to the AI agent?</p>
        <div className="mt-4 flex justify-end">
          <button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Confirm
          </button>
          <button onClick={handleCloseModal} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal>

      <SuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} message="Delegation successful!" />
    </section>
  );
};

export default AIInteraction;
