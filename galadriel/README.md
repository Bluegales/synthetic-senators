# Setup A Custom AI Advisor

This guide will show you how to deploy a custom AI Advisor to the Galadriel testnet and interact with it.

## Install dependencies

```
cp template.env .env
npm install
```

Modify .env and add your data.<br>
`ORACLE_ADDRESS` for Galadriel testnet LLM oracle<br>
`PRIVATE_KEY_GALADRIEL` for Galadriel testnet

Rest of this README assumes you are in the `galadriel` directory.

## Deployment

**Deploy custom AI Advisor to Galadriel testnet**

Go to the `scripts` directory and open `deployAIProposalAdvisor.ts` file.<br>:
Modify the `instruction` and `name` variables to represent your personal DAO voting interests. We recommend to keep the format from the example.

Run the following command to deploy the AI Advisor to the Galadriel testnet:
```
npx hardhat run scripts/deployAIProposalAdvisor.ts --network galadriel
```

## Usage

**Interact with the AI Advisor**

Modify .env and add your AI Advisor address to `AI_ADVISOR_ADDRESS`.<br>

Run the following command to call the AI Advisor, submit a proposal and get the advice:
```
npx hardhat run scripts/callAIProposalAdvisor.ts --network galadriel
```

You can look into the script to see how to call the different functions.