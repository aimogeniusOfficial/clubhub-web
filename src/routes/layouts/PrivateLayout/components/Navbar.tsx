import React from 'react';

import {
  createStyles,
  Group,
  MediaQuery,
  Navbar as MantineNavbar,
  px,
  Title,
  Tooltip,
  Transition,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
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

      [theme.fn.smallerThan('md')]: {
        overflowY: 'auto',
        paddingBottom: 90,
      },
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
    overflowY: 'auto',

    [theme.fn.smallerThan('md')]: {
      flex: 'none',
    },
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

  return (
    <>
      <MantineNavbar
        px='md'
        pb='lg'
        h='100vh'
        bg='neutral.6'
        hidden={!opened}
        styles={classes.navbar}
        width={{ md: width, lg: width }}
        withBorder={false}
      >
        <MantineNavbar.Section className={classes.logoContainer}>
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
        </MantineNavbar.Section>

        <MantineNavbar.Section className={classes.linksContainer} grow>
          {links}
        </MantineNavbar.Section>

        <MantineNavbar.Section>
          <UserCard opened={openedOrNotWrapped} />
        </MantineNavbar.Section>
      </MantineNavbar>
    </>
  );
};

export default Navbar;
