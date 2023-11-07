import './App.css';
import React from 'react';
import { Container, Navbar, Nav, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Header from './Components/Header'
import Cards from './Components/Cards'

function App() {
  return (
    <div className="App">
       <Header />
      <Cards />
    </div>
  );
}

export default App;
