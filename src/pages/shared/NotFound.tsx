import React from 'react';

import { Button, Container, createStyles, Group, rem, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.neutral[3],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.colors.neutral[1],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(520),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.neutral[3],
  },
}));

const NotFound = (): JSX.Element => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate('/');
  };

  return (
    <Container className={classes.root}>
      <Title className={classes.label}>404</Title>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text color='dimmed' size='lg' align='center' className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group position='center'>
        <Button size='md' onClick={handleGoHome}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default NotFound;
