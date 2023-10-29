import React from 'react';

import { AppShell, Container, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useCurrentRoute from 'hooks/useCurrentRoute';
import MobileNavbar from 'routes/layouts/PrivateLayout/components/MobileNavbar';
import Navbar from 'routes/layouts/PrivateLayout/components/Navbar';

import ClubList from './ClubList';

const useStyles = createStyles(theme => ({
  content: {
    background: theme.colors.neutral[5],
    borderRadius: theme.radius.lg,
    height: '100%',

    [theme.fn.smallerThan('md')]: {
      borderRadius: 0,
      marginBottom: 70,
    },
  },

  appshellStyles: {
    root: {
      height: '100%',
    },
    main: {
      background: theme.colors.neutral[6],
      paddingTop: 'lg',
      paddingBottom: 'lg',

      [theme.fn.smallerThan('md')]: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
      },
    },
    body: {
      background: theme.colors.neutral[6],
    },
  },
}));

const ClubListLayout = (): JSX.Element => {
  const { classes } = useStyles();

  const currentRoute = useCurrentRoute();

  const [opened, { toggle, close }] = useDisclosure(false);

  const isShellHidden = ['/reset-password', '/success'].includes(currentRoute);

  return (
    <>
      <AppShell
        className={classes.appshellStyles}
        hidden={isShellHidden}
        header={<Navbar opened={opened} handleCloseHeader={close} />}
        footer={<MobileNavbar opened={opened} toggle={toggle} />}
      >
        <div className={classes.content}>
          <Container fluid py='xl'>
            <ClubList />
          </Container>
        </div>
      </AppShell>
    </>
  );
};

export default ClubListLayout;
