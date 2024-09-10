// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Restaurant {
	string public name;
	address public owner;
	constructor(
		string memory _name
	) {
		name = _name;
		owner = msg.sender;
	}
	
	receive() external payable {
		
	}
}