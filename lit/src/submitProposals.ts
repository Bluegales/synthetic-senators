import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAuthSig } from "./authSig";
import { promises as fs } from 'fs';
import { serialize, recoverAddress } from "@ethersproject/transactions";
import { joinSignature } from "@ethersproject/bytes";

const privateKeyLit = process.env.PRIVATE_KEY_LIT!;
const privateKeySepolia = process.env.PRIVATE_KEY_SEPOLIA!;
if (privateKeyLit == undefined || privateKeySepolia == undefined) {
    console.error("error no private key");
    process.exit(1);
}
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const pkpKey = "0x0402560031ddd4d2d01a7914fe35fb9c7457c5a5828595d5171ded3095fab189c08d0cec45a6470d3ae03b998ebeecbcd6f051486123ada12ac039b6a6a24ea01d"

async function main() {
  const wallet = new ethers.Wallet(privateKeyLit, provider);

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
  
  const litActionSubmitProposals: string = await fs.readFile("./actionSubmitProposals.js", 'utf8');
  
  const advisorAddresses = [
    "0x4fD1234741028Adc400f57e7320281ACbA5EA36E",
    "0xB65E1E617C01F8eB087B4657eAe688Ec66D0534E",
    "0xf25b4f014AEE385320Afb753B3638177DA6CAB43",
    "0xeBFdea5C5253E52eC2E3A1e4b95b0eC14244Fb8A",
  ]

  for (const advisor of advisorAddresses) {
    const authSig = await getAuthSig(litNodeClient);
    const results = await litNodeClient.executeJs({
      code: litActionSubmitProposals,
      authSig: authSig,
      jsParams: {
        contractAddress: advisor,
        daoContract: "0x888cAEb76F96efF849D888306db261475DD06466",
        galadrielRpc: "https://devnet.galadriel.com",
        sepoliaRpc: "https://ethereum-sepolia.rpc.subquery.network/public",
        startBlock: '6020610',
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
  }
  
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
  const providerGaladriel = new ethers.providers.JsonRpcProvider("https://devnet.galadriel.com");
  const wallet = new ethers.Wallet(privateKeySepolia, providerGaladriel);
  const tx = {
    data: response['transactionData']['data'],
    to: response['transactionData']['to']
  }
  const txResponse = await wallet.sendTransaction(tx);
  const receipt = await txResponse.wait();
  console.log('Transaction receipt:', receipt);
}

await main();
