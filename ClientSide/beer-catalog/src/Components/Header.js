import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">My React-Bootstrap App</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }


  export default Header;
