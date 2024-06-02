// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {DAOToken} from "../src/DAOToken.sol";
import {DAOGovernor} from "../src/DAOGovernor.sol";

contract DAOScript is Script {
    function run() public {
        vm.recordLogs();
        uint256 pk = vm.envUint("LOCAL_PK");
        vm.startBroadcast(pk);

        address token_addr = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
        address payable governor_addr = payable(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512);
        DAOGovernor governor = DAOGovernor(governor_addr);

        address[] memory targets = new address[](1);
        targets[0] = token_addr;
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes memory action = abi.encodeWithSignature("mint(address,uint256)", address(this), 69);
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = action;
        string memory description = "mint 69 tokens";

        // governor.propose(
        //     targets,
        //     values,
        //     calldatas,
        //     description
        // );
        

        vm.stopBroadcast();
    }
}
