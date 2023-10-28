import React from 'react';

import { TextInput, Button, Title, Text, Group, Stack, Container, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

const RequestReset = (): JSX.Element => {
  const { resetPasswordForEmail } = useAuth();
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  const handleResetRequest = async () => {
    const { error } = await resetPasswordForEmail(form.values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      showErrorNotification('Failed to send password reset email', error.message);
    } else {
      showSuccessNotification(
        'Password reset email sent',
        'Check your inbox for further instructions',
      );
      form.reset();
    }
  };

  return (
    <Container p='xl' my={140} size={420}>
      <Title order={3} ta='center' mt='md' mb={30}>
        Password Reset
      </Title>

      <form onSubmit={form.onSubmit(handleResetRequest)}>
        <Stack spacing='xs'>
          <TextInput
            required
            label='Email'
            placeholder='your@mail.com'
            size='md'
            {...form.getInputProps('email')}
          />
        </Stack>

        <Group position='apart' mt='md'>
          <Button type='submit' fullWidth mt='xl'>
            Send Reset Email
          </Button>
        </Group>
      </form>

      <Text ta='center' mt='md'>
        Remembered your password?{' '}
        <Anchor component={Link} to='/login' weight={500}>
          Login
        </Anchor>
      </Text>
    </Container>
  );
};

export default RequestReset;
