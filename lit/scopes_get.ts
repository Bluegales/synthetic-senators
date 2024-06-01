import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { AuthMethodType } from '@lit-protocol/constants';
import { getAuthSig } from "./authSig"

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const tokenId = ethers.BigNumber.from("0xbb83f7b463902f2e8cafc1eab596a4b174315d8591edbf4b59c97f03bb01ea2e")

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

    const authSig = await getAuthSig(litNodeClient);

    const authMethod = {
        authMethodType: AuthMethodType.EthWallet,
        accessToken: JSON.stringify(authSig),
    };

    const authId = await LitAuthClient.getAuthIdByAuthMethod(authMethod);
    const scopes = await contractClient.pkpPermissionsContract.read.getPermittedAuthMethodScopes(
        tokenId,
        AuthMethodType.EthWallet,
        authId,
        3
    );

    console.log('scope 1 (sign anything) = ', scopes[1]);
    console.log('scope 2 (personal sign) = ', scopes[2]);
}

await main()
