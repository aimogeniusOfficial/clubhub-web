import React from 'react';

import { Paper, createStyles, Title, Text, rem, Container } from '@mantine/core';
import Slogan from 'assets/images/slogan.png';

const useStyles = createStyles(theme => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.neutral[6],
  },

  banner: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minWidth: rem(580),
    paddingTop: rem(80),

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  content: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.fn.rgba(theme.colors.neutral[4], 0.5),
    borderRadius: '20px',
    margin: '20px 20px',

    [theme.fn.smallerThan('md')]: {
      margin: 0,
      borderRadius: 0,
    },
  },
  description: {
    color: theme.fn.rgba(theme.colors.neutral[4], 0.5),
  },
}));

const PublicLayout = ({
  isAuthorizationLayout,
  children,
}: {
  isAuthorizationLayout: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  const { classes } = useStyles();

  if (!isAuthorizationLayout) {
    return <>{children}</>;
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.banner} radius={0} p={100} pr={120}>
        <Title order={1} mt='md' size={40}>
        Unlocking the Best of UC Berkeley's Club Scene: <br></br>Your Hub for Campus Clubs and Events.<br></br>
        </Title>
        <Text size='lg' mt='xs'>
        Dive into a realm of unmatched opportunities, vibrant events, and lasting connections. With ClubHub, immerse yourself in the pulse of Berkeley's club culture. Embark on your journey and discover your niche.
        </Text>
      </Paper>
      <Container className={classes.content}>{children}</Container>
    </div>
  );
};

export default PublicLayout;
