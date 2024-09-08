import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navigation from './DAONavigation';
import Create from './DAOCreate';
import Proposals from './DAOProposals';
import Loading from './DAOLoading';
import Link from 'next/link';

// ABIs: Import your contract ABIs here
import DAO_ABI from '../abis/DAO.json'

// Config: Import your network config here
import config from '../config.json';

function App2() {
  const [provider, setProvider] = useState(null)
  const [dao, setDao] = useState(null)
  const [treasuryBalance, setTreasuryBalance] = useState(0)

  const [account, setAccount] = useState(null)

  const [proposals, setProposals] = useState(null)
  const [quorum, setQuorum] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)

    const { chainId } = await provider.getNetwork()

    // Initiate contracts
    const dao = new ethers.Contract(config[chainId].DAO.address, DAO_ABI, provider)
    setDao(dao)

    // Fetch treasury balance
    let treasuryBalance = await provider.getBalance(dao.target)
    treasuryBalance = ethers.formatUnits(treasuryBalance, 18)
    setTreasuryBalance(treasuryBalance)

    // Fetch accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.getAddress(accounts[0])
    console.log(account, 'whiskers')
    setAccount(account)

    // Fetch proposals count
    const count = await dao.proposalCount()
    const items = []

    for(var i = 0; i < count; i++) {
      const proposal = await dao.proposals(i + 1)
      items.push(proposal)
    }

    setProposals(items)

    // Fetch quorum
    setQuorum(await dao.quorum())

    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData()
    }
  }, [isLoading]);

  return(
    <Container>
      <Navigation account={account} />

      <h1 className='my-4 text-center'>Welcome to our DAO!</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Create
            provider={provider}
            dao={dao}
            setIsLoading={setIsLoading}
          />

          <hr/>

          <p className='text-center'><strong>Treasury Balance:</strong> {treasuryBalance} ETH</p>

          <hr/>

          <Proposals
            provider={provider}
            dao={dao}
            proposals={proposals}
            quorum={quorum}
            setIsLoading={setIsLoading}
          />
        </>
      )}
      <div className="text-center my-4">
        <Link href="/">
          <div>Go to Crowdsale</div>
        </Link>
      </div>
    </Container>
  )
}

export default App2;
