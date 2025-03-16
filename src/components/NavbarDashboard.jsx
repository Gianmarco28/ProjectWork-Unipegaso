import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavbarDashboard() {

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">OlivAnalytics</NavbarBrand>  
      </Navbar>
    </>
  );
}

