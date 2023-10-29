import { Button, Group, useMantineTheme, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { ReactElement } from 'react';
import { modals } from '@mantine/modals';
import CreateOtherPlantGrowerCultivarModal from '../modals/CreateOtherPlantGrowerCultivar';

const OtherCultivarTableConsole = (): ReactElement => {
  const theme = useMantineTheme();

  const openModal = () =>
    modals.open({
      title: 'Create New Plant  Cultivar',
      children: <CreateOtherPlantGrowerCultivarModal />,
    });

  return (
    <Group position='right'>
      <Button leftIcon={<IconPlus size={theme.fontSizes.md} />} onClick={openModal} size='xs'>
        Add Other Plant
      </Button>
    </Group>
  );
};
export default OtherCultivarTableConsole;
