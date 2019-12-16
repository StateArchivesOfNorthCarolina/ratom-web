import React, { useState } from "react";
import styled from 'styled-components';

// Fetch
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from "../../../graphql/mutations/authMutations";

// Components
import Input from '../../Components/Inputs/Input';
import Button from '../../Components/Buttons/Button';
import Spinner from "../../Components/Loading/Spinner";
import { useAuthContext } from "../../Context/auth-provider";

// ! REMOVE
const PRETEND_AUTH_RESPONSE = {
    token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik1pY2hhZWwgQXNodG9uIiwiaWF0IjoxNTE2MjM5MDIyfQ.NJ3Fr-HjBfowRp8j9poxS8GQexwKCTJUOaZlOXzI-2Q",
    user: {
        id: 1,
        firstName: 'Michael',
        lastName: 'Ashton',
        collections: [
            1, 3, 6
        ]
    }
};

// TODO: Handle Error
// TODO: Don't know enough about how the error object will look to make inferences

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { onLogin } = useAuthContext();

  const [login, { loading, error }] = useMutation(LOGIN, {
      onCompleted(response) {
        // TODO: response probably needs to be destructured
        // onLogin(response)
      }
  });

  const handleSignIn = () => {
      // login({ variables: { email, password }})
      mockLogin()
  }

  // ! REMOVE
  const mockLogin = () => {
    setTimeout(() => {
      onLogin(PRETEND_AUTH_RESPONSE);
    }, 1000)
  };

  return (
    <LoginStyled>
      <h1>Login!</h1>
      <LoginWrapper>
        <Input
          label="Email Address"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button postitive block onClick={handleSignIn}>
          {loading ? <Spinner />: "Sign in"}
        </Button>
      </LoginWrapper>
    </LoginStyled>
  );
}

export default Login


const LoginStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h1 {
  }
`;

const LoginWrapper = styled.div`
  width: 40rem;
  min-height: 30rem;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
