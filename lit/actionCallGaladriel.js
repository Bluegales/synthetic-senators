// uncomment this if you want to run this file seperatly as
// `node ./actionCallGaladriel.js`

// import { ethers } from "ethers"
// const providerUrl = 'https://devnet.galadriel.com'
// const contractAddress = "0x91e2770cF1E511420AdfbdF668794910101Ecf90"
// // const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
// const publicKey = '0x1234f1bbCD998C922247E592CE3C1cEB21B74E40'

const go = async () => {
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "advises",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "getMessageHistoryContents",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "getMessageHistoryRoles",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "proposal",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "getProposalAdvise",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "instruction",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "response",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "onOracleLlmResponse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "oracleAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
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
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOracleAddress",
          "type": "address"
        }
      ],
      "name": "setOracleAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const tx = await contract.populateTransaction.getProposalAdvise("help poor people?", 0);
  tx.chainId = 1337;
  tx.gasLimit = ethers.utils.hexlify(21000);
  tx.gasPrice = await provider.getGasPrice();
  Lit.Actions.setResponse({ response: JSON.stringify({ tx }) });

  const serializedTx = ethers.utils.serializeTransaction(tx);
  let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(serializedTx));
  const toSign = ethers.utils.arrayify(hash)
  console.log(toSign);

  // const wallet = new ethers.Wallet(privateKey, provider);
  const sigName = "asd";
  const signature = await Lit.Actions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });
  // const signature = await wallet.signTransaction(toSign)

  // const signature = ethers.utils.keccak256(toSign);
  console.log(signature);
  // const rpcUrl = await Lit.Actions.getRpcUrl({ chain: "ethereum" });
  // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // const txX = await provider.sendTransaction(signature);
  // return txX.blockHash;
  // const response = await contract.advises(0);
}

go();
