import React from 'react';

import { Group, Button, Tabs, Title, Badge, Menu, Portal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBox,
  IconCaretDown,
  IconPencil,
  IconSettings,
  IconTimeline,
} from '@tabler/icons-react';
import LoadingOverlay from 'components/states/LoadingOverlay';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import useGrowSpace from 'hooks/grow-space/useGrowSpace';
import { useNavigate, useParams } from 'react-router-dom';

import GrowSpaceDeleteModal from './components/GrowSpaceDeleteModal';
import GrowSpaceDetailsTab from './components/GrowSpaceDetailsTab';
import GrowSpaceEntriesTab from './components/GrowSpaceEntriesTab';
import GrowSpaceSettingsTab from './components/GrowSpaceSettingsTab';
import GrowSpaceUpdateModal from './components/GrowSpaceUpdateModal';

const GrowSpaceDetail = (): JSX.Element => {
  const { growSpaceId, activeTab } = useParams();
  const navigate = useNavigate();

  const { data: growSpaceData, isLoading, isError } = useGrowSpace(growSpaceId || '');
  const { data: breederData } = usePaginatedBreeders();

  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [isUpdateModalOpen, { open: openUpdateModal, close: closeUpdateModal }] =
    useDisclosure(false);

  // TODO handle error
  if (isError) {
    <div>Error</div>;
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Group position='apart' px='xs'>
        <Group>
          <Title order={2}>{growSpaceData?.data?.name}</Title>
          <Badge color='green' size='lg'>
            {growSpaceData?.data?.environment}
          </Badge>
        </Group>
        <Menu>
          <Menu.Target>
            <Button leftIcon={<IconCaretDown />} variant='outline'>
              Actions
            </Button>
          </Menu.Target>
          <Portal>
            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={22} />} onClick={openUpdateModal}>
                Edit
              </Menu.Item>
            </Menu.Dropdown>
          </Portal>
        </Menu>
      </Group>
      <Text px='xs' mt='xs' mb='lg'>
        {growSpaceData?.data?.location}
      </Text>
      <Tabs
        value={activeTab || 'general'}
        onTabChange={value => navigate(`/grow-space/${growSpaceId}/${value}`)}
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab value='general' icon={<IconBox size={18} />}>
            Details
          </Tabs.Tab>
          <Tabs.Tab value='devices' icon={<IconTimeline size={18} />}>
            Journal Entries
          </Tabs.Tab>
          <Tabs.Tab value='settings' icon={<IconSettings size={18} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='general' pt='xl'>
          {growSpaceData?.data && <GrowSpaceDetailsTab growSpace={growSpaceData?.data} />}
        </Tabs.Panel>
        <Tabs.Panel value='devices' pt='xl'>
          {growSpaceData?.data && <GrowSpaceEntriesTab growSpace={growSpaceData?.data} />}
        </Tabs.Panel>
        <Tabs.Panel value='settings' pt='xl'>
          <GrowSpaceSettingsTab openDeleteModal={openDeleteModal} />
        </Tabs.Panel>
      </Tabs>
      {growSpaceData?.data && breederData?.data && (
        <>
          <GrowSpaceDeleteModal
            growSpace={growSpaceData.data}
            opened={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
          <GrowSpaceUpdateModal
            growSpace={growSpaceData.data}
            opened={isUpdateModalOpen}
            onClose={closeUpdateModal}
          />
        </>
      )}
    </>
  );
};

export default GrowSpaceDetail;
