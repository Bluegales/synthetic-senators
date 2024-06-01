import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from "ethers";
import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { getAuthSig } from "./authSig";
import { promises as fs } from 'fs';
import { serialize, recoverAddress } from "@ethersproject/transactions";
import { joinSignature } from "@ethersproject/bytes";
import { recoverPublicKey, computePublicKey } from "@ethersproject/signing-key";

const privateKey = 'c86aa794580749f172a1a40ccae974abd383b7862fac993b733b7c5c160d1b7d';
const provider = new ethers.providers.JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
const pkpKey = "0x0402560031ddd4d2d01a7914fe35fb9c7457c5a5828595d5171ded3095fab189c08d0cec45a6470d3ae03b998ebeecbcd6f051486123ada12ac039b6a6a24ea01d"

// const publicKey = ethers.utils.computeAddress(pkpKey);

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
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("now doing shit")

  const authSig = await getAuthSig(litNodeClient);

  const litActionProposalData: string = await fs.readFile("./actionGetProposalData.js", 'utf8');
  const litActionGaladrielResponseData: string = await fs.readFile("./actionCallGaladriel.js", 'utf8');
  const litActionSimple: string = await fs.readFile("./actionSimple.js", 'utf8');

  // const signatures = await litNodeClient.executeJs({
  //   code: litActionProposalData,
  //   authSig: authSig,
  //   jsParams: {
  //     apiKey: 'd0c4916e4e60c95b3c77a22eb83e158638109a937c76210eafca951a3e950f5d'
  //   },
  // });

  // console.log(signatures);

  // const results = await litNodeClient.executeJs({
  //   code: litActionGaladrielResponseData,
  //   authSig: authSig,
  //   jsParams: {
  //     providerUrl: 'https://devnet.galadriel.com',
  //     contractAddress: '0x91e2770cF1E511420AdfbdF668794910101Ecf90',
  //     publicKey: pkpKey,
  //   },
  // });

  // const { signatures, response } = results;

  // console.log(results);

  const results = await litNodeClient.executeJs({
    code: litActionSimple,
    authSig: authSig,
    jsParams: {
      publicKey: pkpKey,
    },
  });

  console.log("results", results);

  const { signatures, response } = results;
  const responseO = response as unknown as object;

  const sig = signatures.sig1;
  const { dataSigned } = sig;
  const encodedSig = joinSignature({
    r: "0x" + sig.r,
    s: "0x" + sig.s,
    v: sig.recid,
  });

  const txParams = responseO['txn']
  console.log(txParams)

  const txn = serialize(txParams, encodedSig);
  console.log(txn)

  const recoveredPubkey = recoverPublicKey('0x'+dataSigned, encodedSig);
  console.log("uncompressed recoveredPubkey", recoveredPubkey);
  const compressedRecoveredPubkey = computePublicKey(recoveredPubkey, true);
  console.log("compressed recoveredPubkey", compressedRecoveredPubkey);
  const recoveredAddress = recoverAddress('0x'+dataSigned, encodedSig);
  console.log("recoveredAddress", recoveredAddress);

  const provider2 = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  const result = await provider2.sendTransaction(txn)

  console.log(result)

  // console.log("encodedSig", encodedSig);
  // console.log("sig length in bytes: ", encodedSig.substring(2).length / 2);
  // console.log("dataSigned", dataSigned);
  // const splitSig = splitSignature(encodedSig);
  // console.log("splitSig", splitSig);

  // const { signatures, response } = results;
  // console.log("response", response);

  // const sig = signatures.sig1;
  // const { dataSigned } = sig;
  // const encodedSig = ethers.utils.joinSignature({
  //   r: "0x" + sig.r,
  //   s: "0x" + sig.s,
  //   v: sig.recid,
  // });

  // console.log("encodedSig", encodedSig);
  // console.log("sig length in bytes: ", encodedSig.substring(2).length / 2);
  // console.log("dataSigned", dataSigned);


  // let dataSginedBytes = arrayify("0x" + dataSigned);
  // const splitSig = splitSignature(encodedSig);
  // console.log("splitSig", splitSig);

  // const recoveredPubkey = recoverPublicKey(dataSginedBytes, encodedSig);
  // console.log("uncompressed recoveredPubkey", recoveredPubkey);

  // const compressedRecoveredPubkey = computePublicKey(recoveredPubkey, true);
  // console.log("compressed recoveredPubkey", compressedRecoveredPubkey);
  // const recoveredAddress = recoverAddress(dataSginedBytes, encodedSig);
  // console.log("recoveredAddress", recoveredAddress);

  // const txn = serialize(txParams, encodedSig);

  // console.log("txn", txn);

  // // broadcast txn
  // const provider = new ethers.providers.JsonRpcProvider(
  //   // process.env.LIT_MUMBAI_RPC_URL
  //   "https://rpc.ankr.com/polygon_mumbai"
  // );
  // const result = await provider.sendTransaction(txn);
  // console.log("broadcast txn result:", JSON.stringify(result, null, 4));


  await litNodeClient.disconnect();
}

await main();

// 0xf86701850ba43b7400830186a09470997970c51812dc3a010c7d01b50e0d17dc79c8018082f4f5a0edb454179bcc3b81e7c8e5eb77b5fcd7aa09e1ba83de67e49f754301cd7494a9a004a1ebd7d56ddc20091e2a13d12085a6352bb623c70aec4b4584c6d451323bc2
// uncompressed recoveredPubkey 0x049783099e4853b3d8350504c242cc5cb3440d8e4aa7edbd336880d2e8fbb68cfbebd7fc6aaa4b7b43044900f0984587fa7eaafad8fc150b24cede086713672a15
// compressed recoveredPubkey 0x039783099e4853b3d8350504c242cc5cb3440d8e4aa7edbd336880d2e8fbb68cfb
// recoveredAddress 0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663

// 0xf86701850ba43b7400830186a09470997970c51812dc3a010c7d01b50e0d17dc79c8018082f4f5a0d866a98597dd22d9b5ad2d1af1a4988bdf2202103bcc74c5e9d26406d36a9f9ea0484dabe5c1b3598f2583bc37e3eef196238c745e524e1db453bd490dfc9e23ce
// uncompressed recoveredPubkey 0x049783099e4853b3d8350504c242cc5cb3440d8e4aa7edbd336880d2e8fbb68cfbebd7fc6aaa4b7b43044900f0984587fa7eaafad8fc150b24cede086713672a15
// compressed recoveredPubkey 0x039783099e4853b3d8350504c242cc5cb3440d8e4aa7edbd336880d2e8fbb68cfb
// recoveredAddress 0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663

// from: '0x6627a4DCE21C4D3d39442CD8A9f5355eE3C626dD'


// hash 0x00ef0e32f79fe2bdaf7e2e268a2b1f902077a5b26fb83c12faccaaaeb403a1a8
// hash 0x00ef0e32f79fe2bdaf7e2e268a2b1f902077a5b26fb83c12faccaaaeb403a1a8

// sig1: {
//   r: '3d63e6c2fc9fda67927636f7e520d5f5d12111908447e7b99fe8b83be1443e09',
//   s: '6871f734b3a7afe5de2caf7c1ff2d25cd6e489d841710d842ac1768843b107fa',
//   recid: 0,
//   signature: '0x3d63e6c2fc9fda67927636f7e520d5f5d12111908447e7b99fe8b83be1443e096871f734b3a7afe5de2caf7c1ff2d25cd6e489d841710d842ac1768843b107fa1b',
//   publicKey: '049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15',
//   dataSigned: '00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8'
// }
// sig1: {
//   r: 'bcce81a99f29a79d81d02a7f1c91a5ff269964917dcc83c82b35211c3f6f928c',
//   s: '38cda07fee76955d56cb9cd172dd5582b745e69a9c4da06a6ae24438cf17336e',
//   recid: 0,
//   signature: '0xbcce81a99f29a79d81d02a7f1c91a5ff269964917dcc83c82b35211c3f6f928c38cda07fee76955d56cb9cd172dd5582b745e69a9c4da06a6ae24438cf17336e1b',
//   publicKey: '049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15',
//   dataSigned: '00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8'
// }

// 0x74F723EF842734720f55a8Beaa357b9795835D39
// 0x5205B38A75a74e073482A535e49Da4aCfEC00B66


// '{"sig_type":"K256","signature_share":"68E42C281EB3C3C5FA92E38925F9D12294EEB9C4123C4B1564580D5E56CA6347","share_index":0,"big_r":"02E935FF6BAA1E85DB168EEC05B9CF96014E5B2A7415356E8A137A6CF9C8978286","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"8020C9D2D7E0CDADBD29D8B98BE0D46F57862311EC3D95C5D1B6333859073CAC","share_index":0,"big_r":"02E935FF6BAA1E85DB168EEC05B9CF96014E5B2A7415356E8A137A6CF9C8978286","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"F7B0F77BEA7CC2F07D36EF978574F1DFAFBE0C92A665C3B101CB90B636AC9B70","share_index":0,"big_r":"02E935FF6BAA1E85DB168EEC05B9CF96014E5B2A7415356E8A137A6CF9C8978286","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"65B04F4F5807F2E42C71BB50D3194F2B235FDE60ACBDC6969F63A6EB29BA133B","share_index":0,"big_r":"02E935FF6BAA1E85DB168EEC05B9CF96014E5B2A7415356E8A137A6CF9C8978286","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"CCAC8709B1590BE99A65001086A4500EDE5CB73E50E9BF8B383ABC60C83A807D","share_index":0,"big_r":"02E935FF6BAA1E85DB168EEC05B9CF96014E5B2A7415356E8A137A6CF9C8978286","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"EA77AA957AD6F53EFEACFF08091DD3EE8AF0D5225D6D64615D52BFC2C7A19757","share_index":0,"big_r":"02E935FF6BAA1E85DB168EEC05B9CF96014E5B2A7415356E8A137A6CF9C8978286","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}'


// '{"sig_type":"K256","signature_share":"B6DEA2375926D3A3D6B09A0051A21FD4756CA158655D7F3DD7463CA327AD9F57","share_index":0,"big_r":"02C6440C2B3A5E04E8854DB2B3274BCC633AD1D6758A9940EF105896BE63573E5B","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"314E5A21693ECF21A599F95B909774749E46522E24F84AE2E120A72D3EC0C668","share_index":0,"big_r":"02C6440C2B3A5E04E8854DB2B3274BCC633AD1D6758A9940EF105896BE63573E5B","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"AD8E53C86011E3849DE399BA3906DABC2347A995E49E0DD226B3B254A21D1C12","share_index":0,"big_r":"02C6440C2B3A5E04E8854DB2B3274BCC633AD1D6758A9940EF105896BE63573E5B","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"BA9AADF7A3A5AA2862091D5E9A8B82203BD2A821BAB11D4F1D2FD0F06F8D4AFE","share_index":0,"big_r":"02C6440C2B3A5E04E8854DB2B3274BCC633AD1D6758A9940EF105896BE63573E5B","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"6EF95D9B3D7E9D5FE5F80104F0BF6499AE57CE9E1D6FEE3DC8102E5C25AEE017","share_index":0,"big_r":"02C6440C2B3A5E04E8854DB2B3274BCC633AD1D6758A9940EF105896BE63573E5B","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}',
// '{"sig_type":"K256","signature_share":"83B17DBFA251A46E382C8F4D6C7F114640DEC64867E07ABA87A9730732F0AF21","share_index":0,"big_r":"02C6440C2B3A5E04E8854DB2B3274BCC633AD1D6758A9940EF105896BE63573E5B","public_key":"049783099E4853B3D8350504C242CC5CB3440D8E4AA7EDBD336880D2E8FBB68CFBEBD7FC6AAA4B7B43044900F0984587FA7EAAFAD8FC150B24CEDE086713672A15","data_signed":"00EF0E32F79FE2BDAF7E2E268A2B1F902077A5B26FB83C12FACCAAAEB403A1A8","sig_name":"sig1"}'

// 0xa6AB9c3B042b8c05B898E971e85936e63A489a65
// 0xCE4734365F6df61207c9233027f0313C30769c5B
