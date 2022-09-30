# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Steps:

1- Create Smart Contract
2- Create deploy.js file
3- Use `npx hardhat deployToken TokenContractName TokenName TokenSymbol --network mumbai` command to run the deployment task on polygon mumbai network
4- Check network list available to verify from the hardhat framework `npx hardhat verify --list-networks`
5- Use `npx hardhat verify --contract contracts/SCFileName.sol:SCName --network mumbai SMART_CONTRACT_ADDRESS "Smart Contract Parameter 1" "Smart Contract Parameter 2"` to verify on polygon mumbai network
6- Use `npx hardhat deployContract ContractName --network mumbai` command to run the deployment task on polygon mumbai network
