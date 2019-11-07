import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const SideBarStyled = styled.aside`
    width: 300px;
    background-color: ${props => props.theme.secondaryBackground};
    border: 1px solid pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    nav {
        color: ${props => props.theme.secondaryText};
        font-weight: bold;
        border: ${props => `2px solid ${props.theme.colorPrimary}`};
        padding: 1rem;
        width: 100px;
    }
`;

const SideBar = props => {
    return (
        <SideBarStyled {...props} >
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </SideBarStyled>
    )    
}

export default SideBar
