const { task } = require('hardhat/config');
const fs = require('fs');
require('dotenv').config();

task('deployContract', 'Deploy a new contract')
  .addPositionalParam('param1')
  .setAction(async taskArgs => {
    try {
      const contractName = taskArgs.param1;
      // eslint-disable-next-line no-undef
      const Contract = await ethers.getContractFactory(contractName);
      const contract = await Contract.deploy();

      // QUESTION: Why is the following statement?
      await contract.deployed();
      const data = {
        address: contract.address,
        github_repo: process.env.GITHUB_REPO,
      };

      console.log(`Smart Contract address: ${data.address}`);
      fs.writeFileSync(`data/${contractName}.json`, JSON.stringify(data));
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
