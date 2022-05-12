const hre = require('hardhat')

async function main() {
  const MarketCoinFactory = await hre.ethers.getContractFactory('MarketCoin')
  const MarketCoin = await MarketCoinFactory.deploy()

  await MarketCoin.deployed()

  console.log('Market Coin deployed to:', MarketCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
