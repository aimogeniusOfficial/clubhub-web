import React from 'react';

import { Button, Divider, Group, Paper, Stack, Tabs, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBorderAll, IconLayoutDashboard, IconPlus } from '@tabler/icons-react';
import { useAuth } from 'contexts/AuthContext';
import usePaginatedGrowSpaces from 'hooks/grow-space/usePaginatedGrowSpaces';

import GrowSpaceCreateFormDrawer from './components/GrowSpaceCreateFormDrawer';
import GrowSpaceList from './components/GrowSpaceList';
import GrowSpaceTable from './components/GrowSpaceTable';
import WeeklyCalendar from 'MonthlyCalendar';
import MonthlyCalendar from 'MonthlyCalendar';

const GrowSpace = (): JSX.Element => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const { data: growSpacesData, isLoading, isError } = usePaginatedGrowSpaces();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Stack spacing='lg'>
        <Group position='apart'>
          <Title align='center' order={1} weight={700} color='neutral.0'>
            Events Management Calendar
          </Title>
        </Group>
        <div>
      <MonthlyCalendar />
    </div>  
      </Stack>
    </>
  );
};

export default GrowSpace;
