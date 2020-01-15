import React from 'react';
import styled from 'styled-components';

const FormErrors = ({ errors }) => {
  if (errors && errors.length > 0) {
    return (
      <FormErrorsStyled>
        {errors.map((error, i) => (
          <ErrorListItem key={i}>{error}</ErrorListItem>
        ))}
      </FormErrorsStyled>
    );
  } else return null;
};

const FormErrorsStyled = styled.ul`
  color: ${props => props.theme.colorCaution};
  margin: 1rem 0;
`;

const ErrorListItem = styled.li``;

export default FormErrors;
