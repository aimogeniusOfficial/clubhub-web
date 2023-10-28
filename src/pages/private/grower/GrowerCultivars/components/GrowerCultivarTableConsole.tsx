import { Button, Group, useMantineTheme, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { ReactElement } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import CreateGrowerCultivarModal from '../modals/CreateGrowerCultivarModal';

const GrowerCultivarTableConsole = (): ReactElement => {
  const theme = useMantineTheme();

  const openModal = () =>
    modals.open({
      title: 'Create Your Cultivar',
      children: <CreateGrowerCultivarModal />,
    });

  return (
    <Group position='right'>
      <Button leftIcon={<IconPlus size={theme.fontSizes.md} />} onClick={openModal} size='xs'>
        Add cultivar
      </Button>
    </Group>
  );
};
export default GrowerCultivarTableConsole;
