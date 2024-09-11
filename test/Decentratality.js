const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Decentratality', () => {
  let decentratality, accounts, deployer, receiver, exchange

  beforeEach(async () => {
    const Token = await ethers.getContractFactory('Decentratality')
    decentratality = await Token.deploy()

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    receiver = accounts[1]
    exchange = accounts[2]
    user1 = accounts[3]
  })

    
  describe('Restaurant Creation', () => {
    let restaurantAddress, restaurantId, restaurantInstance, ownerBalanceBefore, ownerBalanceAfter;
    describe('Success', () => {
      beforeEach(async () => {
        transaction = await decentratality.createRestaurant('Montecito', ether(100), { value: ether(100) })
        result = await transaction.wait()

        
        const event = result.logs.find(log => 
                log.topics[0] === ethers.id("RestaurantCreated(address,uint256)")
            );

            const decodedEvent = ethers.AbiCoder.defaultAbiCoder().decode(
                ['address', 'uint256'], 
                event.data
            );

            restaurantAddress = decodedEvent[0];
            restaurantId = decodedEvent[1]; // Get the restaurant address from the decoded event // Log the address

            restaurantInstance = await ethers.getContractAt("Restaurant", restaurantAddress);
      })
      it('creates the restaurant and stores it in the restaurants mapping properly', async() => {
        const restaurantContract = await decentratality.restaurants(restaurantId);
        expect(restaurantContract).to.equal(restaurantAddress);
      })
       it('ensures the restaurant has received the starting cash in Ether', async () => {
        // Get the balance of the restaurant contract
        const restaurantBalance = await ethers.provider.getBalance(restaurantAddress);

        // Check that the balance equals 100 ether
        expect(restaurantBalance).to.equal(ether(100));
    });
       it('checks the owner of the restaurant', async () => {
      // Verify that the deployer is the owner of the restaurant
      const owner = await restaurantInstance.owner();
      expect(owner).to.equal(deployer.address);
    });


       it('emits the fundsAdded event with correct arguments', async () => {
            // Ensure the fundsAdded event is emitted with the correct arguments
            await expect(transaction)
                .to.emit(decentratality, 'fundsAdded')
                .withArgs(restaurantAddress, restaurantId, (await ethers.provider.getBlock(result.blockNumber)).timestamp);
        });

        describe('payOwner Function', () => {
      it('payOwner pays owner', async () => {
        // Call payOwner to pay the deployer (owner) 50 Ether
        transaction = await restaurantInstance.connect(deployer).payOwner(ether(50));
        await expect(transaction.wait()).to.not.be.reverted;
      });

      it('ACTUALLY pays owner', async () => {
    // Record owner's balance before calling payOwner
    const ownerBalanceBefore = await ethers.provider.getBalance(deployer.address);
  
    // Call payOwner to pay the deployer (owner) 50 Ether
    transaction = await restaurantInstance.connect(deployer).payOwner(ether(50));
    const txReceipt = await transaction.wait(); // Wait for the transaction receipt

    // Get contract balance after calling payOwner
    const contractBalanceAfter = await ethers.provider.getBalance(restaurantAddress);
    expect(contractBalanceAfter).to.equal(ether(50)); // Ensure contract has 50 ether left

    // Get owner's balance after calling payOwner
    const ownerBalanceAfter = await ethers.provider.getBalance(deployer.address);

    // Calculate the gas cost
    const gasUsed = BigInt(txReceipt.gasUsed);
    const gasPrice = BigInt(transaction.gasPrice);
    const gasCost = gasUsed * gasPrice;

    // Check that the owner's balance increased by approximately 50 Ether (minus gas costs)
    expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore + ether(49n) - gasCost); // Adjust for gas
      });
    });
  });

    

    describe('Failure', async () => {
      it('rejects restaurant creation by non-token holders', async () => {
            // Transfer all tokens from user1 to deployer to ensure user1 has no tokens
            await decentratality.connect(user1).transfer(deployer.address, await decentratality.balanceOf(user1.address));

            // Try to create a restaurant with user1 (who now has no tokens)
            await expect(
                decentratality.connect(user1).createRestaurant('Santa Barbara', ether(100), { value: ether(100) })
            ).to.be.revertedWith('must be token holder');
        });
    })

  })

})