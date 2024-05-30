// index.js

const express = require('express');
const cron = require('node-cron');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const port = 3000;

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const callContractMethod = async () => {
	const pk = process.env.PRIVATE_KEY;
	const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
	const wallet = new ethers.Wallet(pk, provider);
	const pubk = wallet.address;
	const contractAddress = "0xf08A50178dfcDe18524640EA6618a1f965821715";
	const abi = [
		"function balanceOf(address owner) view returns (uint256)"
	]
	const contract = new ethers.Contract(contractAddress, abi, provider);

	try {
		const response = await contract.balanceOf("0x406C90A36c66A42Cb4699d4Dc46DF7af5dDEe199");
		console.log(response);
	}
	catch (e) {
		console.log(e);
	}
}

callContractMethod();


// // Schedule the contract call to occur once per second
// cron.schedule('* * * * * *', async () => {
// 	await callContractMethod();
// 	console.log('Smart contract method called successfully.');
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

