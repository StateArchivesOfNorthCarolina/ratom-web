import React from 'react';
import styled from 'styled-components';
import Button from '../../../Components/Buttons/Button';
import { borderSeparator } from '../../../../styles/styleVariables';

const FilterActions = () => {
    return (
        <FilterActionsStyled>
            <Button neutral small>Reset</Button>
            <Button positive small>Apply</Button>
        </FilterActionsStyled>
    )
}

const FilterActionsStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 3rem 0;
    border-bottom: ${borderSeparator};
`;

export default FilterActions;
