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
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">OlivAnalytics</NavbarBrand>  
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>  
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="#dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#graphs">Grafici</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#report">Report</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

