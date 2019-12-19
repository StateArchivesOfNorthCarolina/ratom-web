import React, { useState } from 'react';
import styled from 'styled-components';

// Fetch
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../../graphql/mutations/authMutations';

// Context
import { useAuthContext } from '../../Context/auth-provider';

// Components
import Input from '../../Components/Inputs/Input';
import Button from '../../Components/Buttons/Button';
import Spinner from '../../Components/Loading/Spinner';
import FormErrors from '../../Components/Form/FormErrors';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { onLogin } = useAuthContext();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ tokenAuth }) {
      onLogin(tokenAuth);
    }
  });

  const handleSignIn = () => {
    login({ variables: { email, password } });
  };

  return (
    <LoginStyled>
      <h1>Login!</h1>
      <LoginWrapper>
        <Input
          label="Email Address"
          type="email"
          onChange={e => setEmail(e.target.value)}
          data-cy="login_email"
        />
        <Input
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          data-cy="login_password"
        />
        <FormErrors errors={error && error.graphQLErrors} />

        <Button postitive block onClick={handleSignIn} data-cy="signin_button">
          {loading ? <Spinner /> : 'Sign in'}
        </Button>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Login;

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
