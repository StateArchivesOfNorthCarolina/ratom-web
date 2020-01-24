import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Axios
import useAxios from '../../Hooks/useAxios';
import { LOGIN } from '../../../services/requests';

// Context
import { useAuthContext } from '../../Context/auth-provider';

// Components
import Input from '../../Components/Inputs/Input';
import Button from '../../Components/Buttons/Button';
import Spinner from '../../Components/Loading/Spinner';
import FormErrors from '../../Components/Form/FormErrors';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuthContext();

  const [{ loading, error, data }, executeLogin] = useAxios(LOGIN, { manual: true });

  const handleSignIn = () => {
    executeLogin({
      method: 'post',
      data: { username, password }
    });
  };

  useEffect(() => {
    if (data) {
      const { access, refresh } = data;
      onLogin({ access, refresh });
    }
  });

  useEffect(() => {
    if (error && error.response.status === 401) {
      setUsername('');
      setPassword('');
    }
  }, [error]);

  return (
    <LoginStyled>
      <h1>Login!</h1>
      <LoginWrapper>
        <Input
          label="Email Address"
          type="username"
          onChange={e => setUsername(e.target.value)}
          data-cy="login_email"
          onEnterKey={handleSignIn}
        />
        <Input
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          data-cy="login_password"
          onEnterKey={handleSignIn}
        />
        <FormErrors errors={[error && error.response.data.detail]} />

        <Button postitive block onClick={handleSignIn} disabled={error} data-cy="signin_button">
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
