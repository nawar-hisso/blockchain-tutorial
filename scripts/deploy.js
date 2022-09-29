const hre = require('hardhat');

async function main() {
  // Deploy the token contract
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy();
  // QUESTION: Why is the following statement?
  await token.deployed();
  const tokenAddress = token.address;
  console.log(`Token address: ${tokenAddress}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
