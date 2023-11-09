import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Header from './Components/Header'
import Cards from './Components/Cards'
import Bubble from './Components/bubble';

function App() {
  return (
    <div className="App">
       <Header />
      <Cards />
      <Bubble />
    </div>
  );
}

export default App;
