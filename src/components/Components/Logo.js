import React from 'react';
import styled from 'styled-components';

const Logo = props => {
  return <LogoStyled {...props}>[LOGO]</LogoStyled>;
};

const LogoStyled = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: black;
  font-size: ${props => (props.large ? '6rem' : '2.6rem')};
`;

export default Logo;
