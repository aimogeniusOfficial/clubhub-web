import React from 'react';

import { Button, Container, Divider, Group, Stack, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import DrawerCreateGrowCycle from './components/DrawerCreateGrowCycle';
import GrowCycleTable from './components/GrowCycleTable';

const GrowCycles = (): JSX.Element => {
  const theme = useMantineTheme();

  const [isCreateFormOpened, { open: openCreateForm, close: closeCreateForm }] =
    useDisclosure(false);

  return (
    <>
      <Stack spacing='xl'>
        <Group position='apart'>
          <Title order={1} weight={700} color='neutral.0'>
            Grow Cycles
          </Title>
          <Group position='right'>
            <Button
              size='sm'
              leftIcon={<IconPlus size={theme.fontSizes.md} />}
              onClick={openCreateForm}
            >
              Create
            </Button>
          </Group>
        </Group>

        <Divider mb='lg' />

        <GrowCycleTable />
      </Stack>

      <DrawerCreateGrowCycle opened={isCreateFormOpened} onClose={closeCreateForm} />
    </>
  );
};

export default GrowCycles;
