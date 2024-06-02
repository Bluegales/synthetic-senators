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

  const proposals = [
    "Twitter Marketing: Should the SyntheticSenatorDAO use 500k dollars to give it to the Twitter Intern to create some dank memes?",
    "Proposal for Community Grant Program: We want to establish a community grant program that allocates a portion of the DAO’s treasury to fund innovative projects proposed by members. Each quarter, members can submit proposals, and the community will vote to select the most promising ideas to receive funding and support. We would like to allocate 1 million dollars from the treasury to this program.",
    "DAO-funded Moon Cheese Harvesting: We want 1 billion dollars from the treasury to start an exploration mission to the moon to confirm the long-standing theory that it's made of cheese and, if true, start a DAO-based cheese import business.",
    "24/7 Karaoke Livestream: We want to establish a 24/7 karaoke livestream where DAO members can only participate in meetings while singing their updates to the tune of popular songs.",
    "Educational Webinar Series: We would like to organize a series of educational webinars and workshops focusing on blockchain technology, decentralized finance (DeFi), and governance best practices. These sessions will be led by industry experts and aimed at enhancing the knowledge and skills of DAO members, fostering a more informed and capable community. We would like to allocate 500k dollars from the treasury to this initiative.",
  ]

  const proposalIds = [42, 69, 420, 1337, 21];

  const advisorAddresses = [
    "0x4fD1234741028Adc400f57e7320281ACbA5EA36E",
    "0xB65E1E617C01F8eB087B4657eAe688Ec66D0534E",
    "0xf25b4f014AEE385320Afb753B3638177DA6CAB43",
    "0xeBFdea5C5253E52eC2E3A1e4b95b0eC14244Fb8A",
  ]
  // addresses of advisors
  // "0x4fD1234741028Adc400f57e7320281ACbA5EA36E",
  // "0xB65E1E617C01F8eB087B4657eAe688Ec66D0534E",
  // "0xf25b4f014AEE385320Afb753B3638177DA6CAB43",
  // "0xeBFdea5C5253E52eC2E3A1e4b95b0eC14244Fb8A",

  const [signer] = await ethers.getSigners();
  for (let i = 0; i < advisorAddresses.length; i++) {
    const advisorAddress = advisorAddresses[i];
    const contract = new ethers.Contract(advisorAddress, contractABI, signer);
    // console.log('submitting for advisor address: ', advisorAddress)
    // for (let j = 0; j < proposals.length; j++) {
    //   const transactionResponse = await contract.submitProposals([proposals[j]], [proposalIds[j]]);
    //   const receipt = await transactionResponse.wait();
    //   console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}\n`)
    // }
    // await new Promise(r => setTimeout(r, 5000));
    var j = 0;
    while (j < 5) {
      const response = await contract.proposals(j);
      console.log(response);
      j++;
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });