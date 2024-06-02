// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {DAOToken} from "../src/DAOToken.sol";
import {DAOGovernor} from "../src/DAOGovernor.sol";

contract DAOScript is Script {
    function run() public {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);

        DAOToken token = new DAOToken();
        DAOGovernor governor = new DAOGovernor(token);
        token.mint(address(this), 1000000);

        uint256 balance = token.balanceOf(address(this));
        console2.logUint(balance);

        vm.stopBroadcast();
    }
}
