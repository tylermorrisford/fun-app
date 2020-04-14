import React from "react";
import styled from 'styled-components'

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

const Link = styled.a`
    text-decoration: none;
    margin: 5px;
    color: white;
`

const Brand = styled.span`
    font-weight: 600;
    margin-right: 25px;
`

const Navbar = () => {
    return(
        <CoolNav>
            <Brand>ThisApp</Brand>
            <Link href="https://google.com">API</Link>
            <Link href="https://google.com">data-vis</Link>
            <Link href="https://google.com">misc.</Link>
        </CoolNav>
    )
}

export default Navbar