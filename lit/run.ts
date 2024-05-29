import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAuthSig } from "./authSig";
import { promises as fs } from 'fs';


const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const pkpKey = "0x049783099e4853b3d8350504c242cc5cb3440d8e4aa7edbd336880d2e8fbb68cfbebd7fc6aaa4b7b43044900f0984587fa7eaafad8fc150b24cede086713672a15"

// const publicKey = ethers.utils.computeAddress(pkpKey);

async function main() {
  const wallet = new ethers.Wallet(privateKey, provider);

  let contractClient = new LitContracts({
    signer: wallet,
    network: 'manzano',
  });
  const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
    litNetwork: 'manzano',
  });
  await Promise.all([
    litNodeClient.connect(),
    contractClient.connect()
  ]);

  console.log("connected!")
  await new Promise( resolve => setTimeout(resolve, 2000) );
  console.log("now doing shit")

  const authSig = await getAuthSig(litNodeClient);

  const litActionProposalData: string = await fs.readFile("./actionGetProposalData.js", 'utf8');
  const litActionGaladrielResponseData: string = await fs.readFile("./actionCallGaladriel.js", 'utf8');
    
  // const pkpKey = ethers.BigNumber.from("0x04b9f18903a7ca5ad7e419f7553ef338f4cc3e2e86f31257cd54ad9ba03b02831421d51f873beb5dd92c68204ba0a7af9e65670e0023d3a075f8d67b025c7e65ae")

  // const pkpKey2 = ethers.BigNumber.from(pkpKey)

  const signatures = await litNodeClient.executeJs({
    code: litActionProposalData,
    authSig: authSig,
    jsParams: {
      // toSign: [84, 104, 105, 115, 32, 109, 101, 115, 115, 97, 103, 101, 32, 105, 115, 32, 101, 120, 97, 99, 116, 108, 121, 32, 51, 50, 32, 98, 121, 116, 101, 115],
      // publicKey: pkpKey,
      // sigName: "sig1",
    },
  });

  console.log(signatures);

  await litNodeClient.disconnect();
}

await main();
