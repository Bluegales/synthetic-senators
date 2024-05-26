import {ethers} from "hardhat";


async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  await deployAIProposalAdvisor(oracleAddress);
}


async function deployAIProposalAdvisor(oracleAddress: string) {
  const contract = await ethers.deployContract("AIProposalAdvisor", [oracleAddress], {});

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
