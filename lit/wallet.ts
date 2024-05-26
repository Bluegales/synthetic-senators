import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { ethers } from "ethers"
import { PKPClient } from "@lit-protocol/pkp-client";
import { LitContracts } from '@lit-protocol/contracts-sdk';
import siwe from "siwe"

const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
    litNetwork: 'cayenne',
});
await litNodeClient.connect();

const authSig = await getAuthSig();

const authNeededCallback = async (params) => {
    const response = await litNodeClient.signSessionKey({
      statement: params.statement,
      authMethods: [{
          authMethodType: 1,
          accessToken: "asd"
      }],
      expiration: params.expiration,
      resources: params.resources,
      chainId: 1,
    });
    return response.authSig;
  };

const pkpClient = new PKPClient({
    authContext: {
        client: litNodeClient,
        getSessionSigsProps: {
            chain: 'ethereum',
            expiration: new Date(Date.now() + 60_000 * 60).toISOString(),
            resourceAbilityRequests: resourceAbilities,
            authNeededCallback,
        },
    },
    // controllerAuthSig: authSig,
    // controllerSessionSigs: sesionSigs, // (deprecated)
    pkpPubKey: "<Your PKP public key>",
});
await pkpClient.connect();

async function getAuthSig() {
    let nonce = await litNodeClient.getLatestBlockhash();

    // Initialize the signer
    const wallet = new ethers.Wallet('c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d');
    const address = ethers.getAddress(await wallet.getAddress());

    // Craft the SIWE message
    const domain = 'localhost';
    const origin = 'https://localhost/login';
    const statement =
        'This is a test statement.  You can put anything you want here.';

    // expiration time in ISO 8601 format.  This is 7 days in the future, calculated in milliseconds
    const expirationTime = new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 7 * 10000
    ).toISOString();

    const siweMessage = new siwe.SiweMessage({
        domain,
        address: address,
        statement,
        uri: origin,
        version: '1',
        chainId: 1,
        nonce,
        expirationTime,
    });
    const messageToSign = siweMessage.prepareMessage();

    // Sign the message and format the authSig
    const signature = await wallet.signMessage(messageToSign);
    const authSig = {
        sig: signature,
        derivedVia: 'web3.eth.personal.sign',
        signedMessage: messageToSign,
        address: address,
    };
    return authSig;
}




// await main();


// const pkpWallet = new PKPEthersWallet({
//     //   controllerAuthSig: "<Your AuthSig>",
//     // Or you can also pass in controllerSessionSigs
//     pkpPubKey: "0x04b9f18903a7ca5ad7e419f7553ef338f4cc3e2e86f31257cd54ad9ba03b02831421d51f873beb5dd92c68204ba0a7af9e65670e0023d3a075f8d67b025c7e65ae",
//     rpc: "https://chain-rpc.litprotocol.com/http",
// });
// await pkpWallet.init();
