const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const hre = require('hardhat');

describe('Token C', function () {
  const _tokenName = 'Karthik';
  const _tokenSymbol = 'KRT';
  const _totalSupply = '0';
  const _amountToApprove = '100';
  const _amountToMint = '100';

  async function deployToken() {
    const [owner, otherAddress] = await hre.ethers.getSigners();
    const TokenC = await hre.ethers.getContractFactory('TokenC');
    const tokenC = await TokenC.deploy(_tokenName, _tokenSymbol);

    return { tokenC, owner, otherAddress };
  }

  describe('Deployment', function () {
    it(`Check the token name to be ${_tokenName}`, async function () {
      const { tokenC } = await loadFixture(deployToken);

      expect(await tokenC.name()).to.equal(_tokenName);
    });

    it(`Check the token symbol to be ${_tokenSymbol}`, async function () {
      const { tokenC } = await loadFixture(deployToken);

      expect(await tokenC.symbol()).to.equal(_tokenSymbol);
    });

    it('Check the total supply to be equal to 0 token', async function () {
      const { tokenC } = await loadFixture(deployToken);

      const totalSupply = hre.ethers.utils.parseEther(_totalSupply);

      expect(await tokenC.totalSupply()).to.equal(totalSupply);
    });
  });

  describe('Statement', function () {
    it(`Perform approveFrom owner to other address on spending ${_amountToApprove} tokens`, async function () {
      const { tokenC, owner, otherAddress } = await loadFixture(deployToken);

      const approvedAmount = hre.ethers.utils.parseEther(_amountToApprove);

      await tokenC.approveFrom(
        owner.address,
        otherAddress.address,
        approvedAmount,
      );

      expect(
        await tokenC.allowance(owner.address, otherAddress.address),
      ).to.equal(approvedAmount);
    });

    it(`Perform mintToAddress for ${_amountToMint} tokens`, async function () {
      const { tokenC, otherAddress } = await loadFixture(deployToken);

      const mintedAmount = hre.ethers.utils.parseEther(_amountToMint);

      await tokenC.mintToAddress(otherAddress.address, mintedAmount);

      expect(await tokenC.totalSupply()).to.equal(mintedAmount);

      expect(await tokenC.balanceOf(otherAddress.address)).to.equal(
        mintedAmount,
      );
    });
  });
});
