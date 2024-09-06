const hre = require("hardhat");

async function main() {
	const NAME = 'Decentratality'
	const SYMBOL = 'DHPT'
	const MAX_SUPPLY = '1000000'
	const PRICE = ethers.parseUnits('0.025', 'ether') 


	const Token = await hre.ethers.getContractFactory("Token")
	let token = await Token.deploy('Decentratality', 'DHPT', '1000000')

	
	console.log(`Token deployed to: ${token.target}\n`)

	const Crowdsale = await hre.ethers.getContractFactory('Crowdsale')
	const crowdsale = await Crowdsale.deploy(token.target, PRICE, ethers.parseUnits(MAX_SUPPLY, 'ether'))
	

	console.log(`Crowdsale deployed to: ${crowdsale.target}\n`)

	// send tokens to crowdsale

	const transaction = await token.transfer(crowdsale.target, ethers.parseUnits(MAX_SUPPLY, 'ether'))
	await transaction.wait()

	console.log('Tokens transferred to Crowdsale')
}


main().catch((error => {
	console.error(error);
	process.exitCode = 1;
}))