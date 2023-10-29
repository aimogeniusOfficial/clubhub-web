import React from 'react';
import { SimpleGrid, Text, Image, useMantineTheme, Group, Button, Container, Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const LandingBody = (): JSX.Element => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  
  // State to control the About modal
  const [aboutOpen, setAboutOpen] = React.useState(false);

  return (
    <SimpleGrid
      pt={75}
      spacing={0}
      breakpoints={[
        {
          maxWidth: 'sm',
          cols: 1,
        },
        {
          minWidth: 'sm',
          cols: 2,
        },
      ]}
    >
      <Container pt={67} pl={106}>
        <Text
          size={84}
          fw={900}
          variant='gradient'
          gradient={{ from: theme.colors.primary[7], to: theme.colors.primary[4], deg: 90 }}
        >
          clubhub
        </Text>
        <Text size={16} fw={400} pb={30}>
        Discover, engage, and thrive with ClubHub — your one-stop platform that seamlessly connects you to the myriad of clubs and events on campus. From arts and advocacy to sciences and sports, embark on a journey tailored to your passions and interests.
        </Text>
        <Group position='apart' spacing='xl' grow>
          <Button 
            variant='outline' 
            radius='xl' 
            size='sm' 
            uppercase
            onClick={() => navigate('/login')} // Navigate to login on click
          >
            Get Started Today!
          </Button>
          <Button 
            variant='outline' 
            radius='xl' 
            size='sm' 
            uppercase
            onClick={() => setAboutOpen(true)}  // Open the About modal on click
          >
            Learn More
          </Button>
        </Group>
        
        {/* About Modal */}
        <Modal opened={aboutOpen} onClose={() => setAboutOpen(false)} title="About ClubHub" size="xl">
        <Text>
          In the vibrant heart of UC Berkeley lies a myriad of talents, dreams, and aspirations. With so many students passionate about myriad activities, the need for a centralized platform to bring together like-minded individuals was apparent. Enter ClubHub.

          ClubHub was conceived out of a desire to streamline and enhance the club-searching experience for UC Berkeley students. We recognized that while there were many clubs available, students often found it challenging to discover new ones or find clubs that resonated with their specific interests.

          Our platform offers a comprehensive list of all clubs available on campus, from the arts to sciences, from recreational to professional. With a user-friendly interface, students can easily navigate through different categories, attend events, or even start their own clubs.

          But ClubHub is more than just a platform; it's a community. It's a place where students can connect, collaborate, and create. Whether you're a freshman eager to explore new activities or a senior looking to leave a mark, ClubHub is your go-to destination.

          With ClubHub, we're not just unlocking the best of UC Berkeley's club scene; we're creating a legacy of connection, exploration, and passion. Join us in this journey and find where you truly belong.
        </Text>
        </Modal>
      </Container>
      <Image pr={36} height={400} fit='contain' src='src/assets/images/landing.svg' />
    </SimpleGrid>
  );
};

export default LandingBody;
