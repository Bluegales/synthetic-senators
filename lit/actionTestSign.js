// import { ethers } from "ethers"
// const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
// const to = '0x1234f1bbCD998C922247E592CE3C1cEB21B74E40';
// const providerUrl = 'https://eth.llamarpc.com';

const go = async () => {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: to,
        nonce: await provider.getTransactionCount(wallet.address),
        gasLimit: ethers.utils.hexlify(21000),
        // maxFeePerGas: 10,
        // maxPriorityFeePerGas: 20,
        gasPrice: await provider.getGasPrice()
    };

    const unsignedTx = await ethers.utils.resolveProperties(tx);
    console.log(unsignedTx)
    const serializedTx = ethers.utils.serializeTransaction(unsignedTx);
    console.log(serializedTx)

    const txBytes = ethers.utils.arrayify(serializedTx);
    const hash = ethers.utils.keccak256(txBytes)
    const hashBytes = ethers.utils.arrayify(hash)
    console.log("hash", hash)
    console.log("hashBytes", hashBytes)

    const signature = await wallet.signMessage(hashBytes)
    console.log("sign", signature)

    const sigShare = await LitActions.signEcdsa({ toSign: hashBytes, publicKey: "0x049783099e4853b3d8350504c242cc5cb3440d8e4aa7edbd336880d2e8fbb68cfbebd7fc6aaa4b7b43044900f0984587fa7eaafad8fc150b24cede086713672a15", sigName: "sig1" });
    console.log(sigShare)

    //   const signedTx = await wallet.signTransaction(unsignedTx);

    //   console.log("sign", signedTx)

    // Send the transaction
    //   const txResponse = await provider.sendTransaction(signedTx);

    // Wait for the transaction to be mined
    //   const receipt = await txResponse.wait();

    //   return receipt;
}

go();
