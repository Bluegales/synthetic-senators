import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAuthSig } from "./authSig"

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

  const litActionCode = `
    const go = async () => {
      // get list of proposals
        const query = \`
          query Proposals($chainId: ChainID!, $pagination: Pagination, $sort: ProposalSort) {
          proposals(chainId: $chainId, pagination: $pagination, sort: $sort) {
          id
          title
          description
          eta
          governor {
            name
          }
          voteStats {
            support
            weight
            votes
            percent
          }
          }
        }
        \`;
        const variables = {
          chainId: "eip155:1",
          pagination: { limit: 1, offset: 0 },
          sort: { field: "START_BLOCK", order: "DESC" },
        }; 
        const url = 'https://api.tally.xyz/query';
        const apiKey = 'd0c4916e4e60c95b3c77a22eb83e158638109a937c76210eafca951a3e950f5d'; // Replace with your actual API key
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
          "Content-Type": "application/json",
          'Api-Key': apiKey, // If an API key is required
          },
          body: JSON.stringify({
          query: query,
          variables: variables,
          }),
        });
        
        if (!response.ok) {
          LitActions.setResponse({ response: "Network response was not ok" });
          throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        
        if (data.errors) {
          LitActions.setResponse({ response: "Error when fetching data"});
          console.error('Error when fetching data:', data.errors);
          return null;
        }

        console.log(data.data);

      // this requests a signature share from the Lit Node
      // the signature share will be automatically returned in the HTTP response from the node
      // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
      const sigShare = await LitActions.signEcdsa({ toSign, publicKey , sigName });
      console.log("signing done")
    };
    
    go();
  `;
  // const pkpKey = ethers.BigNumber.from("0x04b9f18903a7ca5ad7e419f7553ef338f4cc3e2e86f31257cd54ad9ba03b02831421d51f873beb5dd92c68204ba0a7af9e65670e0023d3a075f8d67b025c7e65ae")

  // const pkpKey2 = ethers.BigNumber.from(pkpKey)

  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    authSig: authSig,
    jsParams: {
      toSign: [84, 104, 105, 115, 32, 109, 101, 115, 115, 97, 103, 101, 32, 105, 115, 32, 101, 120, 97, 99, 116, 108, 121, 32, 51, 50, 32, 98, 121, 116, 101, 115],
      publicKey: pkpKey,
      sigName: "sig1",
    },
  });

  console.log(signatures);

  await litNodeClient.disconnect();
}

await main();
