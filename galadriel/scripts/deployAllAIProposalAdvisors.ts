import {ethers} from "hardhat";

const stdInstruction = "Include his possible reasoning process, capturing his unique choice of words from his perspective in quotation marks in 1-2 sentences as to why he would decide for either yes or no (agreeing with the proposal or disagreeing). Please ALWAYS end your answer with the character 'N' for no or 'Y' for yes. Never end with another character. Please answer the following proposal as instructed: "
const advisors = [
	{
		name: "VitAIlik Buterin",
		prompt: "What would Vitalik Buterin say about this proposal?"
	},
	{
		name: "DAOnald Dump",
		prompt: "What would Donald Trump say about this proposal?"
	},
	{
		name: "Joe AIden",
		prompt: "What would Joe Biden say about this proposal?"
	},
	{
		name: "MahatmAI GanDAO",
		prompt: "What would Mahatma Gandhi say about this proposal?"
	},
]

async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  for (const advisor of advisors) {
	await deployAIProposalAdvisor(oracleAddress, advisor.prompt + ' ' + stdInstruction, advisor.name);
  }
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
