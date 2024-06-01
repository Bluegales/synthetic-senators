import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Modal from './Modal';
import SuccessModal from './SuccessModal';
import { DAO, Person } from '../types';
import advisorContractABI from '../abis/advisorContractABI';
import config from '../config.json';

const AIInteraction: React.FC<{ dao: DAO, person: Person, onBack: () => void }> = ({ dao, person, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [advice, setAdvice] = useState<string>('');
  const [advicePositive, setAdvicePositive] = useState<boolean>(false);
  const [instruction, setInstruction] = useState<string>("");
  const [proposalDescription, setProposalDescription] = useState<string>('');

  let contract: ethers.Contract | null = null;

  try {
    const contractAddress = person.contractAddress;
    const provider = new ethers.providers.JsonRpcProvider(config.galadrielRpcUrl);
    contract = new ethers.Contract(contractAddress, advisorContractABI, provider);
  } catch (error) {
    console.error('Error initializing contract:', error);
    setErrorMessage('Failed to initialize contract. Please check the contract address and provider URL.');
    setIsError(true);
  }

  const getLastProposalData = async () => {
    if (!contract) return { advice: 'Failed to fetch advice due to contract initialization error.', description: 'Failed to fetch proposal description.' };
    try {
      let proposalId = await contract.getProposalCount();
      if (proposalId == 0) {
        return { advice: 'Error: No proposals', description: 'Error: No proposals' };
      } else {
        proposalId -= 1;
      }
      const proposalData = await contract.proposals(proposalId);
      return { advice: proposalData.advice, description: proposalData.description };
    } catch (error) {
      console.error('Error fetching proposal data:', error);
      return { advice: 'Failed to fetch advice.', description: 'Failed to fetch proposal description.' };
    }
  };

  const getInstruction = async () => {
    if (!contract) return { instruction: 'Failed to get instruction'};
    try {
      const instruction = await contract.instruction();
      return { instruction };
    } catch (error) {
      console.error('Error fetching proposal data:', error);
      return { instruction: 'Failed to get instruction'};
    }
  };

  useEffect(() => {
    const fetchProposalData = async () => {
      const { advice, description } = await getLastProposalData();
      setProposalDescription(description);
      {
        const words = advice.split(' ');
        const lastWord = words[words.length - 1];
        if (lastWord === 'Y') {
          setAdvicePositive(true);
          words.pop();
        } else if (lastWord === 'N') {
          setAdvicePositive(false);
          words.pop();
        }
        setAdvice(words.join(' '));
      }
    };

    const fetchInstruction = async () => {
      const instruction = await getInstruction();
      setInstruction(instruction.instruction); 
    }

    fetchProposalData();
    fetchInstruction();
  }, [contract]);

  const handleDelegate = () => {
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
        <h3 className="text-xl font-bold mb-2">Instruction</h3>
        <p>{instruction}</p>
      </div>
      <div className="last-proposal p-4 bg-slate-200 rounded-lg shadow-md text-slate-900 w-full">
        <h3 className="text-xl font-bold mb-2">Last Proposal</h3>
        <p>{proposalDescription}</p>
        <div className={`p-4 rounded-lg ${advicePositive ? 'bg-green-500' : 'bg-red-500'}`}>
          {advice}
        </div>
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
