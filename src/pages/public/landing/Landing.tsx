import React, { useState } from 'react';
import { createStyles, AppShell, Header, Navbar, Burger, MediaQuery, Anchor, Button, Modal, Text } from '@mantine/core';
import LandingBody from './components/LandingBody';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: '#7d85e8',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '0 20px',
  },
  rightLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 0.1,
  },
  anchor: {
    backgroundColor: '#ffffff',
    color: '#333',
   
    borderRadius: '20px',
    border: '2px solid #333',
    fontWeight: 'bold',
    fontSize: '0.9em',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#e8ecef',
    },
  },
}));

export default function Landing() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  
  // State for modals
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint='sm'
      header={
        <Header height={80} style={{ backgroundColor: '#7d85e8' }}>
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger opened={opened} onClick={() => setOpened(o => !o)} size='sm' mr='xl' />
          </MediaQuery>

          <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
            <div className={classes.links}>
              <Button className={classes.anchor}>Home</Button>
              <div className={classes.rightLinks}>
                <Button className={classes.anchor} onClick={() => setAboutModalOpen(true)}>About</Button>
                <Button className={classes.anchor} onClick={() => setFaqModalOpen(true)}>FAQ</Button>
                <Button className={classes.anchor} onClick={() => navigate('/login')}>Sign Up</Button>
                <Button className={classes.anchor} onClick={() => navigate('/login')}>Log In</Button>
              </div>
            </div>
          </MediaQuery>
        </Header>
      }
      navbar={
        <Navbar className={classes.navbar} width={{ base: '100%', sm: 0 }} hidden={!opened}>
          <Anchor className={classes.anchor}>Home</Anchor>
          <Anchor className={classes.anchor} onClick={() => setAboutModalOpen(true)}>About</Anchor>
          <Anchor className={classes.anchor} onClick={() => setFaqModalOpen(true)}>FAQ</Anchor>
          <Anchor className={classes.anchor} onClick={() => navigate('/login')}>Sign Up</Anchor>
          <Anchor className={classes.anchor} onClick={() => navigate('/login')}>Log In</Anchor>
        </Navbar>
      }
    >
      <LandingBody />

      {/* About Modal */}
      <Modal
        opened={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        title="About ClubHub"
        size="xl"
      >
        <Text>
          In the vibrant heart of UC Berkeley lies a myriad of talents, dreams, and aspirations. With so many students passionate about myriad activities, the need for a centralized platform to bring together like-minded individuals was apparent. Enter ClubHub.

          ClubHub was conceived out of a desire to streamline and enhance the club-searching experience for UC Berkeley students. We recognized that while there were many clubs available, students often found it challenging to discover new ones or find clubs that resonated with their specific interests.

          Our platform offers a comprehensive list of all clubs available on campus, from the arts to sciences, from recreational to professional. With a user-friendly interface, students can easily navigate through different categories, attend events, or even start their own clubs.

          But ClubHub is more than just a platform; it's a community. It's a place where students can connect, collaborate, and create. Whether you're a freshman eager to explore new activities or a senior looking to leave a mark, ClubHub is your go-to destination.

          With ClubHub, we're not just unlocking the best of UC Berkeley's club scene; we're creating a legacy of connection, exploration, and passion. Join us in this journey and find where you truly belong.
        </Text>
      </Modal>

      {/* FAQ Modal */}
      <Modal
        opened={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        title="Frequently Asked Questions"
        size="md"
      >
        <Text>
          <strong>How do I join a club?</strong>
          <p>Explore the list of clubs and click on 'Join' to send a membership request.</p>
          <strong>Can I create a new club?</strong>
          <p>Yes! If you have a new idea, go to the 'Create Club' section and fill out the necessary details.</p>
        </Text>
      </Modal>
    </AppShell>
  );
}
