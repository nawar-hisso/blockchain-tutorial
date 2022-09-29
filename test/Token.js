const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const hre = require('hardhat');

describe('Token', function () {
  const _tokenName = 'Nawar';
  const _tokenSymbol = 'NWR';
  const _totalSupply = '1000000';

  async function deployToken() {
    const Token = await hre.ethers.getContractFactory('Token');
    const token = await Token.deploy();

    return { token };
  }

  describe('Deployment', function () {
    it(`Check the token name to be ${_tokenName}`, async function () {
      const { token } = await loadFixture(deployToken);

      expect(await token.name()).to.equal(_tokenName);
    });

    it(`Check the token symbol to be ${_tokenSymbol}`, async function () {
      const { token } = await loadFixture(deployToken);

      expect(await token.symbol()).to.equal(_tokenSymbol);
    });

    it(`Check the total supply to be equal to ${_totalSupply} token`, async function () {
      const { token } = await loadFixture(deployToken);

      const totalSupply = hre.ethers.utils.parseEther(_totalSupply);

      expect(await token.totalSupply()).to.equal(totalSupply);
    });
  });
});
