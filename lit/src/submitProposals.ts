import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAuthSig } from "./authSig";
import { promises as fs } from 'fs';
import { serialize, recoverAddress } from "@ethersproject/transactions";
import { joinSignature } from "@ethersproject/bytes";

const privateKey = process.env.PRIVATE_KEY!;
if (privateKey == undefined) {
    console.error("error no private key");
    process.exit(1);
}
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const pkpKey = "0x0402560031ddd4d2d01a7914fe35fb9c7457c5a5828595d5171ded3095fab189c08d0cec45a6470d3ae03b998ebeecbcd6f051486123ada12ac039b6a6a24ea01d"

async function main() {
  const wallet = new ethers.Wallet(privateKey, provider);

  let contractClient = new LitContracts({
    signer: wallet,
    network: 'cayenne',
  });
  const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
    litNetwork: 'cayenne',
  });
  await Promise.all([
    litNodeClient.connect(),
    contractClient.connect()
  ]);

  console.log("connected!")
  const authSig = await getAuthSig(litNodeClient);

  const litActionSubmitProposals: string = await fs.readFile("./actionSubmitProposals.js", 'utf8');

  const results = await litNodeClient.executeJs({
    code: litActionSubmitProposals,
    authSig: authSig,
    jsParams: {
      contractAddress: "0x709E5941Ae771C642Ed78161495aD093261bb3AA",
      daoContract: "0x59c6765e180ba50FaD3f089e6D26cDeb5eaC9CdA",
      galadrielRpc: "https://devnet.galadriel.com",
      sepoliaRpc: "https://ethereum-sepolia.rpc.subquery.network/public",
      startBlock: '6019131',
      pkpEthAddress: '0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663',
      publicKey: pkpKey,
      etherscanApiKey: 'FVMWRD8U4TIHZG41PX5JKD3CRGY5TX89Y2',
    },
  });

  console.log("results", results);

  const { signatures, response } = results;

  // sadly this doesn't work 
  // the signature is valid but its always from a different address
  // the lit team didn't come back to us in time.
  // submitTransaction(response as unknown as object, signatures);

  // we have to sign it manually with a different address
  submitTransactionManually(response as unknown as object)

  await litNodeClient.disconnect();
}

async function submitTransaction(response: object, signatures: any) {
  const sig = signatures.sig1;
  const encodedSig = joinSignature({
    r: "0x" + sig.r,
    s: "0x" + sig.s,
    v: sig.recid,
  });
  const txParams = response['txn']
  console.log(txParams)
  const txn = serialize(txParams, encodedSig);
  console.log(txn)
  
  const provider2 = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  const result = await provider2.sendTransaction(txn)
  console.log(result)
}

async function submitTransactionManually(response: object) {
  const privateKey = process.env.PRIVATE_KEY;
  if (privateKey == undefined) {
    console.log('ERROR no private key')
    return
  }
  const providerGaladriel = new ethers.providers.JsonRpcProvider("https://devnet.galadriel.com");
  const wallet = new ethers.Wallet(privateKey, providerGaladriel);
  const tx = {
    data: response['transactionData']['data'],
    to: response['transactionData']['to']
  }
  const txResponse = await wallet.sendTransaction(tx);
  const receipt = await txResponse.wait();
  console.log('Transaction receipt:', receipt);
}

await main();
