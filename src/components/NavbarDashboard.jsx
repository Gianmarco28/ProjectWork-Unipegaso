import logo from "../assets/logo.png";
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavbarDashboard() {

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: 120, height: 70}}
          />
        </NavbarBrand>
      </Navbar>

    </>
  );
}

