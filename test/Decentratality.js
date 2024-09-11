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

  describe('Deployment', () => {
    const name = 'Decentratality'
    const symbol = 'DHPT'
    const decimals = '18'
    const totalSupply = tokens('1000000')

    it('has correct name', async () => {
      expect(await decentratality.name()).to.equal(name)
    })

    it('has correct symbol', async () => {
      expect(await decentratality.symbol()).to.equal(symbol)
    })

    it('has correct decimals', async () => {
      expect(await decentratality.decimals()).to.equal(decimals)
    })

    it('has correct total supply', async () => {
      expect(await decentratality.totalSupply()).to.equal(totalSupply)
    })

    it('assigns total supply to deployer', async () => {
      expect(await decentratality.balanceOf(deployer.address)).to.equal(totalSupply)
    })

  })


  describe('Sending Tokens', () => {
    let amount, transaction, result

    describe('Success', () => {

      beforeEach(async () => {
        amount = tokens(100)
        transaction = await decentratality.connect(deployer).transfer(receiver.address, amount)
        result = await transaction.wait()
      })

      it('transfers decentratality balances', async () => {
        expect(await decentratality.balanceOf(deployer.address)).to.equal(tokens(999900))
        expect(await decentratality.balanceOf(receiver.address)).to.equal(amount)
      })

      it('emits a Transfer event', async () => {
        await expect(transaction).to.emit(decentratality, 'Transfer').
          withArgs(deployer.address, receiver.address, amount)
      })

    })

    describe('Failure', () => {
      it('rejects insufficient balances', async () => {
        const invalidAmount = tokens(100000000)
        await expect(decentratality.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
      })

      it('rejects invalid recipent', async () => {
        const amount = tokens(100)
        await expect(decentratality.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
      })

    })

  })

  describe('Approving Tokens', () => {
    let amount, transaction, result

    beforeEach(async () => {
      amount = tokens(100)
      transaction = await decentratality.connect(deployer).approve(exchange.address, amount)
      result = await transaction.wait()
    })

    describe('Success', () => {
        it('allocates an allowance for delegated decentratality spending', async () => {
        expect(await decentratality.allowance(deployer.address, exchange.address)).to.equal(amount)
      })

      it('emits an Approval event', async () => {
        await expect(transaction).to.emit(decentratality, 'Approval').
          withArgs(deployer.address, exchange.address, amount)
      })

    })

    describe('Failure', () => {
      it('rejects invalid spenders', async () => {
        await expect(decentratality.connect(deployer).approve('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
      })
    })

  })

  describe('Delegated Token Transfers', () => {
    let amount, transaction, result

    beforeEach(async () => {
      amount = tokens(100)
      transaction = await decentratality.connect(deployer).approve(exchange.address, amount)
      result = await transaction.wait()
    })

    describe('Success', () => {
      beforeEach(async () => {
        transaction = await decentratality.connect(exchange).transferFrom(deployer.address, receiver.address, amount)
        result = await transaction.wait()
      })

      it('transfers decentratality balances', async () => {
        expect(await decentratality.balanceOf(deployer.address)).to.be.equal(ethers.parseUnits('999900', 'ether'))
        expect(await decentratality.balanceOf(receiver.address)).to.be.equal(amount)
      })

      it('rests the allowance', async () => {
        expect(await decentratality.allowance(deployer.address, exchange.address)).to.be.equal(0)
      })

      it('emits a Transfer event', async () => {
        await expect(transaction).to.emit(decentratality, 'Transfer').
          withArgs(deployer.address, receiver.address, amount)
      })

    })

    describe('Failure', async () => {
      // Attempt to transfer too many tokens
      const invalidAmount = tokens(100000000) // 100 Million, greater than total supply
      await expect(decentratality.connect(exchange).transferFrom(deployer.address, receiver.address, invalidAmount)).to.be.reverted
    })

  })
  describe('Restaurant Creation', () => {
    let restaurantAddress, restaurantId;
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

       it('emits the fundsAdded event with correct arguments', async () => {
            // Ensure the fundsAdded event is emitted with the correct arguments
            await expect(transaction)
                .to.emit(decentratality, 'fundsAdded')
                .withArgs(restaurantAddress, restaurantId, (await ethers.provider.getBlock(result.blockNumber)).timestamp);
        });

    })

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