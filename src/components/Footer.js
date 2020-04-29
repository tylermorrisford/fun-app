import React from 'react';
import styled from 'styled-components'
import '../App.css';

const Footer = () => {

    const currentDate = new Date();
    
    return (
        <Foot>
            <p>© {currentDate.getFullYear()} tyler morris ford</p>
            <Email href="mailto:tylerford@gmail.com">send me an email</Email>
        </Foot>

    )
}

export default Footer

const Foot = styled.footer`
margin: 0;
width: 100%;
height: 80px;
background-color: #494A5F;
color: white;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`
const Email = styled.a`
margin-left: 20px;
color: white;
`