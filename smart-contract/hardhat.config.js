require('@nomiclabs/hardhat-waffle')
require('dotenv').config({ path: '.env' })

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/oL89FHmvkiWEfUgdjWON4NZBnB-497Is",
      accounts: process.env.WALLET_PRIVATE_KEY,
    },
  },
}
