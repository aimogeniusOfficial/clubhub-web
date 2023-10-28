import React from 'react';

import { createStyles, Image, Container, Title, Text } from '@mantine/core';
import image from 'assets/images/maintenance.png';
import useMaintenance from 'hooks/announcements/useMaintenance';

const useStyles = createStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    fontWeight: 400,
    fontSize: 28,
    marginBottom: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 26,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    width: '20%',
    maxWidth: 96,
    marginBottom: theme.spacing.lg,
  },
}));

const Maintenance = (): JSX.Element => {
  const { classes } = useStyles();

  const { data: undergoingMaintenance, error } = useMaintenance();
  if (error) {
    console.error("Something went wrong...", error)
  };
  console.log(undergoingMaintenance?.data)
  const endDate = undergoingMaintenance?.data?.finish ? 
    new Date(undergoingMaintenance?.data?.finish) : '';

  return (
    <Container py='17%' className={classes.root}>
      <Image src={image} className={classes.mobileImage} />
      <Image src={image} className={classes.desktopImage} />
      <div>
        <Title className={classes.title}>We are conducting server maintenance at the moment.</Title>
        {endDate && 
          <Text weight={400} color='dimmed' size='lg'>
            The server will be back up and running at {endDate?.toLocaleString()}.
          </Text>
        }
      </div>
    </Container>
  );
};

export default Maintenance;
