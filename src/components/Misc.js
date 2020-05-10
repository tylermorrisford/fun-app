import React from 'react';
import styled from 'styled-components'
import '../App.css';


const About = () => {
    return(
        <header className="App-header">
        <Callout>this will be</Callout>
        <Brand>Some stuff about me</Brand>
        <p>when i get around to it.</p>
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