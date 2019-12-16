import React from 'react';
import styled from 'styled-components';
import { boxShadow, standardPadding } from '../../../styles/styleVariables';
import Logo from '../../Components/Logo';


/**
 * MainHeader needs to know:
 *      user info
 * MainHeader needs to be able to do:
 *      logout
 *      navigate to "user profile", if that's a thing
 *      ImportAccount actions, whatever those are
 */

const MainHeader = props => { 
    return (
        <MainHeaderStyled>
            <Logo />
        </MainHeaderStyled>
    )
}

const MainHeaderStyled = styled.header`
    height: 6.5rem;
    width: 100%;
    box-shadow: ${boxShadow};

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${standardPadding};

`;



export default MainHeader;
