const hre = require('hardhat');

async function main() {
  // Get owner account to swap
  const [owner] = await hre.ethers.getSigners();

  const TokenA = await hre.ethers.getContractFactory('TokenA');
  const tokenA = await TokenA.attach(
    '0x37656C3F841066756138606c4dAD202cf290f3A3',
  );

  const TokenC = await hre.ethers.getContractFactory('TokenC');
  const tokenC = await TokenC.attach(
    '0x1cCe6F9e37B3E00e3DE597F600B7D89E3807373B',
  );

  const Swapper = await hre.ethers.getContractFactory('Swapper');
  const swapper = await Swapper.attach(
    '0xE5794768F93365B0103bB6D76Afa6A1701596002',
  );

  // Get amount to swap as 1 token
  const amountToSwap = hre.ethers.utils.parseEther('100');

  // Get the owner balance of input token before swap transaction
  const ownerBalanceABeforeSwap = await tokenA.balanceOf(owner.address);
  // Get the owner balance of output token before swap transaction
  const ownerBalanceCBeforeSwap = await tokenC.balanceOf(owner.address);

  // Log this information to the console
  console.log(
    `Owner ${
      owner.address
    } balance of input token before swap: ${ownerBalanceABeforeSwap.toString()}`,
  );
  console.log(
    `Owner ${
      owner.address
    } balance of output token before swap: ${ownerBalanceCBeforeSwap.toString()}`,
  );

  // Make the swap transaction
  await swapper.swap(tokenA.address, amountToSwap);

  // Get the owner balance of input token after swap transaction
  const ownerBalanceAAfterSwap = await tokenA.balanceOf(owner.address);
  // Get the owner balance of output token after swap transaction
  const ownerBalanceCAfterSwap = await tokenC.balanceOf(owner.address);

  // Log this information to the console
  console.log(
    `Owner ${
      owner.address
    } balance of input token after swap: ${ownerBalanceAAfterSwap.toString()}`,
  );
  console.log(
    `Owner ${
      owner.address
    } balance of output token after swap: ${ownerBalanceCAfterSwap.toString()}`,
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
