import React, { useEffect } from 'react';

import { AppShell, Container, createStyles, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useAnnouncements from 'hooks/announcements/useAnnouncements';
import usePaginatedGrowSpaces from 'hooks/grow-space/usePaginatedGrowSpaces';
import useCurrentRoute from 'hooks/useCurrentRoute';
import { useNavigate } from 'react-router-dom';
import { showWarningNotification } from 'utils/notifications';

import AnnouncementNotification from './components/AnnouncementNotification';
import MobileNavbar from './components/MobileNavbar';
import Navbar from './components/Navbar';

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

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { classes } = useStyles();

  const currentRoute = useCurrentRoute();
  const navigate = useNavigate();

  const [opened, { toggle, close }] = useDisclosure(false);

  const isShellHidden = ['/reset-password', '/success'].includes(currentRoute);

  const { data: announcementData } = useAnnouncements();
  const { data: growSpaceData, isSuccess } = usePaginatedGrowSpaces();

  const activeAnnouncements = announcementData?.data?.filter(announcement => {
    if (!announcement.start) {
      return null;
    }

    const currentDate = new Date();
    const announcementDate = new Date(announcement.start);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (announcementDate.valueOf() - currentDate.valueOf()) / millisecondsPerDay < 7;
  });

  return (
    <>
      <AppShell
        className={classes.appshellStyles}
        hidden={isShellHidden}
        header={<Navbar opened={opened} handleCloseHeader={close} />}
        footer={<MobileNavbar opened={opened} toggle={toggle} />}
      >
        <div className={classes.content}>
          <Container py='xl'>{children}</Container>
        </div>
      </AppShell>
    </>
  );
};

export default AuthenticatedLayout;
