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

  const litActionSubmitVote: string = await fs.readFile("./actionSubmitVote.js", 'utf8');

  const results = await litNodeClient.executeJs({
    code: litActionSubmitVote,
    authSig: authSig,
    jsParams: {
        galadrielContractAddress: "0x709E5941Ae771C642Ed78161495aD093261bb3AA",
        daoContractAddress: "0x59c6765e180ba50FaD3f089e6D26cDeb5eaC9CdA",
        galadrielRpc: "https://devnet.galadriel.com",
        sepoliaRpc: "https://ethereum-sepolia.rpc.subquery.network/public",
        pkpEthAddress: '0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663',
        publicKey: pkpKey,
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
  console.log(response)
}

async function test() {
  const testData = {
    transactionData: {
      data: '0x92eca6b4000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040232044414f20476f7665726e616e6365205175657374696f6e20340a53686f756c6420446f6e616c64205472756d7020676f7665726e20746869732044414f3f00000000000000000000000000000000000000000000000000000000000000018d0984e54fb749c97197dfeae8908ba92b7e04347a18f62cc479aeb6245972a5',
      to: '0x709E5941Ae771C642Ed78161495aD093261bb3AA',
      nonce: 0,
      gasPrice: 50000000000,
      gasLimit: 100000,
      chainId: 696969
    }
  }
  submitTransactionManually(testData);
}

await main();
