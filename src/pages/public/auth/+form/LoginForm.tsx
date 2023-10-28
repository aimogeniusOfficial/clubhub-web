import React, { useEffect, useState } from 'react';

import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Group,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconAt } from '@tabler/icons-react';
import { SignInDto } from 'contexts/models/sign-in-dto';
import { Link } from 'react-router-dom';

type LoginFormProps = {
  onSubmit: (data: SignInDto) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const theme = useMantineTheme();
  const [isEmail, setIsEmail] = useState(false);

  const form = useForm({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validate: {
      usernameOrEmail: val =>
        val.length < 6 ? 'Email or username should include at least 6 characters' : null,
      password: val => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  useEffect(() => {
    const isEmail = /^\S+@\S+$/.test(form.values.usernameOrEmail) || !form.values.usernameOrEmail;
    setIsEmail(isEmail);
  }, [form]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing='xs'>
        <TextInput
          required
          label='Email or username'
          placeholder='your@mail.com'
          size='md'
          icon={
            isEmail ? <IconMail size={theme.fontSizes.xl} /> : <IconAt size={theme.fontSizes.xl} />
          }
          {...form.getInputProps('usernameOrEmail')}
        />

        <PasswordInput
          required
          label='Password'
          placeholder='Your password'
          size='md'
          {...form.getInputProps('password')}
        />

        <Text size='sm'>
          <Anchor component={Link} to='/request-password' weight={500} color='dimmed'>
            Forgot password?
          </Anchor>
        </Text>
      </Stack>

      <Group position='apart' mt='xs'>
        <Button type='submit' fullWidth mt='xl'>
          Login
        </Button>
      </Group>
    </form>
  );
};

export default LoginForm;
