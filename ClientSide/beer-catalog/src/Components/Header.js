import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import { Container } from 'react-bootstrap';

function Header() {
  const containerStyle = {
    background: '#ffee8d', // dark background color
    color: '#fff', // text color
    textAlign: 'center', // center align text
    padding: '1rem', // add padding for spacing
  };

  return (
    <Container style={containerStyle}>
      <h1>Beer Catalog</h1>
    </Container>
  );
}


export default Header;
