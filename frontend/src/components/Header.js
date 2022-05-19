
// import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Styles.scss';
import { Grid } from '@material-ui/core';

function Header() {

  let navigate = useNavigate();

  function Homepage(e) {
    e.preventDefault();

    navigate('/sourcefinder')


  }


  // const { currency, setCurrency } = CryptoState()

  return (

    <Grid container >
      <Grid item xs={12} >

        <Navbar className="header">



          <Navbar.Brand className='logo' onClick={Homepage}>SourceFinder</Navbar.Brand>
          
          <Nav className="Nav">
            <Link to="/database"><Nav.Link href="/database" style={{ margin: "10px", color: "white", fontWeight: "bold" }}>Database</Nav.Link></Link>
            {/* <Link to='/sourcefinder'><Nav.Link href="" style={{ margin: "10px", color: "white" }}>Developers</Nav.Link></Link>
        <Link to='/sourcefinder'><Nav.Link href="" style={{ margin: "10px", color: "white" }}>About</Nav.Link></Link> */}
          </Nav>

        </Navbar>
      </Grid>
    </Grid>
  );
}

export default Header;