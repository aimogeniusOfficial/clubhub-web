import React, { useState } from 'react';

import { Divider, Container, SegmentedControl } from '@mantine/core';
import ShamanLogo from 'components/ClubHubLogo';
import { useAuth } from 'contexts/AuthContext';
import { useFeatureGate } from 'contexts/FeatureGateContext';
import { SignInDto } from 'contexts/models/sign-in-dto';
import { SignUpDto } from 'contexts/models/sign-up-dto';
import useStatus from 'hooks/admin/user-invitations/useStatus';
import useIsUsernameTaken from 'hooks/auth/useValidateUsername';
import { useNavigate } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import LoginForm from './+form/LoginForm';
import RegistrationForm from './+form/RegistrationForm';
import RegistrationInvitation from './components/RegistrationInvitation';

const authControlData = [
  { label: 'Sign in', value: 'login' },
  { label: 'Create account', value: 'register' },
];

const Auth = (): JSX.Element => {
  const navigation = useNavigate();
  const [isInviteConfirmed, setIsInviteConfirmed] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [selectedAuth, setSelectedAuth] = useState<string>('login');

  const { isInviteOnlySignup } = useFeatureGate();
  const { signIn, signUp } = useAuth();

  const getStatus = useStatus();
  const getIsUsernameTaken = useIsUsernameTaken();

  const handleLogin = async (dto: SignInDto): Promise<void> => {
    try {
      const { error } = await signIn({
        usernameOrEmail: dto.usernameOrEmail,
        password: dto.password,
      });

      if (error) {
        switch (error.message.toLowerCase()) {
          case 'email not confirmed':
            showErrorNotification('Email not confirmed', error.message);
            return;
          case 'invalid login credentials':
            showErrorNotification('Invalid login credentials', error.message);
            return;
          default:
            console.error('Something went wrong', error);
        }
      }
    } catch (error: any) {
      showErrorNotification(
        'Could not connect to the server, please try again later.',
        error.message,
      );
    }
  };

  const handleSignUp = async (signUpCredentials: SignUpDto): Promise<void> => {
    const usernameTaken = await getIsUsernameTaken.mutateAsync({
      username: signUpCredentials.username,
    });
    if (usernameTaken) {
      showErrorNotification('Username already exists', 'Please, choose another username');
      return;
    }
    try {
      const { error } = await signUp({
        ...signUpCredentials,
        token,
      });

      if (error) {
        console.error('Something went wrong', error);
        return;
      }

      navigation('/');

      showSuccessNotification(
        'Registration Success',
        'Registration Success. Check your email to confirm the account',
      );
    } catch (error: any) {
      showErrorNotification(
        'Could not connect to the server, please try again later.',
        error.message,
      );
    }
  };

  const handleInvitationVerification = async (invitationToken: string): Promise<void> => {
    const isInviteValid = await getStatus.mutateAsync(invitationToken);

    if (!isInviteValid) {
      showErrorNotification('Invalid token credentials');
      setIsTokenValid(false);
      return;
    }

    setToken(invitationToken);
    setIsTokenValid(true);
    setIsInviteConfirmed(true);
  };

  return (
    <Container p='xl' my={70} size={420}>
      <ShamanLogo />

      <SegmentedControl
        data={authControlData}
        value={selectedAuth}
        onChange={setSelectedAuth}
        w='100%'
        color='white'
      />

      <Divider my='lg' />

      {selectedAuth === 'login' && <LoginForm onSubmit={handleLogin} />}

      {selectedAuth === 'register' &&
        (isInviteConfirmed || !isInviteOnlySignup ? (
          <RegistrationForm signUp={handleSignUp} />
        ) : (
          <RegistrationInvitation
            isTokenValid={isTokenValid}
            verifyInvitation={handleInvitationVerification}
          />
        ))}
    </Container>
  );
};

export default Auth;
