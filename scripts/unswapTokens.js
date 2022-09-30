const hre = require('hardhat');

async function main() {
  // Get owner account to unSwap
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

  // Get amount to unSwap as 1 token
  const amountToUnSwap = hre.ethers.utils.parseEther('100');

  // Get the owner balance of input token before unSwap transaction
  const ownerBalanceABeforeUnSwap = await tokenA.balanceOf(owner.address);
  // Get the owner balance of output token before unSwap transaction
  const ownerBalanceCBeforeUnSwap = await tokenC.balanceOf(owner.address);

  // Log this information to the console
  console.log(
    `Owner ${
      owner.address
    } balance of input token before unSwap: ${ownerBalanceABeforeUnSwap.toString()}`,
  );
  console.log(
    `Owner ${
      owner.address
    } balance of output token before unSwap: ${ownerBalanceCBeforeUnSwap.toString()}`,
  );

  // Make the unSwap transaction
  await swapper.unswap(tokenA.address, amountToUnSwap);

  // Get the owner balance of input token after unSwap transaction
  const ownerBalanceAAfterUnSwap = await tokenA.balanceOf(owner.address);
  // Get the owner balance of output token after unSwap transaction
  const ownerBalanceCAfterUnSwap = await tokenC.balanceOf(owner.address);

  // Log this information to the console
  console.log(
    `Owner ${
      owner.address
    } balance of input token after unSwap: ${ownerBalanceAAfterUnSwap.toString()}`,
  );
  console.log(
    `Owner ${
      owner.address
    } balance of output token after unSwap: ${ownerBalanceCAfterUnSwap.toString()}`,
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
