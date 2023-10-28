import React from 'react';

import { Button, Group, Paper, Stack, Tabs, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBorderAll, IconLayoutDashboard, IconPlus } from '@tabler/icons-react';
import { useAuth } from 'contexts/AuthContext';
import usePaginatedGrowSpaces from 'hooks/grow-space/usePaginatedGrowSpaces';

import GrowSpaceCreateFormDrawer from './components/GrowSpaceCreateFormDrawer';
import GrowSpaceList from './components/GrowSpaceList';
import GrowSpaceTable from './components/GrowSpaceTable';

const GrowSpace = (): JSX.Element => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const { data: growSpacesData, isLoading, isError } = usePaginatedGrowSpaces();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Stack spacing='lg'>
        <Group position='apart'>
          <Title order={1} weight={700} color='neutral.0'>
            Grow Spaces
          </Title>
          <Button leftIcon={<IconPlus size={theme.fontSizes.md} />} onClick={open}>
            Add space
          </Button>
        </Group>
        <Tabs radius='xs' defaultValue='cards' keepMounted={false}>
          <Tabs.List>
            <Tabs.Tab value='table' icon={<IconBorderAll size='0.8rem' />}>
              Table
            </Tabs.Tab>
            <Tabs.Tab value='cards' icon={<IconLayoutDashboard size='0.8rem' />}>
              Cards
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='cards' pt='xs'>
            {growSpacesData?.data && (
              <GrowSpaceList
                growSpaces={growSpacesData?.data}
                openCreateModal={open}
                isLoading={isLoading}
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value='table' pt='xs'>
            {growSpacesData?.data && (
              <GrowSpaceTable
                growSpaces={growSpacesData?.data}
                isError={isError}
                isLoading={isLoading}
              />
            )}
          </Tabs.Panel>
        </Tabs>
      </Stack>
      <GrowSpaceCreateFormDrawer opened={opened} onClose={close} user={user} />
    </>
  );
};

export default GrowSpace;
