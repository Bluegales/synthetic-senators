import { ethers, providers } from "ethers";
import { serialize, recoverAddress } from "@ethersproject/transactions";
import {
    hexlify,
    splitSignature,
    hexZeroPad,
    joinSignature,
} from "@ethersproject/bytes";
import { recoverPublicKey, computePublicKey } from "@ethersproject/signing-key";


// Define the object

const results = {
    claims: {},
    signatures: {
        sig1: {
            r: '2b4c0296e75b01b11e64ffbfb2b4acdae74d609c68b89d1d935c3b4c6ac07966',
            s: '631befd769f2410c602e765bb90a54ead21c5d17c7a0a6188f601675a6446d64',
            recid: 1,
            signature: '0x2b4c0296e75b01b11e64ffbfb2b4acdae74d609c68b89d1d935c3b4c6ac07966631befd769f2410c602e765bb90a54ead21c5d17c7a0a6188f601675a6446d641c',
            publicKey: '049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15',
            dataSigned: 'D598B7203217D5B898750CB3E713E734DAFD1E06B984BC50DF705A3A5F69293D'
        }
    },
    decryptions: [],
    response: {
        txParams: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: 1,
            gasPrice: 50000000000,
            gasLimit: 100000,
            nonce: 1
        },
    },
    logs: '0x67a163f4952ed97120870d371e4faa2ef369ecef8f367f2a6651e1f37db41c02\n' +
        'Uint8Array(32) [\n' +
        '  103, 161,  99, 244, 149,  46, 217, 113,\n' +
        '   32, 135,  13,  55,  30,  79, 170,  46,\n' +
        '  243, 105, 236, 239, 143,  54, 127,  42,\n' +
        '  102,  81, 225, 243, 125, 180,  28,   2\n' +
        ']\n' +
        'success\n'
}

const { signatures, response } = results;

const sig = signatures.sig1;
const { dataSigned } = sig;
const encodedSig = joinSignature({
    r: "0x" + sig.r,
    s: "0x" + sig.s,
    v: sig.recid,
});

const { txParams } = response;

console.log("encodedSig", encodedSig);
console.log("sig length in bytes: ", encodedSig.substring(2).length / 2);
console.log("dataSigned", dataSigned);
const splitSig = splitSignature(encodedSig);
console.log("splitSig", splitSig);

const recoveredPubkey = recoverPublicKey('0x'+dataSigned, encodedSig);
console.log("uncompressed recoveredPubkey", recoveredPubkey);
const compressedRecoveredPubkey = computePublicKey(recoveredPubkey, true);
console.log("compressed recoveredPubkey", compressedRecoveredPubkey);
const recoveredAddress = recoverAddress('0x'+dataSigned, encodedSig);
console.log("recoveredAddress", recoveredAddress);

// // Sign the transaction
// async function sendTransaction() {
//   try {
//     // Sign the transaction using the provided signature
//     const signedTx = await wallet.signTransaction(tx);

//     // Send the signed transaction
//     const txResponse = await provider.sendTransaction(signedTx);

//     // Wait for the transaction to be mined
//     const receipt = await txResponse.wait();

//     console.log('Transaction successful with hash:', receipt.transactionHash);
//   } catch (error) {
//     console.error('Error sending transaction:', error);
//   }
// }


const txn = serialize(txParams, encodedSig);
console.log(txn)

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
const result = await provider.sendTransaction(txn)
console.log(result['transactionHash'])

// sendTransaction();

async function checkTransactionStatus(txHash) {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (receipt && receipt.blockNumber) {
        console.log("Transaction was mined in block:", receipt.blockNumber);
        if (receipt.status === 1) {
            console.log("Transaction was successful!");
        } else {
            console.log("Transaction failed.");
        }
    } else {
        console.log("Transaction is still pending...");
    }
}
checkTransactionStatus(result);
