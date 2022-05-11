// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketCoin is ERC20, Ownable {
    constructor() ERC20("MarketCoin", "MC") {}

    function mint(uint256 amount) public payable {
        require(msg.value == amount * 0.0001 ether, "not enough ether");
        _mint(msg.sender, amount);
    }
    receive() external payable{}
    // In case function is called that doesn't exist
    fallback() external payable{}
}
