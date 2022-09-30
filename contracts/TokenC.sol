// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenC is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    /**
     * Approve the spender to spend amount of token
     *
     * @param _address address of receiver
     * @param _amount amount of token to mint
     */
    function mintToAddress(address _address, uint256 _amount) public {
        _mint(_address, _amount);
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