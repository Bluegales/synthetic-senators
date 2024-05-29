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
    
  const signatures = await litNodeClient.executeJs({
    code: litActionProposalData,
    authSig: authSig,
    jsParams: {
      apiKey: 'd0c4916e4e60c95b3c77a22eb83e158638109a937c76210eafca951a3e950f5d'
    },
  });

  console.log(signatures);

  const signatures2 = await litNodeClient.executeJs({
    code: litActionProposalData,
    authSig: authSig,
    jsParams: {
      providerUrl: 'd0c4916e4e60c95b3c77a22eb83e158638109a937c76210eafca951a3e950f5d',
      contractAddress: '0x91e2770cF1E511420AdfbdF668794910101Ecf90'
    },
  });

  console.log(signatures2);

  await litNodeClient.disconnect();
}

await main();
