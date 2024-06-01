import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { AuthMethodType, AuthMethodScope } from '@lit-protocol/constants';
import { getAuthSig } from "./authSig"
import { LitAuthClient } from '@lit-protocol/lit-auth-client';

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

    const mintCost = await contractClient.pkpNftContract.read.mintCost();
    console.log(mintCost)
    
    const authId = await LitAuthClient.getAuthIdByAuthMethod(authMethod);

    const setScopeTx =
    await contractClient.pkpPermissionsContract.write.addPermittedAuthMethodScope(
      tokenId,
      AuthMethodType.EthWallet,
      authId, // auth id
      AuthMethodScope.SignAnything
    );

    // -- get the scopes
    const scopes =
        await contractClient.pkpPermissionsContract.read.getPermittedAuthMethodScopes(
            tokenId,
            AuthMethodType.EthWallet,
            authId,
            3
        );

    // ==================== Post-Validation ====================
    if (mintCost === undefined || mintCost === null) {
        console.log('mintCost should not be empty');
        return
    }

    if (scopes[1] !== true) {
        console.log('scope 1 (sign anything) should be true');
        return
    }

    // ==================== Success ====================
    console.log(`ContractsSDK set permission
    Logs:
    ---
    mintHash: ${setScopeTx.hash}
    tokenId: ${tokenId}
    scope 1 (sign anything): ${scopes[1]}
    scope 2 (only sign messages): ${scopes[2]}
    `);
    return
}

await main();
