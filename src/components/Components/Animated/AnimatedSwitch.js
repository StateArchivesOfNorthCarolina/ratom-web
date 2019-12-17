import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Switch, useLocation } from 'react-router-dom';

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    duration: 100,
    beforeChildren: true
  },
  exit: { opacity: 0 }
});

const AnimatedSwitch = props => {
  const location = useLocation()
  return (
    <PoseGroup {...props}>
      <RoutesContainer key={location.pathname}>
        <Switch location={location}>
          {props.children}
        </Switch>
      </RoutesContainer>
    </PoseGroup>
  )
}

export default AnimatedSwitch;
