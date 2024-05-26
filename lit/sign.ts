// const LitJsSdk = require('@lit-protocol/lit-node-client-nodejs');
// const { ethers } = require("ethers");
// const siwe = require('siwe');

import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import * as siwe from "siwe";

const client = new LitJsSdk.LitNodeClient({
    litNetwork: 'habanero',
  });
  
await client.connect();

let nonce = await client.getLatestBlockhash();

// Initialize the signer
const wallet = new ethers.Wallet('<Your private key>');
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

console.log(authSig);

// Form the authNeededCallback to create a session with
// the wallet signature.
const authNeededCallback = async (params) => {
 const response = await client.signSessionKey({
   statement: params.statement,
   authMethods: [
     {
       authMethodType: 1,
       // use the authSig created above to authenticate
       // allowing the pkp to sign on behalf.
       accessToken: JSON.stringify(authSig),
     },
   ],
   pkpPublicKey: `<your pkp public key>`,
   expiration: params.expiration,
   resources: params.resources,
   chainId: 1,
 });
 return response.authSig;
};

// Set resources to allow for signing of any message.
const resourceAbilities = [
 {
   resource: new LitActionResource('*'),
   ability: LitAbility.PKPSigning,
 },
];
// Get the session key for the session signing request
// will be accessed from local storage or created just in time.
const sessionKeyPair = client.getSessionKey();

// Request a session with the callback to sign
// with an EOA wallet from the custom auth needed callback created above.
const sessionSigs = await client.getSessionSigs({
   chain: "ethereum",
   expiration:  new Date(Date.now() + 60_000 * 60).toISOString(),
   resourceAbilityRequests: resourceAbilities,
   authNeededCallback,
});
