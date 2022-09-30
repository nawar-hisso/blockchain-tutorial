const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const hre = require('hardhat');

describe('Swapper', async function () {
  // Define variables
  const _tokenName = 'Karthik';
  const _tokenSymbol = 'KRT';
  const _totalSupply = '1000000';
  const _amountToSwap = '100';

  const amountToSwap = hre.ethers.utils.parseEther(_amountToSwap);
  const amountToSwapForB = hre.ethers.utils.parseEther(
    (Number(_amountToSwap) * 2).toString(),
  );
  const totalSupply = hre.ethers.utils.parseEther(_totalSupply);
  const ownerBalanceAfterSwap = hre.ethers.utils.parseEther(
    (Number(_totalSupply) - Number(_amountToSwap)).toString(),
  );

  /**
   * Deploy a new Swapper contract
   * @returns {object}
   */
  async function deploySwapper() {
    const [owner] = await hre.ethers.getSigners();
    const Swapper = await hre.ethers.getContractFactory('Swapper');
    const swapper = await Swapper.deploy();

    return { swapper, owner };
  }

  /**
   * Deploy a new Token contract
   * @returns {object}
   */
  async function deployTokenA() {
    const TokenA = await hre.ethers.getContractFactory('TokenA');
    const tokenA = await TokenA.deploy(_tokenName, _tokenSymbol);

    return { tokenA };
  }

  /**
   * Deploy a new Token contract
   * @returns {object}
   */
  async function deployTokenC() {
    const TokenC = await hre.ethers.getContractFactory('TokenC');
    const tokenC = await TokenC.deploy(_tokenName, _tokenSymbol);

    return { tokenC };
  }

  describe('Deployment', function () {
    it('Check the owner to be correct', async function () {
      const { swapper, owner } = await loadFixture(deploySwapper);

      expect(await swapper.owner()).to.equal(owner.address);
    });
  });

  // Get Swapper and Token contracts
  const { swapper, owner } = await loadFixture(deploySwapper);
  const { tokenA } = await loadFixture(deployTokenA);
  const { tokenA: tokenB } = await loadFixture(deployTokenA);
  const { tokenC } = await loadFixture(deployTokenC);

  describe('Statement', function () {
    it(`Perform swap/unSwap between Token A and Token C of ${_amountToSwap} tokens`, async function () {
      swapper.setInputTokenA(tokenA.address);
      swapper.setOutputToken(tokenC.address);

      // Do Swap of token A
      await swapper.swap(tokenA.address, amountToSwap);

      expect(await tokenA.balanceOf(owner.address)).to.equal(
        ownerBalanceAfterSwap,
      );
      expect(await tokenC.balanceOf(owner.address)).to.equal(amountToSwap);

      expect(await tokenA.balanceOf(swapper.address)).to.equal(amountToSwap);
      expect(await tokenC.balanceOf(swapper.address)).to.equal(0);

      // Do UnSwap of token A
      await swapper.unswap(tokenA.address, amountToSwap);

      expect(await tokenA.balanceOf(owner.address)).to.equal(totalSupply);
      expect(await tokenC.balanceOf(owner.address)).to.equal(0);

      expect(await tokenA.balanceOf(swapper.address)).to.equal(0);
      expect(await tokenC.balanceOf(swapper.address)).to.equal(amountToSwap);
    });

    it(`Perform swap/unSwap between Token B and Token C of ${_amountToSwap} tokens`, async function () {
      swapper.setInputTokenB(tokenB.address);
      swapper.setOutputToken(tokenC.address);

      // Do Swap of token B
      await swapper.swap(tokenB.address, amountToSwap);

      expect(await tokenB.balanceOf(owner.address)).to.equal(
        ownerBalanceAfterSwap,
      );
      expect(await tokenC.balanceOf(owner.address)).to.equal(amountToSwap);

      expect(await tokenB.balanceOf(swapper.address)).to.equal(amountToSwap);
      expect(await tokenC.balanceOf(swapper.address)).to.equal(amountToSwap);

      // Do UnSwap of token B
      await swapper.unswap(tokenB.address, amountToSwap);

      expect(await tokenB.balanceOf(owner.address)).to.equal(totalSupply);
      expect(await tokenC.balanceOf(owner.address)).to.equal(0);

      expect(await tokenB.balanceOf(swapper.address)).to.equal(0);
      expect(await tokenC.balanceOf(swapper.address)).to.equal(
        amountToSwapForB,
      );
    });

    it('Check failed cases for swap/unSwap (Your token cannot be swapped)', async function () {
      swapper.setInputTokenB(tokenB.address);
      swapper.setOutputToken(tokenC.address);

      // Token Not
      await expect(
        swapper.swap(
          '0x37656C3F841066756138606c4dAD202cf290f3A3',
          amountToSwap,
        ),
      ).to.be.revertedWith('Your token cannot be swapped');

      await expect(
        swapper.unswap(
          '0x37656C3F841066756138606c4dAD202cf290f3A3',
          amountToSwap,
        ),
      ).to.be.revertedWith('Your token cannot be swapped');

      await expect(
        swapper.swap(tokenA.address, hre.ethers.utils.parseEther('1000000000')),
      ).to.be.revertedWith('Insufficient token balance to swap');

      await expect(
        swapper.unswap(
          tokenA.address,
          hre.ethers.utils.parseEther('1000000000'),
        ),
      ).to.be.revertedWith('Insufficient token balance to swap');
    });

    it('Check failed cases for swap/unSwap (Insufficient token balance to swap)', async function () {
      swapper.setInputTokenB(tokenB.address);
      swapper.setOutputToken(tokenC.address);

      await expect(
        swapper.swap(tokenA.address, hre.ethers.utils.parseEther('1000000000')),
      ).to.be.revertedWith('Insufficient token balance to swap');

      await expect(
        swapper.unswap(
          tokenA.address,
          hre.ethers.utils.parseEther('1000000000'),
        ),
      ).to.be.revertedWith('Insufficient token balance to swap');
    });
  });
});
