import React, { useEffect } from 'react';

import { PasswordInput, Button, Title, Group, Stack, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'contexts/AuthContext';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

const ResetPassword = (): JSX.Element => {
  const { updateUser, exchangeCodeForSession } = useAuth();
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: values => {
      const errors: Record<string, string> = {};

      if (values.password.length < 6) {
        errors.password = 'Password should include at least 6 characters';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      exchangeCodeForSession(code);
    }
  }, [exchangeCodeForSession]);

  const handlePasswordReset = async () => {
    const { error } = await updateUser({ password: form.values.password });

    if (error) {
      showErrorNotification('Failed to reset password', error.message);
    } else {
      window.location.href = '/';
      showSuccessNotification('Password reset', 'Your password has been successfully changed');
    }
  };

  return (
    <Container p='xl' my={140} size={420} h='100vh'>
      <Title order={3} ta='center' mt='xl' mb={30}>
        Reset your password
      </Title>

      <form onSubmit={form.onSubmit(handlePasswordReset)}>
        <Stack spacing='xs'>
          <PasswordInput
            required
            label='New Password'
            placeholder='Your new password'
            size='md'
            {...form.getInputProps('password')}
          />
          <PasswordInput
            required
            label='Repeat Password'
            placeholder='Repeat your new password'
            size='md'
            {...form.getInputProps('confirmPassword')}
          />
        </Stack>

        <Group position='apart' mt='md'>
          <Button type='submit' fullWidth mt='xl'>
            Reset Password
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default ResetPassword;
