(async () => {
    const sigName = "sig1";
    // example transaction
    // const latestNonce = await Lit.Actions.getLatestNonce({
    //     address: fromAddress,
    //     chain: "mumbai",
    //   });

    let txn = {
        to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        value: 1,
        gasPrice: 50000000000,
        gasLimit: 100000,
        nonce: 1,
        chainId: 31337,
    };
    console.log(txn)
    Lit.Actions.setResponse({ response: JSON.stringify({ txn }) });

    // using ether's serializeTransaction
    // https://docs.ethers.org/v5/api/utils/transactions/#transactions--functions
    const serializedTx = ethers.utils.serializeTransaction(txn);
    let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(serializedTx));
    console.log('hash', hash)
    // encode the message into an uint8array for signing
    const toSign = ethers.utils.arrayify(hash)
    // const toSign = await new TextEncoder().encode(hash);
    console.log(toSign)
    const signature = await Lit.Actions.signEcdsa({
        toSign,
        publicKey,
        sigName,
    });
    console.log(signature)

    // the code in the function given to runOnce below will only be run by one node
    // let res = await Lit.Actions.runOnce({ waitForResponse: true, name: "txnSender" }, async () => {
    //     // get the node operator's rpc url for the 'ethereum' chain
    //     const rpcUrl = await Lit.Actions.getRpcUrl({ chain: "ethereum" });
    //     const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    //     const tx = await provider.sendTransaction(signature);
    //     return tx.blockHash; // return the tx to be broadcast to all other nodes
    // });

    // // set the response from the action as the result of runOnce operation
    // // will be sent by all nodes, even though only a single node did the computation
    // Lit.Actions.setResponse(res);
})()
