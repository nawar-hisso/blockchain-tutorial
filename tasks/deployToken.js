const { task } = require('hardhat/config');
const fs = require('fs');
require('dotenv').config();

task('deployToken', 'Deploy ERC20 token')
  .addPositionalParam('param1')
  .addPositionalParam('param2')
  .addPositionalParam('param3')
  .setAction(async taskArgs => {
    try {
      const tokenContract = taskArgs.param1;
      const name = taskArgs.param2;
      const symbol = taskArgs.param3;
      // Deploy the token contract
      // eslint-disable-next-line no-undef
      const Token = await ethers.getContractFactory(tokenContract);
      const token = await Token.deploy(name, symbol);
      // QUESTION: Why is the following statement?
      await token.deployed();
      const data = {
        address: token.address,
        github_repo: process.env.GITHUB_REPO,
      };
      console.log(`Token address: ${data.address}`);
      fs.writeFileSync(`data/${name}.json`, JSON.stringify(data));
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
