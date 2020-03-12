import React from 'react';
import styled from 'styled-components';

import DEFAULT_LOGO from '../../assets/img/RATOM_Vector_Logo_v1_600px.png';

const Logo = props => {
  return (
    <LogoStyled {...props}>
      <img src={DEFAULT_LOGO} alt="RATOM logo" />
    </LogoStyled>
  );
};

const LogoStyled = styled.div`
  img {
    max-width: 100%;
  }
`;

export default Logo;
