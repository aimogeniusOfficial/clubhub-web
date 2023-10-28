import { ReactElement } from 'react';

import { Drawer, Text } from '@mantine/core';

import GrowCycleBaseCreateForm from './GrowCycleBaseCreateForm';

interface IDrawerGrowCycleWriteFormProps {
  opened: boolean;
  onClose: () => void;
}

const DrawerCreateGrowCycle = ({
  opened,
  onClose,
}: IDrawerGrowCycleWriteFormProps): ReactElement => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size={500}
      title={
        <Text size={32} weight={700} color='neutral.0'>
          Grow Cycle Creation
        </Text>
      }
    >
      <GrowCycleBaseCreateForm onClose={onClose} />
    </Drawer>
  );
};

export default DrawerCreateGrowCycle;
