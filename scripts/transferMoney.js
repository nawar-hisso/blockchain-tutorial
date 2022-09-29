const hre = require('hardhat');

async function main() {
  // Get owner account and another account to send to
  const [owner] = await hre.ethers.getSigners();

  const myAddress = { address: '0x497cd0b41dC2ADE91d9db0108977d8c2B5C32319' };

  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.attach(
    '0xF0379849043B010BBA32578D6F54dC8C2e39E979', // The deployed token contract address
  );

  // Get amount to send as 1 token
  const amountToSend = hre.ethers.utils.parseEther('1');

  // Get the owner balance before any transaction
  const ownerBalanceBeforeTransfer = await token.balanceOf(owner.address);
  // Get the other account balance before any transaction
  const myAddressBalanceBeforeTransfer = await token.balanceOf(
    myAddress.address,
  );

  // Log this information to the console
  console.log(
    `Balance of owner ${
      owner.address
    } before send: ${ownerBalanceBeforeTransfer.toString()}`,
  );
  console.log(
    `Balance of address ${
      myAddress.address
    } before send: ${myAddressBalanceBeforeTransfer.toString()}`,
  );

  // Make the transfer transaction
  await token.transfer(myAddress.address, amountToSend);

  // Get the owner balance after any transaction
  const ownerBalanceAfterTransfer = await token.balanceOf(owner.address);
  // Get the other account balance after any transaction
  const myAddressBalanceAfterTransfer = await token.balanceOf(
    myAddress.address,
  );

  // Log this information to the console
  console.log(
    `Balance of owner ${
      owner.address
    } after send: ${ownerBalanceAfterTransfer.toString()}`,
  );
  console.log(
    `Balance of address ${
      myAddress.address
    } after send: ${myAddressBalanceAfterTransfer.toString()}`,
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
