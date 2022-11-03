import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap/";

const Header = ({userInfo, logoutHandler}) => {
  return (
    <Navbar expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">HomePage</Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "200px" }}
          navbarScroll
        >
          {userInfo ? (
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#" onClick={logoutHandler}>Logout</NavDropdown.Item>
              <NavDropdown.Item href="/userpage">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          ) : (
            <>
              <NavDropdown title="User" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">
                  Register
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </>
          )}

          <Nav.Link href="#action2">SwitchMode</Nav.Link>
          <NavDropdown title="Language" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">English</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Polish</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Header;
