
// import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Styles.scss';

function Header() {

  let navigate = useNavigate();

  function Homepage(e) {
    e.preventDefault();

    navigate('/home')


  }


  // const { currency, setCurrency } = CryptoState()

  return (<Container>
    <Navbar className="header">



      <Navbar.Brand className='logo' onClick={Homepage}>SourceFinder</Navbar.Brand>

      <Nav className="Nav">
        <Link to="/dataset"><Nav.Link href="/dataset" style={{ margin: "10px", color: "white" }}>Dataset</Nav.Link></Link>
        {/* <Link to='/home'><Nav.Link href="" style={{ margin: "10px", color: "white" }}>Developers</Nav.Link></Link>
        <Link to='/home'><Nav.Link href="" style={{ margin: "10px", color: "white" }}>About</Nav.Link></Link> */}
      </Nav>

    </Navbar>

  </Container>);
}

export default Header;