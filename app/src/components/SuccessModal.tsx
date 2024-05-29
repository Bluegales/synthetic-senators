import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-slate-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Success</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg">{message}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
