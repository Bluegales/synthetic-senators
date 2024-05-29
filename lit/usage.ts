import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
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
    await new Promise( resolve => setTimeout(resolve, 2000) );
    console.log("now doing shit")
    
    const { capacityTokenIdStr } = await contractClient.mintCapacityCreditsNFT({
        requestsPerKilosecond: 80,
        // requestsPerDay: 14400,
        // requestsPerSecond: 10,
        daysUntilUTCMidnightExpiration: 2,
    });
    console.log(capacityTokenIdStr)

    // const { capacityDelegationAuthSig } =
    // await litNodeClient.createCapacityDelegationAuthSig({
    //     dAppOwnerWallet: wallet,
    //     capacityTokenId: "1166",
    //     delegateeAddresses: ["0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663"],
    //     uses: '1',
    // });

    // console.log(capacityDelegationAuthSig)
}

// interface CapacityCreditsReq {
//     dAppOwnerWallet: ethers.Wallet;
//     capacityTokenId?: string;
//     delegateeAddresses?: string[];
//     uses?: string;
//     domain?: string;
//     expiration?: string;
//     statement?: string;
// }

await main()

