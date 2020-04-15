import React from "react";
import {
    Link
  } from "react-router-dom";
import styled from 'styled-components';

const CoolNav = styled.nav`
    height: 100px;
    width: 100%;
    background-color: #494A5F;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const linkStyle = {
    textDecoration: 'none', 
    margin: 10, 
    color: 'white'
}

const brandStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 700,
    marginRight: 25
}

const Navbar = () => {
    return(
        <CoolNav>
            <Link style={brandStyle} to="/">ThisApp</Link>
            <Link style={linkStyle} to="/api">API</Link>
            <Link style={linkStyle} to="/data">data-vis</Link>
            <Link style={linkStyle} to="/misc">misc.</Link>
        </CoolNav>
    )
}

export default Navbar