import React, { Children } from 'react';
import posed from 'react-pose';

const ListContainer = posed.ul({
  enter: { staggerChildren: 20 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});

const Item = posed.li({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

const AnimatedList = props => {
  return (
    <ListContainer>
      {Children.map(props.children, (child, i) =>
        <Item>
          {child}
        </Item>
      )}
    </ListContainer>
  )
}

export default AnimatedList;