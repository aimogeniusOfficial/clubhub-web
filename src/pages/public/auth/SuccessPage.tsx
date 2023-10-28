import React, { useEffect } from 'react';

import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  useMantineTheme,
  rem,
  Center,
  Divider,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import useStripeSession from 'hooks/membership/useStripeSession';
import Confetti from 'react-confetti';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

const SuccessPage = (): JSX.Element => {
  const theme = useMantineTheme();
  const [searchParams] = useSearchParams();
  const session = searchParams.get('sessionId');
  const [isConfetti, setConfetti] = React.useState(false);

  const navigate = useNavigate();
  const { data: sessionData, isError, error: sessionError } = useStripeSession(session);

  useEffect(() => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  }, []);

  const handleGoHome = (): void => {
    navigate('/');
  };

  if (isError || sessionError) {
    return <Navigate to='/' />;
  }

  return (
    <>
      {isConfetti && <Confetti />}
      <Container mt={40} h='100vh'>
        {sessionData?.data.subscription && (
          <Paper radius='xl' p='xl' shadow='sm' bg={theme.fn.rgba(theme.colors.neutral[4], 0.5)}>
            <Stack spacing='lg'>
              <div>
                <Center>
                  <IconCircleCheck width={80} height={80} color={theme.colors.primary[4]} />
                </Center>
                <Title order={2} align='center' color={theme.colors.primary[4]}>
                  Payment Successful!
                </Title>
              </div>

              <Divider />

              <div>
                <Title order={3} align='center'>
                  Congratulations! You have successfully subscribed to the <br />
                  <Text size={rem(22)} fw={600} span c={theme.colors.primary[4]}>
                    {sessionData?.data.subscription.name}
                  </Text>{' '}
                  plan.
                </Title>
              </div>

              <div>
                <Text align='center' size='md' mb='xs'>
                  Now you can take a closer look at your new features on the dashboard
                </Text>
                <Group position='center'>
                  <Button
                    size='md'
                    variant='primary'
                    color={theme.colorScheme === 'dark' ? 'primary' : 'blue'}
                    onClick={handleGoHome}
                  >
                    Go to Dashboard
                  </Button>
                </Group>
              </div>
            </Stack>
          </Paper>
        )}
      </Container>
    </>
  );
};
export default SuccessPage;
