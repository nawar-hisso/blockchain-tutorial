const hre = require('hardhat');

async function main() {
  // Get owner account and another account to send to
  const [owner, otherAccount] = await hre.ethers.getSigners();

  // Get amount to send as 1 token
  const amountToSend = hre.ethers.utils.parseEther('1');

  // Deploy the token contract
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy();
  // QUESTION: Why is the following statement?
  await token.deployed();

  // Get the owner balance before any transaction
  const ownerBalanceBeforeTransfer = await token.balanceOf(owner.address);
  // Get the other account balance before any transaction
  const otherAccountBalanceBeforeTransfer = await token.balanceOf(
    otherAccount.address,
  );

  // Log this information to the console
  console.log(
    `Balance of owner ${owner.address} before send: `,
    ownerBalanceBeforeTransfer.toString(),
  );
  console.log(
    `Balance of address ${otherAccount.address} before send: `,
    otherAccountBalanceBeforeTransfer.toString(),
  );

  // Make the transfer transaction
  const transferred = await token.transfer(otherAccount.address, amountToSend);

  // Get the owner balance after any transaction
  const ownerBalanceAfterTransfer = await token.balanceOf(owner.address);
  // Get the other account balance after any transaction
  const otherAccountBalanceAfterTransfer = await token.balanceOf(
    otherAccount.address,
  );

  // Log this information to the console
  console.log(
    `Balance of owner ${owner.address} after send: `,
    ownerBalanceAfterTransfer.toString(),
  );
  console.log(
    `Balance of address ${otherAccount.address} after send: `,
    otherAccountBalanceAfterTransfer.toString(),
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
