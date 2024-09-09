import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import logo from '../logo.png';

const Navigation = ({ account, accountBalance }) => {
  return(
    <Navbar>
    
    
       {account && (
        <Nav className="nav-position">
          <div className="accountsAndBalance-container">
            <div className="accountsAndBalance">
              <p className="no-padding"><strong>Account:</strong> {account}</p>
              <p className="no-padding"><strong>Tokens Owned:</strong> {accountBalance}</p>
            </div>
          </div>
        </Nav>
      )}
    </Navbar>
    
  )
}

export default Navigation;