import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { AuthMethodType, AuthMethodScope } from '@lit-protocol/constants';
import { getAuthSig } from "./authSig"

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const tokenId = ethers.BigNumber.from("76457771047658940791667444420467263566516700086964710936193041217651255457773")

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
    const setScopeTx =
        await contractClient.pkpPermissionsContract.write.addPermittedAuthMethodScope(
            tokenId,
            AuthMethodType.EthWallet,
            authId,
            AuthMethodScope.SignAnything
        );

    await setScopeTx.wait();
    console.log("done");
}

await main()
