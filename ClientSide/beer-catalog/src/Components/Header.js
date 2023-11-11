import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import { Container } from 'react-bootstrap';
function Header() {
  const containerStyle = {
    background: 'inherit',
    color: '#111', // text color
    textAlign: 'center', // center align text
    padding: '1rem', // add padding for spacing
    position: 'relative',
  };

  return (
    <Container style={containerStyle}>
      <h1>Beer Catalog</h1>
    </Container>
  );
}


export default Header;
