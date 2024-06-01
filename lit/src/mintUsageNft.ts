import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const privateKey = process.env.PRIVATE_KEY!;
if (privateKey == undefined) {
    console.error("error no private key");
    process.exit(1);
}
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')

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
    
    const { capacityTokenIdStr } = await contractClient.mintCapacityCreditsNFT({
        requestsPerKilosecond: 80,
        daysUntilUTCMidnightExpiration: 2,
    });
    console.log(capacityTokenIdStr)
}

await main()

