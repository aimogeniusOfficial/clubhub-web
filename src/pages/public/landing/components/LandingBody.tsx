import { SimpleGrid, Text, Image, useMantineTheme, Group, Button, Container } from '@mantine/core';

const LandingBody = (): JSX.Element => {
  const theme = useMantineTheme();
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
      <Container pt={67} pl={36}>
        <Text
          size={84}
          fw={900}
          variant='gradient'
          gradient={{ from: theme.colors.primary[7], to: theme.colors.primary[4], deg: 90 }}
        >
          clubhub
        </Text>
        <Text size={36} fw={400} pb={30}>
          UC Berkeley
        </Text>
        <Group position='apart' spacing='xl' grow>
          <Button variant='outline' radius='xl' size='sm' uppercase>
            Login
          </Button>
          <Button variant='outline' radius='xl' size='sm' uppercase>
            About
          </Button>
        </Group>
      </Container>
      <Image pr={36} height={400} fit='contain' src='src/assets/images/landing.svg' />
    </SimpleGrid>
  );
};
export default LandingBody;
