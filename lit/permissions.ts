import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { AuthMethodScope, AuthMethodType } from '@lit-protocol/constants';
import siwe from "siwe"

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';

const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
// const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
const wallet = new ethers.Wallet(privateKey, provider);

console.log(wallet)

let contractClient = new LitContracts({
    signer: wallet,
    network: 'cayenne',
  });

const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
    litNetwork: 'cayenne',
});

await litNodeClient.connect();
await contractClient.connect();

const authSig = await getAuthSig();
console.log("AUTH")
console.log(authSig)

const authMethod = {
  authMethodType: AuthMethodType.EthWallet,
  accessToken: JSON.stringify(authSig),
};

const tokenId = ethers.BigNumber.from("76457771047658940791667444420467263566516700086964710936193041217651255457773")
await sign()


//// Permissions

// const authId = await LitAuthClient.getAuthIdByAuthMethod(authMethod);
// const scopes = await contractClient.pkpPermissionsContract.read.getPermittedAuthMethodScopes(
//   tokenId,
//   AuthMethodType.EthWallet,
//   authId,
//   3
// );

// console.log(scopes)

async function sign() {
  const litActionCode = `
      const go = async () => {
      // The params toSign, publicKey, sigName are passed from the jsParams fields and are available here
      console.log("kekw");
      // const sigShare = await Lit.Actions.signEcdsa({ toSign, publicKey, sigName });
      };
  
      go();
  `;

  const pkpKey = ethers.BigNumber.from("0x04b9f18903a7ca5ad7e419f7553ef338f4cc3e2e86f31257cd54ad9ba03b02831421d51f873beb5dd92c68204ba0a7af9e65670e0023d3a075f8d67b025c7e65ae")

  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    authSig: authSig,
    jsParams: {
      toSign: [84, 104, 105, 115, 32, 109, 101, 115, 115, 97, 103, 101, 32, 105, 115, 32, 101, 120, 97, 99, 116, 108, 121, 32, 51, 50, 32, 98, 121, 116, 101, 115],
      publicKey: pkpKey,
      sigName: "sig1",
    },
  });
  
  console.log(signatures)
}


// await litNodeClient.disconnect();
// await contractClient.disconnect();

// const signAnythingScope = scopes[1];
// const personalSignScope = scopes[2];

// const authId = await LitAuthClient.getAuthIdByAuthMethod(authMethod);
// await contractClient.pkpPermissionsContract.read.getPermittedAuthMethodScopes(
//   mintInfo.pkp.tokenId,
//   AuthMethodType.EthWallet,
//   authId,
//   3
// );

// const signAnythingScope = scopes[1];
// const personalSignScope = scopes[2];



async function getAuthSig() {
  let nonce = await litNodeClient.getLatestBlockhash();

  // Initialize the signer
  const wallet = new ethers.Wallet('c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d');
  const address = ethers.utils.getAddress(await wallet.getAddress());
  console.log(address)

  // Craft the SIWE message
  const domain = 'localhost';
  const origin = 'https://localhost/login';
  const statement =
      'This is a test statement.  You can put anything you want here.';

  // expiration time in ISO 8601 format.  This is 7 days in the future, calculated in milliseconds
  const expirationTime = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7
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

