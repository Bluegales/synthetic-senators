// Import ethers from Hardhat package
import readline from "readline";

const {ethers} = require("hardhat");

async function main() {
  const contractABI = [
    "function getProposalAdvise(string memory proposal, uint proposalId) public returns (uint)",
    "function advises(uint) public view returns (string)"
  ];

  if (!process.env.ADVISOR_CONTRACT_ADDRESS) {
    throw new Error("ADVISOR_CONTRACT_ADDRESS env variable is not set.");
  }

  const contractAddress = process.env.ADVISOR_CONTRACT_ADDRESS;
  const [signer] = await ethers.getSigners();

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // The proposal that advise should be generated for
  const message = await getUserInput();

  // Call the startChat function
  const transactionResponse = await contract.getProposalAdvise(message, 0);
  const receipt = await transactionResponse.wait();
  console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
  console.log(`Proposal advise on message: "${message}"`);

  // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
  let lastResponse = await contract.advises(0);
  let newResponse = lastResponse;

  // print w/o newline
  console.log("Waiting for response: ");
  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    newResponse = await contract.advises(0);
    console.log(newResponse);
  }

  // console.log(`Advise given: ${newResponse}`)

}

async function getUserInput(): Promise<string | undefined> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer)
      })
    })
  }

  try {
    const input = await question("Enter a proposal: ")
    rl.close()
    return input
  } catch (err) {
    console.error('Error getting user input:', err)
    rl.close()
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });