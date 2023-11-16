import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import { Container } from 'react-bootstrap';

function Header() {
  const containerStyle = {
    color: '#111', // White text color
    textAlign: 'center', // Center align text
    padding: '1rem', // Add padding for spacing
    position: 'relative',
    borderBottom: '1px solid #dedede', // Dark border on the bottom
  };

  const headingStyle = {
    fontSize: '2.5rem', // Larger font size
    margin: '0', // Remove margin for a cleaner look
    letterSpacing: '2px', // Add letter-spacing for emphasis
    animation: 'fadeInUp 1s ease-in-out', // Apply a fade-in animation
  };

  return (
    <Container style={containerStyle}>
      <h1 style={headingStyle}>Beer Catalog</h1>
    </Container>
  );
}

export default Header;
