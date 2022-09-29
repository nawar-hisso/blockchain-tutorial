require('@nomicfoundation/hardhat-toolbox');

const MUMBAI_RPC_URL =
  'https://polygon-mumbai.g.alchemy.com/v2/bb9uBu19CPKGCZvDpBdtZHc-8b3kAN-g';
const PRIVATE_KEY =
  'cc292faf9ad5ee7860f3050c73f71c40bf2aeefbdff337769bfcfd95c1575b5e';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
