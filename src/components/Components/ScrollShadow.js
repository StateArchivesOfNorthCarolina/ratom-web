import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorWhite } from '../../styles/styleVariables';

const ScrollShadow = props => {
  return (
    <ScrollShadowStyled {...props}>
      <InnerShadow {...props} />
    </ScrollShadowStyled>
  );
};

const ScrollShadowStyled = styled.div`
  position: absolute;
  ${props => (props.position === 'bottom' ? 'bottom: 0' : 'top: 0')};
  left: 0;
  right: 0;
  height: 8rem;
  width: 100%;
`;

const InnerShadow = styled.div`
  position: fixed;
  z-index: 999;
  height: 8rem;
  width: ${props => props.innerWidth};
  box-shadow: ${props =>
    `inset 0 ${props.position === 'bottom' ? '-' : ''}45px 35px -30px ${colorWhite}`};
`;

ScrollShadow.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']).isRequired,
  innerWidth: PropTypes.string.isRequired
};

export default ScrollShadow;
