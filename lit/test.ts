import * as LitJsSdk from "@lit-protocol/lit-node-client";

async function test() {
    const client = new LitJsSdk.LitNodeClient({
        litNetwork: 'habanero',
      });
      
    await client.connect();

    
    await client.disconnect();
}

await test()

