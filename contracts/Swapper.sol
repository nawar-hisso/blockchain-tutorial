// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./TokenC.sol";
import "./TokenA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Swapper is Ownable {

    address inputTokenA = 0x37656C3F841066756138606c4dAD202cf290f3A3;
    address inputTokenB = 0xa69D91229cc9935c8b8b0a3736B4A945302FaF07;
    address outputToken = 0x1cCe6F9e37B3E00e3DE597F600B7D89E3807373B;

    /**
     * Set the Input Token Address only by the owner himself
     *
     * @param _address address of token
     */
    function setInputTokenA (address _address) external onlyOwner {
        inputTokenA = _address;
    }

    /**
     * Set the Input Token Address only by the owner himself
     *
     * @param _address address of token
     */
    function setInputTokenB (address _address) external onlyOwner {
        inputTokenB = _address;
    }

    /**
     * Set the Output Token Address only by the owner himself
     *
     * @param _address address of token
     */
    function setOutputToken (address _address) external onlyOwner {
        outputToken = _address;
    }

    /**
     * Convert an amount of input _token to an equivalent amount of the output token
     *
     * @param _token address of token to swap
     * @param amount amount of token to swap/receive
     */
    function swap(address _token, uint amount) external {
        require(_token == inputTokenA || _token == inputTokenB, "Your token cannot be swapped");
        require(TokenA(_token).balanceOf(msg.sender) >= amount, "Insufficient token balance to swap");

        TokenC(outputToken).mintToAddress(msg.sender, amount);

        TokenA(_token).approveFrom(msg.sender, address(this), amount);
        TokenA(_token).transferFrom(msg.sender, address(this), amount);
    }

    /**
     * Convert an amount of the output token to an equivalent amount of input _token
     *
     * @param _token address of token to receive
     * @param amount amount of token to swap/receive
     */
    function unswap(address _token, uint amount) external {
        require(_token == inputTokenA || _token == inputTokenB, "Your token cannot be swapped");
        require(TokenC(outputToken).balanceOf(msg.sender) >= amount, "Insufficient token balance to swap");

        TokenC(outputToken).approveFrom(msg.sender, address(this), amount);
        TokenC(outputToken).transferFrom(msg.sender, address(this), amount);

        TokenA(_token).transfer(msg.sender, amount);
    }
}
