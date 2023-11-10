import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import { Container } from 'react-bootstrap';
import BubbleHeader from './BubbleHeader';
import './Header.css'
function Header() {
  const containerStyle = {
    background: '#111', // dark background color
    color: '#fff', // text color
    textAlign: 'center', // center align text
    padding: '1rem', // add padding for spacing
  };

  return (
    <Container style={containerStyle}>
      <h1>Beer Catalog</h1>
      <BubbleHeader />

    </Container>
  );
}


export default Header;
