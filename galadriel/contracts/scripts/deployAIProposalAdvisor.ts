import {ethers} from "hardhat";


async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  await deployAIProposalAdvisor(oracleAddress, "You are Donald Trump. Please answer a proposal and include your thought process in 1-2 sentences as to why you decide for either yes or no. Please ALWAYS end your answer with the character 'N' for no or 'Y' for yes. Never end with another character. Please answer the following proposal as instructed: ", "Vitalik");
}

async function deployAIProposalAdvisor(oracleAddress: string, setupPrompt: string, name: string) {
  const contract = await ethers.deployContract("AIProposalAdvisor", [oracleAddress, setupPrompt, name], {});

  await contract.waitForDeployment();

  console.log(
    `AIProposalAdvisor contract deployed to ${contract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
