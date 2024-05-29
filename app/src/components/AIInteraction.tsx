import React, { useState } from 'react';
import Modal from './Modal';
import SuccessModal from './SuccessModal';

const AIInteraction: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelegate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const handleConfirm = () => {
    setIsModalOpen(false);

    // Delegation issue simulation. Set to false for failed, true for success
    const delegationSuccessful = true; 

    if (delegationSuccessful) {
      setIsSuccessModalOpen(true);
    } else {
      setIsError(true);
      setErrorMessage('Delegation failed. Please try again.');
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <section className="p-8">
      <div className="ai-header flex justify-between items-center mb-6">
        <img src="https://picsum.photos/100/100?random=6" alt="AI Image" className="rounded-full shadow-md" />
        <div className="ai-description flex-grow pl-4">
          <p className="text-lg mb-4">Description</p>
          <button
            className="delegate-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelegate}
          >
            Delegate
          </button>
        </div>
      </div>
      <div className="chatbot mb-6 p-4 bg-slate-200 rounded-lg shadow-md text-slate-900 w-2/3">
        <p>Chatbot conversation here...</p>
      </div>
      <div className="last-proposal p-4 bg-slate-200 rounded-lg shadow-md text-slate-900 w-2/3">
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

