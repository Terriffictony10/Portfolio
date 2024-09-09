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


	const Token = await hre.ethers.getContractFactory("Token")
	const token = await Token.deploy('Decentratality', SYMBOL, MAX_SUPPLY)
	
	

	
	console.log(`Crowdsale Token deployed to: ${token.target}\n`)
	

	const Crowdsale = await hre.ethers.getContractFactory('Crowdsale')
	const crowdsale = await Crowdsale.deploy(token.target, PRICE, ethers.parseUnits(MAX_SUPPLY, 'ether'))
	

	console.log(`Crowdsale deployed to: ${crowdsale.target}\n`)

	let transaction = await token.connect(funder).transfer(crowdsale.target, ethers.parseUnits(MAX_SUPPLY, 'ether'))
	await transaction.wait()

	console.log('Tokens transferred to Crowdsale')

	const DAO = await hre.ethers.getContractFactory('DAO')
  const dao = await DAO.deploy(token.target, '500000000000000000000001')

  console.log(`DAO deployed to: ${dao.target}\n`)
	
	// console.log(`Fetching accounts & network...\n`)

  	
//  	transaction = await token2.transfer(investor1.address, tokens(200000))
//   	await transaction.wait()

//   	transaction = await token2.transfer(investor2.address, tokens(200000))
//  	await transaction.wait()

//   	transaction = await token2.transfer(investor3.address, tokens(200000))
//   	await transaction.wait()

  

//   // Funder sends Ether to DAO treasury
  transaction = await funder.sendTransaction({ to: dao.target, value: ether(1000) }) // 1,000 Ether
  await transaction.wait()
//   	console.log(`Sent funds to dao treasury...\n`)

//   	for (var i = 0; i < 3; i++) {
//       // Create Proposal
//       transaction = await dao.connect(investor1).createProposal(`Proposal ${i + 1}`, ether(100), recipient.address)
//       await transaction.wait()

//       // Vote 1
//       transaction = await dao.connect(investor1).vote(i + 1)
//       await transaction.wait()

//       // Vote 2
//       transaction = await dao.connect(investor2).vote(i + 1)
//       await transaction.wait()

//       // Vote 3
//       transaction = await dao.connect(investor3).vote(i + 1)
//       await transaction.wait()

//       // Finalize
//       transaction = await dao.connect(investor1).finalizeProposal(i + 1)
//       await transaction.wait()

//       console.log(`Created & Finalized Proposal ${i + 1}\n`)
//   }

//     console.log(`Creating one more proposal...\n`)

//     // Create one more proposal
//     transaction = await dao.connect(investor1).createProposal(`Proposal 4`, ether(100), recipient.address)
//     await transaction.wait()

//     // Vote 1
//     transaction = await dao.connect(investor2).vote(4)
//     await transaction.wait()

//     // Vote 2
//     transaction = await dao.connect(investor3).vote(4)
//     await transaction.wait()

//     console.log(`Finished.\n`)
}


main().catch((error => {
	console.error(error);
	process.exitCode = 1;
}))