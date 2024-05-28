// import React from 'react';

// const AIInteraction: React.FC = () => {
//   const handleDelegate = () => {
//     alert('Delegation initiated!');
//   };

//   return (
//     <section>
//       <div className="ai-header">
//         <img src="https://picsum.photos/100/100?random=6" alt="AI Image" className="ai-image" />
//         <div className="ai-description">
//           <p>Description</p>
//           <button className="delegate-button" onClick={handleDelegate}>Delegate</button>
//         </div>
//       </div>
//       <div className="chatbot">
//         <p>Chatbot conversation here...</p>
//       </div>
//       <div className="last-proposal">
//         <p>Last Proposal Content</p>
//       </div>
//     </section>
//   );
// };

// export default AIInteraction;

import React from 'react';

const AIInteraction: React.FC = () => {
  const handleDelegate = () => {
    alert('Delegation initiated!');
  };

  return (
    <section>
      <div className="ai-header flex justify-between items-center">
        <img src="https://picsum.photos/100/100?random=6" alt="AI Image" className="ai-image" />
        <div className="ai-description flex-grow pl-4">
          <p>Description</p>
          <button className="delegate-button" onClick={handleDelegate}>Delegate</button>
        </div>
      </div>
      <div className="chatbot mt-4 p-4 border border-gray-300">
        <p>Chatbot conversation here...</p>
      </div>
      <div className="last-proposal mt-4 p-4 border border-gray-300">
        <p>Last Proposal Content</p>
      </div>
    </section>
  );
};

export default AIInteraction;
