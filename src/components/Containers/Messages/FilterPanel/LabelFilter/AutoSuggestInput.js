import React from 'react';
import styled from 'styled-components';

const AutoSuggestInput = inputProps => {
  return (
    <AutoSuggestInputStyled>
      <InputStyled {...inputProps} />
    </AutoSuggestInputStyled>
  );
};

const AutoSuggestInputStyled = styled.div``;

const InputStyled = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colorGrey};
`;

export default AutoSuggestInput;
