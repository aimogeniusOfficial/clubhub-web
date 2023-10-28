import { useState } from "react";
import {
  createStyles,
  MantineProvider,
  AppShell,
  Header,
  Navbar,
  Burger,
  MediaQuery,
  Anchor
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: '#7d85e8',  // Purple background color for the navbar
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  },

  links: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '0 20px' 
  },

  rightLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 0.1
    
  },

  anchor: {
    backgroundColor: '#ffffff',
    color: '#333', // Dark text color for the buttons
    padding: '10px 20px',
    borderRadius: '20px',
    border: '2px solid #333', // Border for the buttons
    fontWeight: 'bold', // Makes the text a bit bold
    fontSize: '0.9em',  // Adjust as needed
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#e8ecef', // Slight gray on hover
    },
  }
}));


export default function App() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        fixed
        navbarOffsetBreakpoint="sm"
        header={
          <Header height={80} style={{ backgroundColor: '#7d85e8' }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <div className={classes.links}>
                <Anchor className={classes.anchor}>Home</Anchor>
                <div className={classes.rightLinks}>
                  <Anchor className={classes.anchor}>About</Anchor>
                  <Anchor className={classes.anchor}>FAQ</Anchor>
                  <Anchor className={classes.anchor}>Sign Up</Anchor>
                  <Anchor className={classes.anchor}>Log In</Anchor>
                </div>
              </div>
            </MediaQuery>
          </Header>
        }
        navbar={
          <Navbar
            className={classes.navbar}
            width={{ base: "100%", sm: 0 }}
            hidden={!opened}
          >
            <Anchor className={classes.anchor}>Home</Anchor>
            <Anchor className={classes.anchor}>About</Anchor>
            <Anchor className={classes.anchor}>FAQ</Anchor>
            <Anchor className={classes.anchor}>Sign Up</Anchor>
            <Anchor className={classes.anchor}>Log In</Anchor>
          </Navbar>
        }
      >
        App
      </AppShell>
    </MantineProvider>
  );
}
