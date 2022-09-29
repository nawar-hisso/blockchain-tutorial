const hre = require('hardhat');
const fs = require('fs');
require('dotenv').config();

async function main() {
  const name = 'Nawar';
  const symbol = 'NWR';
  // Deploy the token contract
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy(name, symbol);
  // QUESTION: Why is the following statement?
  await token.deployed();
  const data = { address: token.address, github_repo: process.env.GITHUB_REPO };

  console.log(`Token address: ${data.address}`);
  fs.writeFileSync('data.json', JSON.stringify(data));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
