import { ethers } from "ethers"

// Connect to Ethereum network (use your preferred network)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// Create a wallet instance (replace with your private key)
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const wallet = new ethers.Wallet(privateKey, provider);

// Define transaction details
const tx = {
    to: "0xd28f5c8cF26CFE3e4415b85340EC1ef4EB50e054",
    value: ethers.utils.parseEther("1")  // Sending 0.01 ether
};

// Send the transaction
wallet.sendTransaction(tx).then((txResponse) => {
    console.log("Transaction Hash:", txResponse.hash);
}).catch((error) => {
    console.error("Error submitting transaction:", error);
});
