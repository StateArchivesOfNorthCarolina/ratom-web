import React from "react";
import styled from "styled-components";

const FormErrors = ({ errors }) => {
  if (errors && errors.length > 0) {
    return (
      <FormErrorsStyled>
        {errors.map((error, i) => (
          <ErrorListItem key={i}>{error.message}</ErrorListItem>
        ))}
      </FormErrorsStyled>
    );
  } else return null;
};

const FormErrorsStyled = styled.ul`
  color: ${props => props.theme.colorCaution};
`;

const ErrorListItem = styled.li``;

export default FormErrors;
