import React from 'react';
import styled from 'styled-components'
import '../App.css';

const Footer = () => {

    const currentDate = new Date();
    
    const Foot = styled.footer`
        margin: 0;
        width: 100%;
        height: 70px;
        background-color: #494A5F;
        color: white;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    `

    return (
        <Foot>
            © {currentDate.getFullYear()} tyler morris ford
        </Foot>

    )
}

export default Footer