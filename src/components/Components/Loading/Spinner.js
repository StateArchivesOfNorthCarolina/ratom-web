import React, { useState, useEffect } from 'react';
import styled, { withTheme, css } from 'styled-components';
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = props => {
  const [show, setShow] = useState(false);
  const height = props.large ? 75 : 25;
  const width = height;

  let color = props.theme.colorPrimary;
  if (props.positive) {
    color = props.theme.textColorLight;
  }
  if (props.neutral) {
    color = props.theme.colorPrimary;
  }
  if (props.negative) {
    color = props.theme.textColorLight;
  }

  useEffect(() => {
    // Don't show spinner right away-- let fast stuff happen fast.
    // TODO: Ideally, this would be wrapped at a higher level so that the original content doesn't flash away.
    if (props.immediate) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [props]);

  if (!show) return null;
  return (
    <SpinnerStyled variants={spinnerVariants} {...props}>
      <LoaderStyled type="Watch" color={color} height={height} width={width} {...props} />
    </SpinnerStyled>
  );
};

const SpinnerStyled = styled(motion.div)``;

const LoaderStyled = styled(Loader)`
  ${props => {
    if (props.flex)
      return css`
        flex: 1;
        display: flex;
        justify-content: center;
      `;
  }}
`;

// Animations
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const spinnerVariants = {
  initial: { y: 15, opacity: 0 },
  enter: { y: 0, opacity: 1, transition },
  exit: {
    y: 15,
    opacity: 0,
    transition: { duration: 1.5, ...transition }
  }
};

export default withTheme(Spinner);
