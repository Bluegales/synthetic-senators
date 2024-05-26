// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./interfaces/IOracle.sol";

// Oracle contract fetches messages from this contract (callback), therefore messages aren't explicitly passed to the oracle

contract AIProposalAdvisor {

    struct Message {
        string role;
        string content;
    }

	uint public chatCount;
	mapping(uint => string) public chatResponses;

	mapping(address => string) public voterInterests;

    address private owner;
    address public oracleAddress;

    event OracleAddressUpdated(address indexed newOracleAddress);

    constructor(address initialOracleAddress) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        _;
    }

    function setOracleAddress(address newOracleAddress) public onlyOwner {
        oracleAddress = newOracleAddress;
        emit OracleAddressUpdated(newOracleAddress);
    }

    function getProposalAdvise(string memory message) public returns (uint i) {
		IOracle(oracleAddress).createLlmCall(chatCount);
        chatCount = chatCount + 1;

        return chatCount - 1;
    }

    function onOracleLlmResponse(
        uint runId,
        string memory response,
        string memory /*errorMessage*/
    ) public onlyOracle {
        chatResponses[runId] = response;
    }
}
