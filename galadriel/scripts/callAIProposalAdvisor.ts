const {ethers} = require("hardhat");

async function main() {
  const contractABI = [
    "function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
    "function getProposalAdvice(uint proposalId) public view returns (string memory)",
    "function getProposalCount() public view returns (uint256)",
    {
      "inputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
        },
        {
        "internalType": "string",
        "name": "description",
        "type": "string"
        },
        {
        "internalType": "string",
        "name": "summarizedDescription",
        "type": "string"
        },
        {
        "internalType": "string",
        "name": "advice",
        "type": "string"
        },
        {
        "internalType": "uint256",
        "name": "iteration",
        "type": "uint256"
        },
        {
        "internalType": "bool",
        "name": "isVoted",
        "type": "bool"
        },
        {
        "internalType": "bool",
        "name": "isResolved",
        "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  if (!process.env.ADVISOR_CONTRACT_ADDRESS) {
    throw new Error("ADVISOR_CONTRACT_ADDRESS env variable is not set.");
  }

  const contractAddress = process.env.ADVISOR_CONTRACT_ADDRESS;
  const [signer] = await ethers.getSigners();

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // The proposal that advise should be generated for
  const message = 'Do you think that the DAO should take out 500k from the treasury to do a community event?'

  // Submit the proposal to the advisor
  const transactionResponse = await contract.submitProposals([message], [420]);
  const receipt = await transactionResponse.wait();
  console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
  console.log(`Proposal advise on message: "${message}"`);

  // get the number of proposals
  const proposalCount = await contract.getProposalCount();

  // sleep for 5 seconds to allow the advisor to give advice
  await new Promise(r => setTimeout(r, 5000));

  // log all proposals + advice into the console
  console.log("all proposals: ");
  var i = 0;
  while (i < proposalCount) {
    const response = await contract.proposals(i);
    console.log(response);
    i++;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });