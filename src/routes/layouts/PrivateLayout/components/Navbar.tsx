import React from 'react';

import {
  createStyles,
  Group,
  Header,
  MediaQuery,
  Navbar as MantineNavbar,
  px,
  Stack,
  Title,
  Tooltip,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconSquareToggle } from '@tabler/icons-react';
import { textVariantsStyles } from 'components/typography/Text';
import useNavbarLinks from 'hooks/useNavbarLinks';
import { Link, useLocation } from 'react-router-dom';

import ShamanLogo from './ShamanLogo';
import UserCard from './UserCard';

const useStyles = createStyles((theme, { wrapped }: { wrapped: boolean }) => ({
  navbar: {
    root: {
      transition: 'all 400ms',
      gap: theme.spacing.md,
      display: 'flex',      
      alignItems: 'center',
    },
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: wrapped ? 'center' : 'flex-start',
    textDecoration: 'none',
    padding: wrapped ? 9 : 12,
    marginBottom: 12,
    borderRadius: theme.radius.md,
    transition: 'all 200ms',
    width: '100%',
    height: 'auto',

    ...textVariantsStyles.base2,

    '&:hover': {
      color: theme.colors.neutral[3],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colors.primary[5],
      boxShadow: `${theme.fn.rgba(theme.colors.primary[5], 0.2)} 0px 18px 50px -10px`,
      color: theme.white,
    },
  },

  logoContainer: {
    padding: `${px(theme.spacing.md) * 2}px ${theme.spacing.md} ${theme.spacing.xl}`,
    
  },
  logo: {
    textDecoration: 'none',
    color: theme.white,
  },

  linksContainer: {
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

const Navbar = ({
  opened,
  handleCloseHeader,
}: {
  opened: boolean;
  handleCloseHeader: () => void;
}): JSX.Element => {
  const { pathname } = useLocation();
  const navbarLinks = useNavbarLinks();

  const [wrapped, { toggle }] = useDisclosure(false);

  const { classes, cx, theme } = useStyles({ wrapped });

  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const openedOrNotWrapped = opened || !wrapped;
  const [showRouteLabelDebounced] = useDebouncedValue(openedOrNotWrapped, 300);

  const links = navbarLinks.map(({ link, label, Icon }) => (
    <Link
      key={link}
      to={link}
      className={cx(classes.link, { [classes.linkActive]: link === pathname })}
      onClick={() => {
        if (opened) {
          handleCloseHeader();
        }
      }}
    >
      <Group>
        <Icon size={theme.fontSizes.xl} />
        {openedOrNotWrapped && (
          <Transition
            mounted={showRouteLabelDebounced}
            transition='fade'
            duration={400}
            timingFunction='ease'
          >
            {styles => <span style={{ ...styles }}>{label}</span>}
          </Transition>
        )}
      </Group>
    </Link>
  ));

  const width = wrapped ? 70 : 303;

  if (isSmallScreen) {
    return (
      <Link to='/' className={classes.logo}>
        <Group spacing='sm'>
          {openedOrNotWrapped && (
            <Transition
              mounted={showRouteLabelDebounced}
              transition='fade'
              duration={400}
              timingFunction='ease'
            >
              {styles => (
                <Title
                  style={opened ? {} : styles}
                  color={theme.colors.primary[7]}
                  size={28}
                  weight={800}
                  sx={{ letterSpacing: '-0.04em' }}
                >
                  clubhub
                </Title>
              )}
            </Transition>
          )}
        </Group>
      </Link>
    )
  }

  return (
    <>
      <Header
        px='md'
        pb='lg'
        height='18%'
        bg='neutral.6'
        hidden={!opened}
        styles={classes.navbar}
        w='100%'
        withBorder={false}
      >
        <Stack className={classes.logoContainer}>
          <Group position={!opened && wrapped ? 'center' : 'apart'} align='center'>
            <Link to='/' className={classes.logo}>
              <Group spacing='sm'>
                {openedOrNotWrapped && (
                  <Transition
                    mounted={showRouteLabelDebounced}
                    transition='fade'
                    duration={400}
                    timingFunction='ease'
                  >
                    {styles => (
                      <Title
                        style={opened ? {} : styles}
                        color={theme.colors.primary[7]}
                        size={28}
                        weight={800}
                        sx={{ letterSpacing: '-0.04em' }}
                      >
                        clubhub
                      </Title>
                    )}
                  </Transition>
                )}
              </Group>
            </Link>

            <Tooltip position='right' label={`${wrapped ? 'Show' : 'Hide'} navigation`}>
              <span style={{ display: 'flex' }}>
                <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
                  <IconSquareToggle
                    size={24}
                    fill={theme.colors.neutral[3]}
                    color={theme.colors.neutral[3]}
                    cursor='pointer'
                    onClick={toggle}
                  />
                </MediaQuery>
              </span>
            </Tooltip>
          </Group>
        </Stack>

        <Group className={classes.linksContainer} grow>
          {links}
        </Group>
        <UserCard opened={openedOrNotWrapped} />
      </Header>
    </>
  );
};

export default Navbar;
