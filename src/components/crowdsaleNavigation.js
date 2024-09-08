import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import logo from '../logo.png';

const Navigation = () => {
  return(
    <Navbar>
    <Image 
    src={logo} 
    alt="logo" 
    width="40" 
    height="40"
    className="d-inline-block align-top mx-3"
    />
    <Navbar.Brand href="#">Decentratality ICO Crowdsale</Navbar.Brand>
    </Navbar>
    
  )
}

export default Navigation;