import React from 'react';
import styled from 'styled-components'
import '../App.css';


const About = () => {
    return(
        <header className="App-header">
        <Callout>this is</Callout>
        <Brand>Miscellaneous stuff...</Brand>
      </header>
    )
}

export default About;


const Callout = styled.span`
  margin-bottom: 0;
  font-size: 0.8em;
  font-weight: 200;
`

const Brand = styled.h3`
  margin-top: 2px;
`