import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ethers } from 'ethers';
import Link from 'next/link';

// Components
import Navigation from './crowdsaleNavigation';
import Buy from './crowdsaleBuy';
import Progress from './crowdsaleProgress';
import Loading from './crowdsaleLoading';

// Artifacts
import CROWDSALE_ABI from '../abis/Crowdsale.json';
import TOKEN_ABI from '../abis/Token.json';

// Config
import config from '../config.json';

function App1() {
  const [provider, setProvider] = useState(null);
  const [crowdsale, setCrowdsale] = useState(null);

  const [account, setAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);

  const [price, setPrice] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [tokensSold, setTokensSold] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const loadBlockchainData = async () => {
    // Instantiate provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    // Fetch Chain ID
    const { chainId } = await provider.getNetwork();

    // Instantiate contracts
    const token = new ethers.Contract(config[chainId].token.address, TOKEN_ABI, provider);
    const crowdsale = new ethers.Contract(config[chainId].crowdsale.address, CROWDSALE_ABI, provider);
    setCrowdsale(crowdsale);

    // Fetch account
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.getAddress(accounts[0]);
    setAccount(account);

    // Fetch account balance
    const accountBalance = ethers.formatUnits(await token.balanceOf(account), 18);
    setAccountBalance(accountBalance);

    // Fetch price
    const price = ethers.formatUnits(await crowdsale.price(), 18);
    setPrice(price);

    // Fetch max tokens
    const maxTokens = ethers.formatUnits(await crowdsale.maxTokens(), 18);
    setMaxTokens(maxTokens);

    // Fetch tokens sold
    const tokensSold = ethers.formatUnits(await crowdsale.tokensSold(), 18);
    setTokensSold(tokensSold);

    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData();
    }
  }, [isLoading, maxTokens, tokensSold]);

  return (
    <Container>
      <Navigation account={account} accountBalance={accountBalance} />

      <div className="text-layer">
        <h1 className='faded-bg-large text-overlay'>DECENTRATALITY</h1>
        <h1 className='faded-bg-large text-overlay'>DECENTRATALITY</h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className='text-center'><strong>Current Price:</strong> {price} ETH</p>
          <Buy provider={provider} price={price} crowdsale={crowdsale} setIsLoading={setIsLoading} />
          <Progress maxTokens={maxTokens} tokensSold={tokensSold} />
        </>
      )}

      <hr />

      <div className="text-center my-4">
        <Link href="/second">
          <div>Go to DAO</div>
        </Link>
      </div>
      
    </Container>
  );
}

export default App1;
