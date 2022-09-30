// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenA is ERC20 {
    uint256 private _totalSupply = 1_000_000 * 1 ether;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, _totalSupply);
    }

    /**
     * Approve the spender to spend amount of token
     *
     * @param owner address of owner
     * @param spender address of spender
     * @param amount amount of token to approve
     */
    function approveFrom(address owner, address spender, uint256 amount) public returns (bool) {
        _approve(owner, spender, amount);
        return true;
    }
}