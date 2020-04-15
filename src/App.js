import React from 'react';
import Navbar from './components/Navbar';
import styled from 'styled-components'
import './App.css';

const Callout = styled.span`
  margin-bottom: 0;
  font-size: 0.8em;
  font-weight: 200;
`

const Brand = styled.h3`
  margin-top: 2px;
`

function App() {
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <Callout>Welcome to</Callout>
        <Brand>ThisApp!</Brand>
      </header>
    </div>
  );
}

export default App;
