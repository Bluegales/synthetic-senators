// Import ethers from Hardhat package
import readline from "readline";

const {ethers} = require("hardhat");

async function main() {
  const contractABI = [
    "function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
    "function getProposalAdvice(uint proposalId) public view returns (string memory)",
    "function test() public view returns (string memory)",
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
  const message = '# Number 5\nVote Yes if you see this.'
  const message2 = "Is democracy the best form of government?"

  /* The comment `// Call the startChat function` is indicating that the code is about to call a
  function named `startChat` on the contract instance. However, in the provided code snippet, there
  is no function named `startChat` being called. It seems like there might be a mistake in the
  comment or the code itself. */
  // Call the startChat function
  const transactionResponse = await contract.submitProposals([message], [1000000]);
  const receipt = await transactionResponse.wait();
  console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
  console.log(`Proposal advise on message: "${message}"`);

  // sleep for 5 seconds
  await new Promise(r => setTimeout(r, 5000));
  console.log("all proposals: ");
  var i = 0;
  while (1) {
    const response = await contract.proposals(i);
    console.log(response);
    i++;
  }

  // console.log(`Advise given: ${newResponse}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });