import React from 'react';
import styled from 'styled-components'
import '../App.css';

const Home = () => {
    return(
        <header className="App-header">
        <Callout>Welcome to</Callout>
        <Brand>ThisApp!</Brand>
        <Text><Words>ThisApp is just here to keep us (us === me) company during the 'great Quarantine of 2020', due to the Covid-19 pandemic. 
         <br/>Does one capitalize 'pandemic'? I could google it, but... will I? Anywho, I hope you're safe. If you're wondering how many cases 
         of the novel coronavirus there are in my state, click the data-vis link for a handy chart.</Words></Text>
      </header>
    )
}

export default Home;

const Callout = styled.span`
  margin-bottom: 0;
  font-size: 0.8em;
  font-weight: 200;
`

const Brand = styled.h3`
  margin-top: 2px;
`

const Text = styled.div`
  margin: 0 auto:
  padding: 0 25px;
  width: 80%;
`

const Words = styled.p`
font-size: 0.6em;
`