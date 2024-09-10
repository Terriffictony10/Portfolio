import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import logo from '../logo.png';

const Navigation = ({ account }) => {
  return (
    <Navbar className='my-3'>
      
      <Navbar.Brand href="#">Decentratality DAO</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
