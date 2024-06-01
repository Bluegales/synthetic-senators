// Import ethers from Hardhat package
import readline from "readline";

const {ethers} = require("hardhat");

async function main() {
  const contractABI = [
    "function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
    "function getProposalAdvice(uint proposalId) public view returns (string memory)",
    "function test() public view returns (string memory)"
  ];

  if (!process.env.ADVISOR_CONTRACT_ADDRESS) {
    throw new Error("ADVISOR_CONTRACT_ADDRESS env variable is not set.");
  }

  const contractAddress = process.env.ADVISOR_CONTRACT_ADDRESS;
  const [signer] = await ethers.getSigners();

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // The proposal that advise should be generated for
  const message = "# Test Proposal 2\n"
  const message2 = "Is democracy the best form of government?"

  /* The comment `// Call the startChat function` is indicating that the code is about to call a
  function named `startChat` on the contract instance. However, in the provided code snippet, there
  is no function named `startChat` being called. It seems like there might be a mistake in the
  comment or the code itself. */
  // Call the startChat function
  const transactionResponse = await contract.submitProposals([message, message2], [0,1]);
  const receipt = await transactionResponse.wait();
  console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
  console.log(`Proposal advise on message: "${message2}"`);

  // // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
  let lastResponse = await contract.getProposalAdvice(0);
  let newResponse = lastResponse;

  // print w/o newline
  console.log("Waiting for response: ");
  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    newResponse = await contract.getProposalAdvice(0);
    console.log(newResponse);
  }

  // console.log(`Advise given: ${newResponse}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });