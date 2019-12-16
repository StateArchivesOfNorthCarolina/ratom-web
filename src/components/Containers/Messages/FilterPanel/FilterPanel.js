import React from "react";
import styled from "styled-components";
import FilterActions from "./FilterActions";

const FilterPanel = () => {
  return (
    <FilterPanelStyled>
      <h4>Filter Panel</h4>
      <FilterActions />
    </FilterPanelStyled>
  );
};

const FilterPanelStyled = styled.aside`
  width: 26rem;
  height: auto;

  display: flex;
  flex-direction: column;

  h4 {
    text-align: center;
    padding: 2rem;
  }
`;

export default FilterPanel;
