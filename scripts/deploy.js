const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const name = 'Nawar';
  const symbol = 'NWR';
  // Deploy the token contract
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy(name, symbol);
  // QUESTION: Why is the following statement?
  await token.deployed();
  const tokenAddress = token.address;
  const tokenABI = JSON.parse(token.interface.format('json'));
  const data = {
    address: tokenAddress,
    abi: tokenABI,
  };
  console.log(`Token address: ${tokenAddress}`);
  console.log(`Token ABI: ${JSON.stringify(tokenABI)}`);
  //fs.writeFileSync('Nawar.json', JSON.stringify(data));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
