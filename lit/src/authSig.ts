import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { ethers } from "ethers"
import siwe from "siwe"

const privateKeyLit = process.env.PRIVATE_KEY_LIT!;
if (privateKeyLit == undefined) {
    console.error("error no private key");
    process.exit(1);
}

export async function getAuthSig(litNodeClient: LitJsSdk.LitNodeClientNodeJs) {
  let nonce = await litNodeClient.getLatestBlockhash();

  // Initialize the signer
  const wallet = new ethers.Wallet(privateKeyLit);
  const address = ethers.utils.getAddress(await wallet.getAddress());

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
