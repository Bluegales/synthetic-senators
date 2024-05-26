import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { AuthMethodType } from '@lit-protocol/constants';
import { getAuthSig } from "./authSig"

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const tokenId = ethers.BigNumber.from("0x2f1e1658057a387196caca9a61d38b41091855f3b832f141545f91ef2ca79797")

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
