import React from 'react';
import styled from 'styled-components';
import { boxShadow, standardPadding } from '../../../styles/styleVariables';
import Logo from '../../Components/Logo';
import { useAuthContext } from '../../Context/auth-provider';

/**
 * MainHeader needs to know:
 *      user info
 * MainHeader needs to be able to do:
 *      logout
 *      navigate to "user profile", if that's a thing
 *      ImportAccount actions, whatever those are
 */

const MainHeader = props => {
  const { onLogout } = useAuthContext();
  return (
    <MainHeaderStyled>
      <LogoStyled />
      <p onClick={onLogout}>Logout</p>
    </MainHeaderStyled>
  );
};

const LogoStyled = styled(Logo)`
  width: 17rem;
`;

const MainHeaderStyled = styled.header`
  height: 6.5rem;
  width: 100%;
  box-shadow: ${boxShadow};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${standardPadding};

  p {
    margin-right: 2rem;
    cursor: pointer;
  }
`;

export default MainHeader;
