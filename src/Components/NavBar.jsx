import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/acercadenosotros">Acerca de Nosotros</Nav.Link>
            <Nav.Link href="/administracion">Administracion</Nav.Link> */}
            <NavLink to="/" className={"nav-link "}>Inicio</NavLink>
            <NavLink to="/acercadenosotros" className={"nav-link "}>Acerca de Nosotros</NavLink>
            <NavLink to="/administracion" className={"nav-link "}>Administracion</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
