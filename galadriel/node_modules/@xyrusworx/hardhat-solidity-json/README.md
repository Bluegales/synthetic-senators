# Solidity Standard Input JSON plugin for Hardhat

This plugin provides a task named `solidity-json`, which exports the JSON needed to verify deployed 
smart contracts in block scanners like Etherscan.

## Why this plugin?

The reason why this plugin exists in conjunction with hardhat-etherscan is, that not all block scanners
are supported and the APIs may be incomplete, missing or inconsistent between different blockscanners
across different chains.

## How to use?

First, install the plugin into your existing hardhat repository using:

```bash
npm install --save-dev @xyrusworx/hardhat-solidity-json
```

To use it, simply extend your `hardhat.config.ts` (or `js`) like this:

```ts
import "@xyrusworx/hardhat-solidity-json";
// for JavaScript use: require("@xyrusworx/hardhat-solidity-json")
```

Then you may run:

```bash~~~~
npx hardhat solidity-json
```

which will generate files like:

    contracts/MyContract.sol --> artifacts/solidity-json/contracts/MyContract.sol.json

**Hint:** you may want to `gitignore` the `inputs/` folder.
