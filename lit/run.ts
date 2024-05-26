import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAuthSig } from "./authSig"

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
// const pkpKey = "0x2f1e1658057a387196caca9a61d38b41091855f3b832f141545f91ef2ca79797"
const pkpKey = "21311863506828647933974830126297030856258843967114055051653351682295376353175"

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

  const litActionCode = `
      const go = async () => {
      // The params toSign, publicKey, sigName are passed from the jsParams fields and are available here
      console.log(toSign, publicKey, sigName);
      const sigShare = await Lit.Actions.signEcdsa({ toSign, publicKey, sigName });
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
