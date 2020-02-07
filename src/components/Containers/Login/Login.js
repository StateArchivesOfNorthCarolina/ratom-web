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
import Logo from '../../Components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuthContext();

  const [{ loading, error, data }, executeLogin] = useAxios(LOGIN, { manual: true });

  const handleSignIn = () => {
    executeLogin({
      method: 'post',
      data: { email, password }
    });
  };

  useEffect(() => {
    if (data) {
      const { access, refresh } = data;
      onLogin({ access, refresh });
    }
  });

  useEffect(() => {
    if (error) {
      setEmail('');
      setPassword('');
    }
  }, [error]);

  return (
    <LoginStyled>
      <LogoStyled large />
      <LoginWrapper>
        <h4>Sign in to RATOM</h4>
        <InputsWrapper>
          <InputStyled
            label="Email Address"
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            data-cy="login_email"
            onEnterKey={handleSignIn}
          />
          <Input
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            data-cy="login_password"
            onEnterKey={handleSignIn}
          />
          <FormErrors errors={[error && error.response.data.detail]} />
        </InputsWrapper>

        <ButtonStyled
          postitive
          block
          onClick={handleSignIn}
          disabled={!email.trim() && !password.trim()}
          data-cy="signin_button"
        >
          {loading ? <Spinner /> : 'Sign in'}
        </ButtonStyled>
      </LoginWrapper>
    </LoginStyled>
  );
};

export default Login;

const LogoStyled = styled(Logo)`
  margin-top: 14rem;
`;

const LoginStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LoginWrapper = styled.div`
  width: 40rem;
  min-height: 40rem;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h4 {
    margin: 4rem 0;
    text-align: center;
  }
`;

const InputsWrapper = styled.div`
  margin-top: 4rem;
`;

const InputStyled = styled(Input)`
  margin-bottom: 3rem;
`;

const ButtonStyled = styled(Button)`
  margin-top: 3rem;
`;
