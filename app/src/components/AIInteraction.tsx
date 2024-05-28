import React from 'react';

const AIInteraction: React.FC = () => {
  const handleDelegate = () => {
    alert('Delegation initiated!');
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
      <div className="chatbot mb-6 p-4 bg-white rounded-lg shadow-md">
        <p>Chatbot conversation here...</p>
      </div>
      <div className="last-proposal p-4 bg-white rounded-lg shadow-md">
        <p>Last Proposal Content</p>
      </div>
    </section>
  );
};

export default AIInteraction;
