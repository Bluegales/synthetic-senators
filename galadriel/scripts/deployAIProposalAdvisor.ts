import {ethers} from "hardhat";

// Example instruction:
// You are an advisor that should give advice on DAO proposals. You are interested in paying a lot of money for marketing the DAO and doing community events. Because you are not holding a huge amount of funds, you are an advocate of the DAO giving back fees or treasury funds to the users. Reason about your advised voting decision in 1-2 sentences. Please ALWAYS end your answer with the character 'N' for no or 'Y' for yes. Never end with another character. Please answer the following proposal as instructed:
const instruction = 'Your AI Advisor instructions here.';
const name = 'Your AI Advisor name here.';

async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  await deployAIProposalAdvisor(oracleAddress, instruction, name);
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
