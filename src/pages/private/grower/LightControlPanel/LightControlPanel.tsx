import React from 'react';

import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';

import LightGroupCard from './components/LightGroupCard';

const LightControlPanel = (): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            Light Control Panel
          </Title>
          <Text color='neutral.3'>Datastreams, Events & Metadata</Text>
        </Flex>

        <Divider />

        <SimpleGrid
          mb='xl'
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { minWidth: 'sm', cols: 2 },
          ]}
        >
          <TextInput
            icon={<IconSearch size={theme.fontSizes.md} />}
            placeholder='Search control panel'
          />
          <Group position='right'>
            <Button size='sm' leftIcon={<IconPlus size={theme.fontSizes.md} />}>
              Create
            </Button>
          </Group>
        </SimpleGrid>

        <SimpleGrid
          mt='xl'
          breakpoints={[
            { minWidth: 'xs', cols: 1 },
            { minWidth: 'sm', cols: 3 },
          ]}
        >
          <LightGroupCard />
          <LightGroupCard />
          <LightGroupCard />
          <LightGroupCard />
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default LightControlPanel;
