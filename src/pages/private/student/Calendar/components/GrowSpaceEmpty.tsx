import React from 'react';

import { Button, Image, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import emptySpaceImage from 'assets/images/empty-space-illustration.png';

interface GrowSpaceEmptyProps {
  openCreateModal: () => void;
}
const GrowSpaceEmpty = ({ openCreateModal }: GrowSpaceEmptyProps): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <div>
      <Text py='xs' px='xl' size='md' align='center'>
        You don&apos;t have any upcoming events
      </Text>
    </div>
  );
};

export default GrowSpaceEmpty;
