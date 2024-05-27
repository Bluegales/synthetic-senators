document.addEventListener("DOMContentLoaded", function() {
    const walletSignin = document.getElementById("wallet-signin");
    const walletInfo = document.getElementById("wallet-info");
    const homeSection = document.getElementById("home");
    const daoSelectionSection = document.getElementById("dao-selection");
    const daoCardsContainer = document.getElementById("dao-cards");
    const daoDetailsSection = document.getElementById("dao-details");
    const daoName = document.getElementById("dao-name");
    const peopleListContainer = document.getElementById("people-list");
    const aiInteractionSection = document.getElementById("ai-interaction");
  
    const loadDaos = async () => {
      const response = await fetch('daos.json');
      const daos = await response.json();
      daos.forEach(dao => {
        const daoCard = document.createElement('div');
        daoCard.className = 'dao-card';
        daoCard.innerHTML = `
          <img src="https://picsum.photos/200/200?random=${dao.id}" alt="${dao.name}">
          <p>${dao.name}</p>
        `;
        daoCard.addEventListener('click', () => {
          daoName.textContent = dao.name;
          daoSelectionSection.classList.add('hidden');
          daoDetailsSection.classList.remove('hidden');
          loadPersons();
        });
        daoCardsContainer.appendChild(daoCard);
      });
    };
  
    const loadPersons = async () => {
      const response = await fetch('persons.json');
      const persons = await response.json();
      peopleListContainer.innerHTML = '';
      persons.forEach(person => {
        const personCard = document.createElement('div');
        personCard.className = 'person-card';
        personCard.innerHTML = `
          <img src="https://picsum.photos/100/100?random=${person.id + 3}" alt="${person.name}">
          <p>${person.name}</p>
          <p>${person.description}</p>
        `;
        personCard.addEventListener('click', () => {
          daoDetailsSection.classList.add('hidden');
          aiInteractionSection.classList.remove('hidden');
        });
        peopleListContainer.appendChild(personCard);
      });
    };
  
    walletSignin.addEventListener('click', function() {
      alert('Wallet signed in!');
      walletSignin.classList.add('hidden');
      walletInfo.classList.remove('hidden');
      homeSection.classList.add('hidden');
      daoSelectionSection.classList.remove('hidden');
    });
  
    loadDaos();
  
    const delegateButton = document.querySelector(".delegate-button");
    delegateButton.addEventListener("click", function() {
      alert("Delegation initiated!");
    });
    
  });
  