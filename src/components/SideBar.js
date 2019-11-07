import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

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

  h2 {
    color: black;
    size: ;
  }
`;

const SideBar = props => {
  return (
    <SideBarStyled {...props}>
      <h2>Collections</h2>
      <nav>
        <Link to="/collection/1">Collection 1</Link>
      </nav>
      <nav>
        <Link to="/collection/2">Collection 2</Link>
      </nav>
      <br />
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </SideBarStyled>
  );
};

export default SideBar;
