// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    string private _name = "Nawar";
    string private _symbol = "NWR";
    uint256 private _totalSupply = 1000000 * 10**uint(decimals());

    constructor() ERC20(_name, _symbol) {
        _mint(msg.sender, _totalSupply);
    }
}