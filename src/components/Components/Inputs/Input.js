import React from 'react';
import styled from 'styled-components';

const FieldSetStyled = styled.div`
    display: flex;
    flex-direction: column;
`

const LabelStyled = styled.label`
    margin-bottom: 1rem;
`

const InputStyled = styled.input`
    max-width: 38rem;
    height: 2.3rem;
    padding: 1rem 2rem;
`

const Input = ({ label, ...props}) => {
    return (
      <FieldSetStyled>
        <LabelStyled>{label}</LabelStyled>
        <InputStyled {...props} type={props.type || "text"} />
      </FieldSetStyled>
    );
}

export default Input
