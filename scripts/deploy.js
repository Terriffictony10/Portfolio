const hre = require("hardhat");
const config = require('../src/config.json')
const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

const ether = tokens

async function main() {
	const SYMBOL = 'DHPT'
	const MAX_SUPPLY = '1000000'
	const PRICE = ethers.parseUnits('0.025', 'ether') 


	const accounts = await ethers.getSigners()
  	const funder = accounts[0]
  	const investor1 = accounts[1]
  	const investor2 = accounts[2]
  	const investor3 = accounts[3]
  	const recipient = accounts[4]


	
	const token = await hre.ethers.deployContract('Token', ['Decentratality', SYMBOL, MAX_SUPPLY])
	
	

	
	console.log(`Crowdsale Token deployed to: ${token.target}\n`)
	

	
	const crowdsale = await hre.ethers.deployContract('Crowdsale', [token.target, PRICE, ethers.parseUnits(MAX_SUPPLY, 'ether')])
	

	console.log(`Crowdsale deployed to: ${crowdsale.target}\n`)

	let transaction = await token.connect(funder).transfer(crowdsale.target, ethers.parseUnits(MAX_SUPPLY, 'ether'))
	await transaction.wait()

	console.log('Tokens transferred to Crowdsale')

	
  const dao = await hre.ethers.deployContract('DAO', [token.target, '500000000000000000000001'])

  console.log(`DAO deployed to: ${dao.target}\n`)
	
  transaction = await funder.sendTransaction({ to: dao.target, value: ether(1000) }) // 1,000 Ether
  await transaction.wait()

}


main().catch((error => {
	console.error(error);
	process.exitCode = 1;
}))