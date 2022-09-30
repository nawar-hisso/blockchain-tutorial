const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const hre = require('hardhat');

describe('Token A', function () {
  const _tokenName = 'Karthik';
  const _tokenSymbol = 'KRT';
  const _totalSupply = '1000000';
  const _amountToApprove = '100';

  async function deployToken() {
    const [owner, otherAddress] = await hre.ethers.getSigners();
    const TokenA = await hre.ethers.getContractFactory('TokenA');
    const tokenA = await TokenA.deploy(_tokenName, _tokenSymbol);

    return { tokenA, owner, otherAddress };
  }

  describe('Deployment', function () {
    it(`Check the token name to be ${_tokenName}`, async function () {
      const { tokenA } = await loadFixture(deployToken);

      expect(await tokenA.name()).to.equal(_tokenName);
    });

    it(`Check the token symbol to be ${_tokenSymbol}`, async function () {
      const { tokenA } = await loadFixture(deployToken);

      expect(await tokenA.symbol()).to.equal(_tokenSymbol);
    });

    it(`Check the total supply to be equal to ${_totalSupply} token`, async function () {
      const { tokenA } = await loadFixture(deployToken);

      const totalSupply = hre.ethers.utils.parseEther(_totalSupply);

      expect(await tokenA.totalSupply()).to.equal(totalSupply);
    });
  });

  describe('Statement', function () {
    it(`Perform approveFrom owner to other address on spending ${_amountToApprove} tokens`, async function () {
      const { tokenA, owner, otherAddress } = await loadFixture(deployToken);

      const approvedAmount = hre.ethers.utils.parseEther(_amountToApprove);

      await tokenA.approveFrom(
        owner.address,
        otherAddress.address,
        approvedAmount,
      );

      expect(
        await tokenA.allowance(owner.address, otherAddress.address),
      ).to.equal(approvedAmount);
    });
  });
});
