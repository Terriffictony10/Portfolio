import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import logo from '../logo.png';

const Navigation = ({ account, accountBalance }) => {
  return(
    <Navbar>
    
    
       {account && (
        <Nav>
            <div className="accountsAndBalance">
              <p className="no-padding-right"><strong>Account:</strong> {account}</p>
              <p className="no-padding-right"><strong>Tokens Owned:</strong> {accountBalance}</p>
            </div>
         
        </Nav>
      )}
    </Navbar>
    
  )
}

export default Navigation;