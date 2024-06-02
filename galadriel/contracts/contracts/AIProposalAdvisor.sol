// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./interfaces/IOracle.sol";

// Oracle contract fetches messages from this contract (callback), therefore messages aren't explicitly passed to the oracle
// @todo add restriction to prevent anyone from calling getProposalAdvise
// @note making this an agent (looping) is necessary to win a prize!
// @todo add option to submit multiple proposals at once
contract AIProposalAdvisor {

	address private owner;
	address public oracleAddress;
	string public instruction;
	string public name;

	mapping(uint => string) public proposals;
	mapping(uint => string) public advises;

	event OracleAddressUpdated(address indexed newOracleAddress);

	constructor(address _oracleAddress, string memory _instruction, string memory _name) {
		owner = msg.sender;
		oracleAddress = _oracleAddress;
		instruction = _instruction;
		name = _name;
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

	// @todo stop same proposalId from being used multiple times
	function getProposalAdvise(string memory proposal, uint proposalId) public {
		proposals[proposalId] = proposal;
		IOracle(oracleAddress).createLlmCall(proposalId);
	}

	// @todo handle errors: standard error message for every agent?
	function onOracleLlmResponse(
		uint proposalId,
		string memory response,
		string memory /*errorMessage*/
	) public onlyOracle {
		advises[proposalId] = response;
		// @todo extract answer (y, n) and loop and store it
	}

	function getMessageHistoryContents(uint proposalId) public view returns (string[] memory) {
		string[] memory messages = new string[](1);
		messages[0] = concatenateStrings(instruction, proposals[proposalId]);
		return messages;
	}

	function getMessageHistoryRoles(uint proposalId) public pure returns (string[] memory) {
		string[] memory roles = new string[](1);
		roles[0] = "system";
		return roles;
	}

	function concatenateStrings(string memory _a, string memory _b) private pure returns (string memory) {
		return string(abi.encodePacked(_a, _b));
	}
}


	// function getProposalAdvise(string memory message) public returns (uint i) {
	// 	IOracle(oracleAddress).createLlmCall(chatCount);
	// 	chatCount = chatCount + 1;

	// 	return chatCount - 1;
	// }

	// function onOracleLlmResponse(
	// 	uint runId,
	// 	string memory response,
	// 	string memory /*errorMessage*/
	// ) public onlyOracle {
	// 	chatResponses[runId] = response;
	// }

	// function getMessageHistoryContents(uint chatId) public view returns (string[] memory) {
	// 	string[] memory messages = new string[](chatRuns[chatId].messages.length);
	// 	for (uint i = 0; i < chatRuns[chatId].messages.length; i++) {
	// 		messages[i] = chatRuns[chatId].messages[i].content;
	// 	}
	// 	return messages;
	// }

	// function getMessageHistoryRoles(uint chatId) public view returns (string[] memory) {
	// 	string[] memory roles = new string[](chatRuns[chatId].messages.length);
	// 	for (uint i = 0; i < chatRuns[chatId].messages.length; i++) {
	// 		roles[i] = chatRuns[chatId].messages[i].role;
	// 	}
	// 	return roles;
	// }