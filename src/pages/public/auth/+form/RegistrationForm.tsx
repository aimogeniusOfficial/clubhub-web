import React from 'react';

import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { SignUpDto } from 'contexts/models/sign-up-dto';

interface RegistrationFormProps {
  signUp: (data: SignUpDto) => void;
}

const RegistrationForm = ({ signUp }: RegistrationFormProps): JSX.Element => {
  const validateUsername = (val: string): string | null => {
    const checkLength = val.length >= 3;
    const checkFormat = /^[A-Za-z0-9_]{1,15}$/.test(val);
    if (!checkLength) {
      return 'Username must be at least 3 characters long';
    }
    if (!checkFormat) {
      return 'Username must not contain special characters except underscore';
    }
    return null;
  };

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      birthdate: undefined,
      username: '',
      password: '',
    },

    validate: {
      username: val => validateUsername(val),
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(signUp)}>
      <Stack spacing='xs'>
        <TextInput
          required
          label='Email'
          placeholder='your@mail.com'
          size='md'
          {...form.getInputProps('email')}
        />

        <TextInput
          required
          label='Name'
          placeholder='Your Name'
          size='md'
          {...form.getInputProps('name')}
        />

        <DateInput
          label='Birthdate'
          placeholder='Your Birthdate'
          size='md'
          {...form.getInputProps('birthdate')}
        />

        <TextInput
          required
          label='Username'
          placeholder='Your Username'
          size='md'
          {...form.getInputProps('username')}
        />

        <PasswordInput
          required
          label='Password'
          placeholder='Your password'
          size='md'
          {...form.getInputProps('password')}
        />
      </Stack>

      <Group position='apart' mt='xs'>
        <Button type='submit' fullWidth mt='xl'>
          Register
        </Button>
      </Group>
    </form>
  );
};

export default RegistrationForm;
