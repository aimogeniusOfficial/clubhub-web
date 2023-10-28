import React from 'react';

import {
  Group,
  Footer as MantineFooter,
  Burger,
  useMantineTheme,
  Paper,
  Avatar,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBox, IconMessageChatbot, IconRepeat, IconSmartHome } from '@tabler/icons-react';
import useCurrentRoute from 'hooks/useCurrentRoute';
import { Link } from 'react-router-dom';

const links = [
  {
    path: '/',
    Icon: IconSmartHome,
  },
  {
    path: '/grow-cycle',
    Icon: IconRepeat,
  },
  {
    path: '/grow-space',
    Icon: IconBox,
  },
  {
    path: '/chat',
    Icon: IconMessageChatbot,
  },
];

interface MobileNavbarProps {
  opened: boolean;
  toggle: () => void;
}

const MobileNavbar = ({ opened, toggle }: MobileNavbarProps): JSX.Element | null => {
  const theme = useMantineTheme();
  const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  const currentRoute = useCurrentRoute();

  const bgColor = opened ? 'neutral.4' : 'neutral.6';

  if (isLargeScreen) {
    return null;
  }

  return (
    <MantineFooter p='md' height={90} bg='transparent' withBorder={false}>
      <Paper bg={bgColor} p='sm' radius={24} shadow='xl'>
        <Group position='apart' noWrap>
          <Avatar size='md' radius='xl' color='dark'>
            <Burger opened={opened} onClick={toggle} size='sm' color={theme.colors.gray[2]} />
          </Avatar>
          {links.map(link => (
            <Avatar
              key={link.path}
              size='md'
              radius='xl'
              variant={currentRoute === link.path ? 'filled' : 'light'}
              color={currentRoute === link.path ? 'green' : 'dark'}
              component={Link}
              to={link.path}
            >
              <link.Icon />
            </Avatar>
          ))}
        </Group>
      </Paper>
    </MantineFooter>
  );
};

export default MobileNavbar;
