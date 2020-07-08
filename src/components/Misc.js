import React from 'react';
import styled from 'styled-components'
import '../App.css';


const About = () => {
    return(
        <header className="App-header">
        <Brand>Some stuff about me</Brand>
        <Callout>I'm a software engineer in SLC</Callout><br/>
        <Callout>When we're not dealing with a pandemic, <br/>I like to play hockey and enjoy a beer with friends. *sigh*</Callout>
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