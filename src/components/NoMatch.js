import React from 'react';
import styled from 'styled-components'
import '../App.css';
import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none',
    fontSize: '0.6em', 
    margin: 20, 
    color: 'white'
}

const NoMatch = () => {
    return(
        <header className="App-header">
        <Brand>Sorry...</Brand>
        <Callout>looks like that page doesn't exist.</Callout>
        <Link style={linkStyle} to='/'>head to the home page &rarr;</Link>
      </header>
    )
}

export default NoMatch;

const Callout = styled.span`
  margin-top: 0;
  font-size: 0.8em;
  font-weight: 200;
`

const Brand = styled.h3`
  margin-top: 2px;
  marging-bottom: 0;
`