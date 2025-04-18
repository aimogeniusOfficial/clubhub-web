import React from 'react';

import {
  createStyles,
  Divider,
  Flex,
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
      position: 'fixed'
      
    },
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: wrapped ? 'center' : 'flex-start',
    textDecoration: 'none',
    padding: wrapped ? 9 : 12,
    marginBottom: 0,
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
    justifyContent: 'space-between',
    padding: '8px',
    
    
    
    
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

  const links = navbarLinks.map(({ link, label, Icon}) => (
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
        
        
        
        height='60px'
        hidden={!opened}
        styles={classes.navbar}
        w='100%'
        withBorder={false}
      >
        
      
      <div style={{ backgroundColor: '#fefefe' }}>
        
        <Group px='5%' mt='5px' align='center' w='100%' position={!opened && wrapped ? 'center' : 'apart'}>
          <Link to='/' className={classes.logo}>

          <Group spacing='xl' w='10%'>
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
            <Group align='right' w='80%' className={classes.linksContainer} grow>
              {links}
            
              <UserCard opened={openedOrNotWrapped}/>
              
            </Group>
        </Group>

        <Divider my="sm" color={theme.colors.primary[7]}/>
      </div>
      
      </Header>
      

    </>
  );
};

export default Navbar;
