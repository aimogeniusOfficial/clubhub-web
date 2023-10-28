import React, { useState } from 'react';

import {
  Button,
  Container,
  Flex,
  Group,
  Menu,
  SegmentedControl,
  Skeleton,
  Stack,
  Text,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconBolt, IconChevronDown } from '@tabler/icons-react';
import GrowCycleStatusBadge from 'pages/private/grower/GrowCycleDetail/components/badges/GrowCycleStatusBadge';
import useGrowCycle from 'pages/private/grower/GrowCycles/hooks/useGrowCycle';
import Loading from 'pages/shared/Loading';
import { useParams } from 'react-router-dom';

import ActivateGrowCycleModal from './+modals/ActivateGrowCycleModal';
import AddActionDrawer from './components/AddActionDrawer';
import GrowCycleStageBadge from './components/badges/GrowCycleStageBadge';
import GrowActionsTab from './components/GrowActionsTab';
import GrowCyclePageBreadcrumbs from './components/GrowCyclePageBreadcrumbs';
import JournalTab from './components/JournalTab';
import LightScheduleTab from './components/LightScheduleTab';
import NutrientsTab from './components/NutrientsTab';
import GeneralTab from './tabs/general-tab/GeneralTab';
import ModalGrowCycleDeletion from '../GrowCycles/components/ModalGrowCycleDeletion';

const TabMap = {
  GENERAL: 'general',
  JOURNAL: 'journal',
  NUTRIENTS: 'nutrients',
  LIGHT_SCHEDULE: 'light-schedule',
  ACTIONS: 'actions',
};

const GrowCycleDetailPage = (): JSX.Element => {
  const theme = useMantineTheme();
  const { growCycleId } = useParams();
  const { data: growCycleData } = useGrowCycle(growCycleId);
  const [isAddAction, { open: openAction, close: closeAction }] = useDisclosure(false);
  const [isDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedTab, setSelectedTab] = useState('general');

  if (!growCycleData?.data) {
    return <Loading />;
  }

  const openModal = (): void => {
    modals.open({
      title: 'Activate Your Grow Cycle',
      children: growCycleData && <ActivateGrowCycleModal growCycle={growCycleData.data} />,
    });
  };

  return (
    <Container maw='936px'>
      <Stack spacing='md'>
        <Group position='apart'>
          <GrowCyclePageBreadcrumbs
            dataName={growCycleData.data.name}
            growCycleId={growCycleData.data.id}
          />

          <Group position='right'>
            <Menu position='bottom-end' width='target'>
              <Menu.Target>
                <Button size='xs' leftIcon={<IconChevronDown size={theme.fontSizes.md} />}>
                  Actions
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {growCycleData.data.status === 'DRAFT' && (
                  <Menu.Item onClick={openModal}>Activate</Menu.Item>
                )}
                {/* TODO add stage transitions */}
                <Menu.Item onClick={openDelete}>Delete</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        <Flex direction='column'>
          {growCycleData ? (
            <Group>
              <Title order={2} weight={700} color='neutral.0'>
                {growCycleData?.data.name}
              </Title>
              <GrowCycleStatusBadge value={growCycleData?.data.status} />
              {growCycleData.data.currentGrowStage ? (
                <GrowCycleStageBadge value={growCycleData.data.currentGrowStage} />
              ) : null}
            </Group>
          ) : (
            <Skeleton visible />
          )}

          {growCycleData?.data ? (
            <Text color='neutral.3'>{growCycleData?.data.description}</Text>
          ) : (
            <Skeleton visible />
          )}
        </Flex>

        <UnstyledButton
          py='sm'
          px='xl'
          sx={{
            border: `1px solid ${theme.colors.primary[5]}`,
            color: theme.colors.primary[5],
            borderRadius: theme.radius.lg,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.fn.rgba(theme.colors.primary[5], 0.05),
            },
          }}
          onClick={() => openAction()}
        >
          <Group position='apart'>
            Add a new action
            <IconBolt />
          </Group>
        </UnstyledButton>

        <SegmentedControl
          value={selectedTab}
          onChange={setSelectedTab}
          my='lg'
          size='xs'
          color='primary'
          data={[
            { label: 'General', value: TabMap.GENERAL },
            { label: 'Journal', value: TabMap.JOURNAL },
            { label: 'Actions', value: TabMap.ACTIONS },
            { label: 'Nutrients', value: TabMap.NUTRIENTS },
            { label: 'Light Schedule', value: TabMap.LIGHT_SCHEDULE },
          ]}
        />

        {growCycleData?.data && (
          <>
            {selectedTab === TabMap.GENERAL && <GeneralTab growCycleId={growCycleId} />}
            {selectedTab === TabMap.JOURNAL && <JournalTab growCycle={growCycleData?.data} />}
            {selectedTab === TabMap.NUTRIENTS && <NutrientsTab />}
            {selectedTab === TabMap.LIGHT_SCHEDULE && <LightScheduleTab />}
            {selectedTab === TabMap.ACTIONS && (
              <GrowActionsTab growCycle={growCycleData?.data} openAction={openAction} />
            )}
          </>
        )}
      </Stack>

      <ModalGrowCycleDeletion
        growCycleData={growCycleData?.data}
        opened={isDelete}
        onClose={closeDelete}
      />
      <AddActionDrawer growCycle={growCycleData?.data} opened={isAddAction} onClose={closeAction} />
    </Container>
  );
};

export default GrowCycleDetailPage;
